# API Fiche FFA

Cette API vise à faciliter l'accès aux données des athlètes français en rendant les informations disponibles de manière plus pratique et programmatique. En ciblant le site référence [bases.athle.fr](https://bases.athle.fr/), ce projet propose une solution moderne pour interagir avec les données d'athlétisme.

## Problématique

Bases Athlé, bien qu'étant un outil essentiel, souffre d'une interface peu intuitive et d'un manque d'accessibilité des données pour les développeurs et les applications tierces. Ce projet entend remédier à cela en fournissant un accès RESTful aux données, commençant par les records et performances des athlètes.

## Choix Techniques

Pour répondre à cette problématique, le projet s'appuie sur :

- **Scraping** : Utilisation de [Puppeteer](https://pptr.dev/) pour naviguer et extraire les données du site de manière efficace.
- **API** : Mise en place d'une API avec [Express.js](https://expressjs.com/).
- **Tests** : [Jest](https://jestjs.io/fr/)
- **Containerisation** : Utilisation de Docker pour faciliter le déploiement et la portabilité de l'application.

## Fonctionnalités

### Opérationnel
- Récupération des records d'un athlète à partir de son identifiant dans la base de données FFA. 

### A venir
- Enrichissement des résultats de course en y incorporant les records des athlètes.
- Récupération intégrale de la fiche d'un athlète (Résultats, historique de performance ...)

## Mise en place
- Installation : `npm install`
- Lancement : `node app.js`

**Note :** Un conteneur Docker sera proposé plus tard.

## Utilisation
- Une fois lancé l'API est par défaut disponible sur le port 3000 http://localhost:3000
- Le seul chemin accessible pour l'instant est `/records/{identifiant}` 

**Note :** Une documentation OpenAPI sera proposé plus tard.

## 
## Auteur

- Cyril BIER

---
