/* U7 Cyber SLAM · Trainer
   Logique : routage par hash, flashcards à rappel actif, ateliers de code
   avec indices de vérification, checklist, progression locale, export. */

(function () {
  "use strict";

  var STORE_KEY = "u7cyber.v1";
  var state = {
    cards: {},
    answers: {},
    checked: {},
    theme: null,
    chrono: { remaining: 4 * 3600 * 1000, end: null }
  };

  /* ---------- stockage ---------- */
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        state.cards = parsed.cards || {};
        state.answers = parsed.answers || {};
        state.checked = parsed.checked || {};
        state.theme = parsed.theme || null;
        if (parsed.chrono) state.chrono = parsed.chrono;
      }
    } catch (e) { /* stockage indisponible : on continue sans persistance */ }
  }

  var saveTimer = null;
  function save(immediate) {
    if (immediate) {
      clearTimeout(saveTimer);
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
      return;
    }
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
    }, 350);
  }

  /* ---------- utilitaires ---------- */
  function el(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var toastEl = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.setAttribute("data-show", "true");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () {
      toastEl.setAttribute("data-show", "false");
    }, 2200);
  }

  /* ---------- coloration syntaxique ---------- */
  var KW = {
    sql: ["SELECT","FROM","WHERE","INSERT","INTO","VALUES","UPDATE","SET","DELETE","CREATE","TABLE","USER","GRANT","REVOKE","SHOW","GRANTS","ON","TO","ALL","PRIVILEGES","OPTION","IDENTIFIED","BY","PRIMARY","KEY","FOREIGN","REFERENCES","CONSTRAINT","NOT","NULL","UNIQUE","DEFAULT","AUTO_INCREMENT","INT","VARCHAR","VARBINARY","TEXT","DATETIME","TINYINT","DECIMAL","JOIN","INNER","LEFT","RIGHT","OUTER","GROUP","HAVING","ORDER","DESC","ASC","LIMIT","COUNT","SUM","AVG","MIN","MAX","AS","AND","OR","IS","IN","LIKE","BETWEEN","INTERVAL","HOUR","MONTH","DAY","NOW","DATE","CAST","CHAR","ALTER","ADD","COLUMN","MODIFY","RENAME","DROP","INDEX","EXECUTE","START","TRANSACTION","COMMIT","ROLLBACK","FLUSH"],
    php: ["function","return","if","else","elseif","foreach","for","while","switch","case","break","continue","echo","print","new","try","catch","throw","class","public","private","protected","static","use","namespace","require","include","require_once","include_once","true","false","null","array","string","int","bool","float","void","isset","empty","exit","die","const","as","instanceof","global"],
    text: []
  };

  function highlight(code, lang) {
    var keywords = KW[lang] || [];
    var commentRe = lang === "sql" ? "--[^\\n]*" : (lang === "php" ? "(?:\\/\\/|#)[^\\n]*" : "");
    var parts = [];
    if (commentRe) parts.push("(" + commentRe + ")");
    parts.push("('(?:[^'\\\\\\n]|\\\\.)*'|\"(?:[^\"\\\\\\n]|\\\\.)*\")");
    if (lang === "php") parts.push("(\\$[A-Za-z_]\\w*)");
    if (keywords.length) parts.push("\\b(" + keywords.join("|") + ")\\b");
    parts.push("\\b(\\d+(?:\\.\\d+)?)\\b");

    var re = new RegExp(parts.join("|"), "gi");
    var out = "";
    var last = 0;
    var m;
    while ((m = re.exec(code)) !== null) {
      out += esc(code.slice(last, m.index));
      var cls = "tok-kw";
      if (commentRe && m[1] !== undefined && m[1].length) cls = "tok-com";
      else if (/^['"]/.test(m[0])) cls = "tok-str";
      else if (lang === "php" && /^\$/.test(m[0])) cls = "tok-var";
      else if (/^\d/.test(m[0])) cls = "tok-num";
      out += '<span class="' + cls + '">' + esc(m[0]) + "</span>";
      last = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++;
    }
    out += esc(code.slice(last));
    return out;
  }

  function paintCode(root) {
    var nodes = root.querySelectorAll("code[class^='lang-']");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.dataset.painted === "1") continue;
      var lang = node.className.replace("lang-", "");
      node.innerHTML = highlight(node.textContent, lang);
      node.dataset.painted = "1";
    }
  }

  /* ---------- progression ---------- */
  function sectionUnits(sec) {
    var cards = (sec.cards || []).length;
    var ateliers = (sec.ateliers || []).length;
    var checks = 0;
    if (sec.checklist) {
      for (var i = 0; i < sec.checklist.length; i++) checks += sec.checklist[i].items.length;
    }
    return cards + ateliers + checks;
  }

  function sectionDone(sec) {
    var done = 0;
    (sec.cards || []).forEach(function (c) {
      if (state.cards[c.id] === "known") done++;
    });
    (sec.ateliers || []).forEach(function (a) {
      var v = state.answers[a.id];
      if (v && v.trim().length > 3) done++;
    });
    if (sec.checklist) {
      sec.checklist.forEach(function (group, gi) {
        group.items.forEach(function (_, ii) {
          if (state.checked[sec.id + ":" + gi + ":" + ii]) done++;
        });
      });
    }
    return done;
  }

  function sectionRatio(sec) {
    var total = sectionUnits(sec);
    return total === 0 ? 0 : sectionDone(sec) / total;
  }

  function globalRatio() {
    var total = 0, done = 0;
    DATA.forEach(function (sec) {
      total += sectionUnits(sec);
      done += sectionDone(sec);
    });
    return total === 0 ? 0 : done / total;
  }

  /* ---------- sidebar ---------- */
  function renderNav() {
    var nav = el("nav");
    var html = "";
    DATA.forEach(function (sec) {
      var r = sectionRatio(sec);
      var st = r >= 0.999 ? "done" : (r > 0 ? "progress" : "todo");
      html += '<a class="navitem" href="#/s/' + sec.id + '" data-id="' + sec.id + '">' +
        '<span class="navitem__num">' + sec.num + '</span>' +
        '<span>' + esc(sec.title) + '</span>' +
        '<span class="navitem__dot" data-state="' + st + '" aria-hidden="true"></span>' +
        '</a>';
    });
    nav.innerHTML = html;
  }

  function renderMeter() {
    var pct = Math.round(globalRatio() * 100);
    el("meterFill").style.width = pct + "%";
    el("meterText").textContent = pct + " %";
  }

  function markActiveNav(id) {
    var links = document.querySelectorAll(".navitem");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("aria-current", links[i].dataset.id === id ? "true" : "false");
    }
  }

  /* ---------- vue section ---------- */
  function viewSection(sec) {
    el("crumb").textContent = "Section " + sec.num;
    markActiveNav(sec.id);

    var tabs = [
      { key: "cours", label: "Cours" },
      { key: "cartes", label: "Cartes", count: (sec.cards || []).length },
      { key: "ateliers", label: "Ateliers", count: (sec.ateliers || []).length }
    ];
    if (sec.checklist) tabs.push({ key: "checklist", label: "Checklist" });

    var html = '<header class="sechead">' +
      '<span class="sechead__num">SECTION ' + sec.num + '</span>' +
      '<h1>' + esc(sec.title) + '</h1>' +
      '<div class="sechead__meta">' +
        '<span class="pill' + (sec.hot ? " pill--hot" : "") + '">' + esc(sec.tag) + '</span>' +
        '<span class="pill">' + Math.round(sectionRatio(sec) * 100) + ' % fait</span>' +
      '</div>' +
      '<p style="margin-block-start:var(--space-4);color:var(--ink-2);max-width:68ch">' + esc(sec.intro) + '</p>' +
      '</header>';

    html += '<div class="tabs" role="tablist">';
    tabs.forEach(function (t, i) {
      html += '<button class="tab" role="tab" type="button" data-tab="' + t.key + '" aria-selected="' + (i === 0) + '">' +
        esc(t.label) +
        (t.count ? ' <span class="tab__count">' + t.count + '</span>' : "") +
        '</button>';
    });
    html += '</div>';

    html += '<div class="tabpanel" data-panel="cours"><div class="doc">' + (sec.cours || "<p>Pas de cours.</p>") + '</div></div>';
    html += '<div class="tabpanel" data-panel="cartes" hidden></div>';
    html += '<div class="tabpanel" data-panel="ateliers" hidden></div>';
    if (sec.checklist) html += '<div class="tabpanel" data-panel="checklist" hidden></div>';

    el("view").innerHTML = html;

    renderCardsPanel(sec, document.querySelector("[data-panel='cartes']"));
    renderAteliersPanel(sec, document.querySelector("[data-panel='ateliers']"));
    if (sec.checklist) renderChecklistPanel(sec, document.querySelector("[data-panel='checklist']"));

    var tabBtns = document.querySelectorAll(".tab");
    for (var i = 0; i < tabBtns.length; i++) {
      tabBtns[i].addEventListener("click", function () {
        var key = this.dataset.tab;
        for (var j = 0; j < tabBtns.length; j++) {
          tabBtns[j].setAttribute("aria-selected", tabBtns[j].dataset.tab === key ? "true" : "false");
        }
        var panels = document.querySelectorAll(".tabpanel");
        for (var k = 0; k < panels.length; k++) {
          panels[k].hidden = panels[k].dataset.panel !== key;
        }
      });
    }

    paintCode(el("view"));
  }

  /* ---- cartes ---- */
  function renderCardsPanel(sec, panel) {
    if (!panel) return;
    var cards = sec.cards || [];
    if (!cards.length) {
      panel.innerHTML = '<p class="empty">Pas de cartes pour cette section.</p>';
      return;
    }

    var html = '<p class="eyebrow" style="margin-block-end:var(--space-3)">Réponds à voix haute avant de révéler. C\'est l\'effort de rappel qui fixe, pas la relecture.</p>';
    html += '<div class="cardstack">';
    cards.forEach(function (c, i) {
      var st = state.cards[c.id] || "";
      html += '<article class="card" data-card="' + c.id + '">' +
        '<div class="card__top">' +
          '<span class="card__idx">CARTE ' + (i + 1) + " / " + cards.length + '</span>' +
          '<span class="card__status" data-s="' + st + '">' + (st === "known" ? "su" : st === "review" ? "à revoir" : "") + '</span>' +
        '</div>' +
        '<p class="card__q">' + c.q + '</p>' +
        '<div class="card__reveal" hidden><div class="card__a">' + c.a + '</div></div>' +
        '<div class="card__actions">' +
          '<button class="btn btn--sm" type="button" data-reveal>Révéler</button>' +
          '<button class="btn btn--sm btn--good" type="button" data-mark="known" hidden>Je savais</button>' +
          '<button class="btn btn--sm btn--warn" type="button" data-mark="review" hidden>À revoir</button>' +
        '</div>' +
      '</article>';
    });
    html += '</div>';
    panel.innerHTML = html;

    panel.addEventListener("click", function (ev) {
      var btn = ev.target.closest("button");
      if (!btn) return;
      var card = btn.closest(".card");
      if (!card) return;
      var id = card.dataset.card;

      if (btn.hasAttribute("data-reveal")) {
        var rev = card.querySelector(".card__reveal");
        var open = rev.hidden;
        rev.hidden = !open;
        btn.textContent = open ? "Masquer" : "Révéler";
        var marks = card.querySelectorAll("[data-mark]");
        for (var i = 0; i < marks.length; i++) marks[i].hidden = !open;
        return;
      }

      var mark = btn.dataset.mark;
      if (mark) {
        state.cards[id] = mark;
        save();
        var status = card.querySelector(".card__status");
        status.dataset.s = mark;
        status.textContent = mark === "known" ? "su" : "à revoir";
        renderNav();
        renderMeter();
        toast(mark === "known" ? "Marqué comme su" : "Remis dans la révision mixte");
      }
    });
  }

  /* ---- ateliers ---- */
  function findAtelier(id) {
    var found = null;
    DATA.forEach(function (s) {
      (s.ateliers || []).forEach(function (a) { if (a.id === id) found = a; });
    });
    return found;
  }

  function updateCount(panel, atelier) {
    var wrap = panel.querySelector(".atelier[data-atelier='" + atelier.id + "']");
    if (!wrap) return;
    var ta = wrap.querySelector("textarea");
    var n = (ta.value.match(/\S+/g) || []).length;
    wrap.querySelector("[data-count]").textContent = n ? n + " mots" : "vide";
  }

  function renderAteliersPanel(sec, panel) {
    if (!panel) return;
    var ateliers = sec.ateliers || [];
    if (!ateliers.length) {
      panel.innerHTML = '<p class="empty">Pas d\'atelier ici. Cette section se travaille à l\'oral, en récitant les cartes.</p>';
      return;
    }

    var html = "";
    ateliers.forEach(function (a, i) {
      var val = state.answers[a.id] || "";
      html += '<section class="atelier" data-atelier="' + a.id + '">' +
        '<div class="atelier__head">' +
          '<span class="atelier__num">ATELIER ' + (i + 1) + '</span>' +
          '<h2 class="atelier__title">' + esc(a.title) + '</h2>' +
        '</div>' +
        '<div class="atelier__body">' +
          '<div class="atelier__prompt doc">' + a.prompt + '</div>' +
          '<label class="eyebrow" for="ta-' + a.id + '" style="display:block;margin-block-start:var(--space-4)">Ta réponse</label>' +
          '<textarea class="editor" id="ta-' + a.id + '" data-input spellcheck="false" lang="' + a.lang + '" placeholder="Écris ici. Tab insère 4 espaces.">' + esc(val) + '</textarea>' +
          '<div class="atelier__bar">' +
            '<button class="btn btn--primary btn--sm" type="button" data-check>Vérifier</button>' +
            '<button class="btn btn--sm" type="button" data-model>Voir une correction</button>' +
            '<button class="btn btn--sm" type="button" data-clear>Effacer</button>' +
            '<span class="eyebrow" data-count style="margin-inline-start:auto"></span>' +
          '</div>' +
          '<ul class="checks" data-checks hidden></ul>' +
          '<div class="solution" data-solution hidden>' +
            '<p class="solution__note">Une correction possible, pas la seule. Compare la structure, pas les noms de variables.</p>' +
            '<pre class="codeblock"><code class="lang-' + a.lang + '">' + esc(a.model) + '</code></pre>' +
          '</div>' +
        '</div>' +
      '</section>';
    });
    panel.innerHTML = html;

    ateliers.forEach(function (a) { updateCount(panel, a); });

    panel.addEventListener("input", function (ev) {
      var ta = ev.target.closest("[data-input]");
      if (!ta) return;
      var id = ta.closest(".atelier").dataset.atelier;
      state.answers[id] = ta.value;
      save();
      var atelier = findAtelier(id);
      if (atelier) updateCount(panel, atelier);
      renderMeter();
    });

    panel.addEventListener("keydown", function (ev) {
      var ta = ev.target.closest("textarea[data-input]");
      if (!ta) return;
      if (ev.key === "Tab") {
        ev.preventDefault();
        var s = ta.selectionStart, e = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(e);
        ta.selectionStart = ta.selectionEnd = s + 4;
        ta.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    panel.addEventListener("click", function (ev) {
      var btn = ev.target.closest("button");
      if (!btn) return;
      var wrap = btn.closest(".atelier");
      if (!wrap) return;
      var id = wrap.dataset.atelier;
      var ta = wrap.querySelector("textarea");
      var atelier = findAtelier(id);
      if (!atelier) return;

      if (btn.hasAttribute("data-check")) {
        var list = wrap.querySelector("[data-checks]");
        var okCount = 0;
        list.innerHTML = atelier.checks.map(function (ch) {
          var ok = false;
          try { ok = ch.test.test(ta.value); } catch (e) { ok = false; }
          if (ok) okCount++;
          return '<li class="check" data-ok="' + ok + '">' +
            '<span class="check__box" aria-hidden="true">' + (ok ? "[x]" : "[ ]") + '</span>' +
            '<span>' + esc(ch.label) + '</span></li>';
        }).join("");
        list.hidden = false;

        if (!atelier.checks.length) {
          list.hidden = true;
          toast("Atelier ouvert : compare avec la correction quand tu as fini.");
        } else if (okCount === atelier.checks.length) {
          toast("Tous les critères sont là. Nickel.");
        } else {
          toast(okCount + " critère(s) sur " + atelier.checks.length);
        }
        renderMeter();
        return;
      }

      if (btn.hasAttribute("data-model")) {
        var sol = wrap.querySelector("[data-solution]");
        sol.hidden = !sol.hidden;
        btn.textContent = sol.hidden ? "Voir une correction" : "Masquer la correction";
        if (!sol.hidden) paintCode(sol);
        return;
      }

      if (btn.hasAttribute("data-clear")) {
        if (!ta.value.trim() || confirm("Effacer ta réponse à cet atelier ?")) {
          ta.value = "";
          state.answers[id] = "";
          save();
          updateCount(panel, atelier);
          renderMeter();
        }
      }
    });
  }

  /* ---- checklist ---- */
  function renderChecklistPanel(sec, panel) {
    if (!panel) return;
    var html = "";
    sec.checklist.forEach(function (group, gi) {
      html += '<h2 style="font-family:var(--font-display);font-size:var(--fs-lg);font-weight:600;margin-block:var(--space-5) var(--space-2)">' + esc(group.title) + '</h2>';
      html += '<ul class="checklist">';
      group.items.forEach(function (item, ii) {
        var key = sec.id + ":" + gi + ":" + ii;
        var on = !!state.checked[key];
        html += '<li><label>' +
          '<input type="checkbox" data-key="' + key + '" aria-label="' + esc(item) + '"' + (on ? " checked" : "") + '>' +
          '<span>' + esc(item) + '</span>' +
          '</label></li>';
      });
      html += '</ul>';
    });
    panel.innerHTML = html;

    panel.addEventListener("change", function (ev) {
      var cb = ev.target.closest("input[type='checkbox']");
      if (!cb) return;
      if (cb.checked) state.checked[cb.dataset.key] = true;
      else delete state.checked[cb.dataset.key];
      save();
      renderNav();
      renderMeter();
    });
  }

  /* ---- révision mixte ---- */
  var revQueue = [];
  var revIndex = 0;

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function buildRevQueue() {
    var pool = [];
    DATA.forEach(function (sec) {
      (sec.cards || []).forEach(function (c) { pool.push({ sec: sec, card: c }); });
    });
    var unknown = pool.filter(function (x) { return state.cards[x.card.id] !== "known"; });
    var source = unknown.length >= 4 ? unknown : pool;
    revQueue = shuffle(source.slice());
    revIndex = 0;
  }

  function viewRevision() {
    el("crumb").textContent = "Révision mixte";
    markActiveNav("");
    if (!revQueue.length) buildRevQueue();

    var total = revQueue.length;
    if (revIndex >= total) {
      el("view").innerHTML = '<header class="sechead"><span class="sechead__num">SESSION</span><h1>Session terminée</h1></header>' +
        '<div class="revbox"><p>Tu as passé les ' + total + ' cartes de la session. Les cartes marquées « à revoir » restent en priorité pour la prochaine fois.</p>' +
        '<div class="card__actions"><button class="btn btn--primary" id="revAgain" type="button">Nouvelle session</button>' +
        '<a class="btn" href="#/">Accueil</a></div></div>';
      el("revAgain").addEventListener("click", function () {
        buildRevQueue();
        viewRevision();
      });
      return;
    }

    var item = revQueue[revIndex];
    var st = state.cards[item.card.id] || "";
    var html = '<header class="sechead"><span class="sechead__num">RÉVISION</span>' +
      '<h1>' + esc(item.sec.title) + '</h1>' +
      '<div class="sechead__meta"><span class="pill">Section ' + item.sec.num + '</span>' +
      '<span class="pill">' + (revIndex + 1) + ' / ' + total + '</span></div></header>' +
      '<div class="card">' +
        '<div class="card__top"><span class="card__idx">CARTE</span>' +
        '<span class="card__status" data-s="' + st + '">' + (st === "known" ? "su" : st === "review" ? "à revoir" : "") + '</span></div>' +
        '<p class="card__q">' + item.card.q + '</p>' +
        '<div class="card__reveal" hidden><div class="card__a">' + item.card.a + '</div></div>' +
        '<div class="card__actions">' +
          '<button class="btn btn--sm" type="button" id="revReveal">Révéler</button>' +
          '<button class="btn btn--sm btn--good" type="button" id="revKnown" hidden>Je savais</button>' +
          '<button class="btn btn--sm btn--warn" type="button" id="revReview" hidden>À revoir</button>' +
          '<a class="btn btn--sm" href="#/s/' + item.sec.id + '" style="margin-inline-start:auto">Revoir le cours</a>' +
        '</div>' +
      '</div>';
    el("view").innerHTML = html;

    el("revReveal").addEventListener("click", function () {
      var rev = document.querySelector(".card__reveal");
      rev.hidden = !rev.hidden;
      this.textContent = rev.hidden ? "Révéler" : "Masquer";
      el("revKnown").hidden = rev.hidden;
      el("revReview").hidden = rev.hidden;
    });

    el("revKnown").addEventListener("click", function () {
      state.cards[item.card.id] = "known";
      save(true);
      revIndex++;
      viewRevision();
    });

    el("revReview").addEventListener("click", function () {
      state.cards[item.card.id] = "review";
      save(true);
      revQueue.push(item);
      revIndex++;
      viewRevision();
    });

    paintCode(el("view"));
  }

  /* ---- carnet de code ---- */
  function collectEntries() {
    var entries = [];
    DATA.forEach(function (sec) {
      (sec.ateliers || []).forEach(function (a) {
        var v = state.answers[a.id];
        if (v && v.trim().length > 0) entries.push({ sec: sec, atelier: a, code: v });
      });
    });
    return entries;
  }

  function downloadMd(entries) {
    var lines = [
      "# Carnet de code · U7 Cyber SLAM",
      "",
      "Export du " + new Date().toLocaleString("fr-FR"),
      "Épreuve du 03/11/2026 · " + entries.length + " réponse(s).",
      ""
    ];
    entries.forEach(function (e) {
      lines.push("## " + e.atelier.title);
      lines.push("");
      lines.push("*Section " + e.sec.num + " · " + e.sec.title + " · " + e.atelier.lang + "*");
      lines.push("");
      lines.push("```" + e.atelier.lang);
      lines.push(e.code);
      lines.push("```");
      lines.push("");
    });

    var blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "carnet-code-u7-cyber-slam.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    toast("Export lancé");
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        toast("Copié dans le presse-papiers");
      }, function () { toast("Copie impossible"); });
    } else {
      toast("Copie non supportée par ce navigateur");
    }
  }

  function viewCarnet() {
    el("crumb").textContent = "Mon carnet de code";
    markActiveNav("");

    var entries = collectEntries();
    var html = '<header class="sechead"><span class="sechead__num">CARNET</span><h1>Mon carnet de code</h1>' +
      '<div class="sechead__meta"><span class="pill">' + entries.length + ' réponse(s) enregistrée(s)</span></div></header>' +
      '<div class="doc"><p class="lead">Tout ce que tu écris dans les ateliers est sauvegardé ici, sur cet appareil. Exporte-le en Markdown pour le relire ou le partager.</p></div>' +
      '<div class="card__actions" style="margin-block:var(--space-4)">' +
        '<button class="btn btn--primary btn--sm" type="button" id="exportMd">Exporter en Markdown</button>' +
        '<button class="btn btn--sm" type="button" id="copyAll">Copier tout</button>' +
        '<a class="btn btn--sm" href="#/revision">Révision mixte</a>' +
      '</div>';

    if (!entries.length) {
      html += '<p class="empty">Rien pour l\'instant. Ouvre un atelier dans une section et écris ta première réponse.</p>';
    } else {
      entries.forEach(function (e) {
        html += '<article class="carnet-entry">' +
          '<h3>' + esc(e.atelier.title) + '</h3>' +
          '<p class="meta">Section ' + e.sec.num + ' · ' + esc(e.atelier.lang) + '</p>' +
          '<pre><code class="lang-' + e.atelier.lang + '">' + esc(e.code) + '</code></pre>' +
          '</article>';
      });
    }

    el("view").innerHTML = html;
    paintCode(el("view"));

    el("exportMd").addEventListener("click", function () { downloadMd(entries); });
    el("copyAll").addEventListener("click", function () {
      var text = entries.map(function (e) {
        return "## " + e.atelier.title + " (section " + e.sec.num + ")\n\n```" + e.atelier.lang + "\n" + e.code + "\n```";
      }).join("\n\n");
      copyText(text || "Aucune réponse enregistrée.");
    });
  }

  /* ---- accueil ---- */
  function viewHome() {
    el("crumb").textContent = "Accueil";
    markActiveNav("");

    var totalCards = 0, known = 0, review = 0, totalAteliers = 0, filled = 0;
    DATA.forEach(function (sec) {
      (sec.cards || []).forEach(function (c) {
        totalCards++;
        if (state.cards[c.id] === "known") known++;
        if (state.cards[c.id] === "review") review++;
      });
      (sec.ateliers || []).forEach(function (a) {
        totalAteliers++;
        if (state.answers[a.id] && state.answers[a.id].trim().length > 3) filled++;
      });
    });

    var next = null;
    for (var i = 0; i < DATA.length; i++) {
      if (sectionRatio(DATA[i]) < 0.999) { next = DATA[i]; break; }
    }
    if (!next) next = DATA[0];

    var html = '<header class="sechead">' +
      '<span class="sechead__num">U7 · CYBER SLAM</span>' +
      '<h1>Quatre heures, deux dossiers, des points qui se ramassent à la ligne.</h1>' +
      '<div class="sechead__meta">' +
        '<span class="pill pill--hot">Épreuve du 03/11/2026</span>' +
        '<span class="pill">15 sections</span>' +
        '<span class="pill">' + totalCards + ' cartes</span>' +
        '<span class="pill">' + totalAteliers + ' ateliers</span>' +
      '</div></header>';

    html += '<div class="stats">' +
      '<div class="stat"><span class="stat__n">' + Math.round(globalRatio() * 100) + ' %</span><span class="stat__l">progression globale</span></div>' +
      '<div class="stat"><span class="stat__n">' + known + '/' + totalCards + '</span><span class="stat__l">cartes sues</span></div>' +
      '<div class="stat"><span class="stat__n">' + review + '</span><span class="stat__l">cartes à revoir</span></div>' +
      '<div class="stat"><span class="stat__n">' + filled + '/' + totalAteliers + '</span><span class="stat__l">ateliers écrits</span></div>' +
      '</div>';

    html += '<div class="revbox">' +
      '<p class="eyebrow">Prochaine étape</p>' +
      '<p style="margin-block:var(--space-2) var(--space-4)"><strong>Section ' + next.num + ' · ' + esc(next.title) + '</strong></p>' +
      '<div class="card__actions" style="margin:0">' +
        '<a class="btn btn--primary" href="#/s/' + next.id + '">Reprendre ici</a>' +
        '<a class="btn" href="#/revision">Révision mixte</a>' +
        '<a class="btn" href="#/carnet">Mon carnet</a>' +
      '</div></div>';

    html += '<div class="doc"><h2>Comment travailler avec cet outil</h2>' +
      '<ol>' +
        '<li><strong>Cours</strong> : lis une fois, lentement, en surlignant mentalement les pièges.</li>' +
        '<li><strong>Cartes</strong> : réponds à voix haute avant de révéler. Si tu hésites, marque « à revoir ». C\'est le seul geste qui compte.</li>' +
        '<li><strong>Ateliers</strong> : écris le code de mémoire, vérifie, puis compare avec la correction. Recopie la correction à la main une fois si tu t\'es trompé.</li>' +
        '<li><strong>Révision mixte</strong> : 10 minutes par jour, en priorité sur les cartes « à revoir ».</li>' +
      '</ol>' +
      '<div class="callout callout--key"><span class="callout__label">Plan de révision</span>' +
      '<p>20 au 22/10 : sections 01, 02, 03. 23 au 25/10 : 04, 05, 06. 26 au 27/10 : 07, 08. 28 au 29/10 : sujet Casterman en 4 h chrono. 30 au 31/10 : 09, 10, 11. 01 au 02/11 : sujet NDV en 4 h. 03/11 : relire 12, 13, 14 uniquement.</p></div>' +
      '</div>';

    el("view").innerHTML = html;
    paintCode(el("view"));
  }

  /* ---------- chronomètre ---------- */
  var chronoEls = {};
  function fmtChrono(ms) {
    if (ms < 0) ms = 0;
    var s = Math.floor(ms / 1000);
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    return h + ":" + pad(m) + ":" + pad(sec);
  }

  function chronoTick() {
    var ch = state.chrono;
    if (ch.end) {
      ch.remaining = Math.max(0, ch.end - Date.now());
      if (ch.remaining <= 0) {
        ch.end = null;
        ch.remaining = 0;
        chronoEls.start.textContent = "Démarrer";
        toast("Temps écoulé. Crayon levé.");
      }
    }
    chronoEls.time.textContent = fmtChrono(ch.remaining);
    chronoEls.time.setAttribute("data-low", ch.remaining < 600000 ? "true" : "false");
  }

  function setupChrono() {
    chronoEls.time = el("chronoTime");
    chronoEls.start = el("chronoStart");

    chronoEls.start.addEventListener("click", function () {
      var ch = state.chrono;
      if (ch.end) {
        ch.remaining = Math.max(0, ch.end - Date.now());
        ch.end = null;
        this.textContent = "Démarrer";
      } else if (ch.remaining > 0) {
        ch.end = Date.now() + ch.remaining;
        this.textContent = "Pause";
      }
      save(true);
      chronoTick();
    });

    el("chronoReset").addEventListener("click", function () {
      state.chrono = { remaining: 4 * 3600 * 1000, end: null };
      chronoEls.start.textContent = "Démarrer";
      save(true);
      chronoTick();
    });

    if (state.chrono.end) chronoEls.start.textContent = "Pause";
    chronoTick();
    setInterval(chronoTick, 500);
  }

  /* ---------- thème ---------- */
  function applyTheme() {
    var dark = state.theme === "dark";
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    el("themeToggle").textContent = dark ? "Thème clair" : "Thème sombre";
  }

  function setupTheme() {
    if (state.theme === null) {
      state.theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme();
    el("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      save(true);
      applyTheme();
    });
  }

  /* ---------- menu mobile ---------- */
  function setupMenu() {
    var side = el("side");
    var scrim = el("scrim");
    var btn = el("menuBtn");

    function close() {
      side.dataset.open = "false";
      scrim.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", function () {
      var open = side.dataset.open === "true";
      side.dataset.open = open ? "false" : "true";
      scrim.hidden = open;
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });

    scrim.addEventListener("click", close);
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") close();
    });
    el("nav").addEventListener("click", function (ev) {
      if (ev.target.closest(".navitem")) close();
    });
  }

  /* ---------- routeur ---------- */
  function route() {
    var hash = location.hash.replace(/^#/, "");
    var parts = hash.split("/").filter(Boolean);

    if (parts[0] === "revision") { viewRevision(); return; }
    if (parts[0] === "carnet") { viewCarnet(); return; }

    if (parts[0] === "s" && parts[1]) {
      var sec = null;
      for (var i = 0; i < DATA.length; i++) {
        if (DATA[i].id === parts[1]) { sec = DATA[i]; break; }
      }
      if (sec) { viewSection(sec); return; }
    }

    viewHome();
  }

  /* ---------- init ---------- */
  function init() {
    load();
    renderNav();
    renderMeter();
    setupTheme();
    setupChrono();
    setupMenu();
    route();
    window.addEventListener("hashchange", function () {
      route();
      el("view").focus();
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
