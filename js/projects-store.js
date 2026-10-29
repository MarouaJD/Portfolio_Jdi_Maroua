// ── STOCKAGE DES PROJETS (partage entre projects.html et admin.html) ──
const PROJECTS_KEY   = 'portfolio_projects';
const OLD_CUSTOM_KEY  = 'custom_projects'; // ancienne cle (avant cette version)

const DEFAULT_PROJECTS = [
  {id:1,titreFr:'Gestion des Produits',titreEn:'Product Management',descFr:"Application web pour la gestion des produits : ajout, modification, suppression et affichage. CRUD efficace avec MySQL et interface intuitive en PHP.",descEn:"Web app for product management: add, edit, delete and display. Efficient CRUD with MySQL and intuitive PHP interface.",tags:['PHP','MySQL','CRUD'],link:'https://github.com/MarouaJD',image:null,icon:'php'},
  {id:2,titreFr:'Calculateur IMC',titreEn:'BMI Calculator',descFr:"Application interactive pour calculer l'IMC. Logique conditionnelle pour une evaluation personnalisee, interface reactive en JavaScript pur.",descEn:"Interactive app to calculate BMI. Conditional logic for personalized evaluation, reactive interface in pure JavaScript.",tags:['JavaScript','DOM'],link:'https://github.com/MarouaJD',image:null,icon:'js'},
  {id:3,titreFr:'Gestion de Stock',titreEn:'Stock Management',descFr:"Application de gestion de stock avec React et Dart. Suivi en temps reel, rendu dynamique et interface modulable.",descEn:"Stock management app with React and Dart. Real-time tracking, dynamic rendering and modular interface.",tags:['React','Dart'],link:'https://github.com/MarouaJD',image:null,icon:'react'},
  {id:4,titreFr:'Application de Traduction',titreEn:'Translation App',descFr:"Traduction en temps reel avec React, plusieurs langues supportees. Gestion des etats pour une interface reactive et fluide.",descEn:"Real-time translation app with React, multiple languages supported. State management for a reactive and fluid interface.",tags:['React','JavaScript','API'],link:'https://github.com/MarouaJD',image:null,icon:'api'},
  {id:5,titreFr:'Bibliotheque Learning',titreEn:'Learning Library',descFr:"Plateforme de bibliotheque en ligne : consultation, telechargement et gestion des livres. Categories et optimisation SQL.",descEn:"Online library platform: browse, download and manage books. Category management and SQL optimization.",tags:['PHP','MySQL'],link:'https://github.com/MarouaJD',image:null,icon:'book'},
  {id:6,titreFr:'Systeme de Login',titreEn:'Login System',descFr:"Systeme de connexion avec HTML et CSS uniquement. Design epure et responsive, sans JavaScript.",descEn:"Login system built with HTML and CSS only. Clean and responsive design, no JavaScript.",tags:['HTML5','CSS3'],link:'https://github.com/MarouaJD',image:null,icon:'login'},
  {id:7,titreFr:'Horloge Digitale',titreEn:'Digital Clock',descFr:"Horloge digitale interactive en JavaScript. Manipulation du DOM et fonctions natives JS pour les mises a jour en temps reel.",descEn:"Interactive digital clock in JavaScript. DOM manipulation and native JS functions for real-time updates.",tags:['JavaScript','DOM'],link:'https://github.com/MarouaJD',image:null,icon:'clock'}
];

function getProjects(){
  // 1) modifications locales (admin)  2) js/site-data.js (publie)  3) valeurs par defaut
  try{ const raw=localStorage.getItem(PROJECTS_KEY); if(raw) return JSON.parse(raw); }catch(e){}
  if(window.SITE_DATA && window.SITE_DATA.projects) return window.SITE_DATA.projects;
  let old=[];
  try{ old=JSON.parse(localStorage.getItem(OLD_CUSTOM_KEY)||'[]').map(p=>({
    id:p.id, titreFr:p.titreFr, titreEn:p.titreEn||p.titreFr, descFr:p.descFr, descEn:p.descEn||p.descFr,
    tags:p.tags||[], link:p.link||'https://github.com/MarouaJD', image:null, icon:'generic'
  })); }catch(e){}
  return DEFAULT_PROJECTS.concat(old);
}
function saveProjects(list){ localStorage.setItem(PROJECTS_KEY, JSON.stringify(list)); }

const PROJECT_ICONS = {
  php:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  js:'<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
  react:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M6 8h.01M9 8h6"/>',
  api:'<circle cx="12" cy="12" r="2"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M2 12h4M18 12h4M12 2v4M12 18v4"/>',
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>',
  login:'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  devops:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  generic:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/>'
};

// mots-cles utilises par les boutons de filtre de la page Projets
const FILTER_KEYWORDS = {
  php: ['php','laravel'],
  js: ['javascript','js','dom','html5','css3'],
  react: ['react'],
  devops: ['docker','devops','netlify','vercel','git','github']
};
function guessCats(tags){
  const t = (tags||[]).join(' ').toLowerCase();
  return Object.keys(FILTER_KEYWORDS).filter(cat=>FILTER_KEYWORDS[cat].some(k=>t.includes(k)));
}
