// ── DONNEES DU CV (competences, parcours, langues) — partage entre les pages et l'admin ──
// Ordre de lecture : modifications locales (admin) > js/site-data.js (publie) > valeurs par defaut ci-dessous.
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

const K_SKILLS='portfolio_skills', K_PARCOURS='portfolio_parcours', K_LANGUES='portfolio_langues';

const DEFAULT_SKILLS=[
  {id:1,name:'Frontend',sub:'Interface utilisateur & expérience web',items:[{name:'HTML5 / CSS3',pct:95},{name:'Bootstrap',pct:88},{name:'JavaScript',pct:82},{name:'React',pct:75}]},
  {id:2,name:'Backend',sub:'Serveur, logique métier & POO',items:[{name:'PHP',pct:85},{name:'Laravel',pct:78},{name:'Node.js',pct:60},{name:'Express.js',pct:55},{name:'API REST',pct:60},{name:'Python',pct:55},{name:'Programmation Orientée Objet',pct:80}]},
  {id:3,name:'Bases de données',sub:'Modélisation & stockage des données',items:[{name:'MySQL',pct:83},{name:'MongoDB',pct:65}]},
  {id:4,name:'Outils & DevOps',sub:'Conteneurisation, versioning & déploiement',items:[{name:'Docker',pct:60},{name:'Git / GitHub',pct:80},{name:'Netlify',pct:70},{name:'Vercel',pct:70}]},
  {id:5,name:'Méthodologies',sub:'Gestion de projet & conception',items:[{name:'Approche Agile',pct:75},{name:'Merise',pct:72}]},
  {id:6,name:'Bureautique',sub:'Documents, tableurs & présentations',items:[{name:'Word',pct:85},{name:'Excel',pct:85},{name:'PowerPoint',pct:85}]}
];

const DEFAULT_PARCOURS=[
  {id:1,type:'experience',title:'Stage – Développeuse Web Full Stack',org:'SRM-MS – Département Développement Commercial',period:'Juillet 2026',
   points:["Développement d'une plateforme web de gestion des interventions et des réclamations.","Gestion des utilisateurs : Administrateur, Agent et Client.","Suivi des interventions et création de tableaux de bord interactifs.","Exportation des données aux formats PDF, Excel et Word.","Intégration de notifications WhatsApp."],tech:'Laravel, Bootstrap, MySQL'},
  {id:2,type:'experience',title:'Stage – Développeuse Web Full Stack',org:'Groupe Scolaire Assakina, Marrakech',period:'Avril 2026',
   points:["Conception et développement d'une plateforme web de gestion et d'analyse des résultats scolaires.","Gestion des utilisateurs selon trois rôles : Administrateur, Professeur et Élève.","Saisie et importation des notes depuis des fichiers Excel.","Gestion et suivi des résultats scolaires.","Création de tableaux de bord, statistiques et comparaisons des performances scolaires."],tech:'PHP, Laravel, MySQL, Bootstrap, Chart.js'},
  {id:3,type:'formation',title:'Technicien Spécialisé en Développement Digital Full Stack',org:'OFPPT – ISTA NTIC SYBA, Marrakech',period:'2024 – 2026',points:[],tech:''},
  {id:4,type:'qualification',title:'Qualifiante en Web Marketing',org:'OFPPT – ISTA NTIC SYBA, Marrakech',period:'2026 – En cours',points:[],tech:''},
  {id:5,type:'formation',title:'Baccalauréat Sciences de la Vie et de la Terre (SVT)',org:'Lycée Sidi Youssef Ben Ali, Marrakech',period:'2023 – 2024',points:[],tech:''}
];

const DEFAULT_LANGUES=[
  {id:1,name:'Arabe',level:'Langue maternelle',pct:100},
  {id:2,name:'Français',level:'Niveau intermédiaire',pct:65},
  {id:3,name:'Anglais',level:'Niveau débutant',pct:30}
];

function loadStore(key,siteKey,defaults){
  try{const raw=localStorage.getItem(key); if(raw) return JSON.parse(raw);}catch(e){}
  if(window.SITE_DATA && window.SITE_DATA[siteKey]) return window.SITE_DATA[siteKey];
  return JSON.parse(JSON.stringify(defaults));
}
const getSkills=()=>loadStore(K_SKILLS,'skills',DEFAULT_SKILLS);
const saveSkills=l=>localStorage.setItem(K_SKILLS,JSON.stringify(l));
const getParcours=()=>loadStore(K_PARCOURS,'parcours',DEFAULT_PARCOURS);
const saveParcours=l=>localStorage.setItem(K_PARCOURS,JSON.stringify(l));
const getLangues=()=>loadStore(K_LANGUES,'langues',DEFAULT_LANGUES);
const saveLangues=l=>localStorage.setItem(K_LANGUES,JSON.stringify(l));

// icones des categories de competences (par position)
const CAT_ICONS=[
  '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',
  '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
  '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>'
];

// export : genere js/site-data.js avec TOUT le contenu (projets inclus)
function buildSiteDataFile(){
  const data={projects:getProjects(),skills:getSkills(),parcours:getParcours(),langues:getLangues()};
  return '// Genere depuis l\'admin le '+new Date().toLocaleString('fr-FR')+'\nwindow.SITE_DATA = '+JSON.stringify(data)+';\n';
}
