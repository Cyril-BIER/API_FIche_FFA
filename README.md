# API Fiche FFA

Cette API vise à faciliter l'accès aux données des athlètes français en rendant les informations disponibles de manière plus pratique et programmatique. En ciblant le site référence [bases.athle.fr](https://bases.athle.fr/), ce projet propose une solution moderne pour interagir avec les données d'athlétisme.

## Problématique

Le site officiel des bases de l'athlétisme français, bien qu'essentiel, souffre d'une interface peu intuitive et d'un manque d'accessibilité des données pour les développeurs et les applications tierces. Ce projet entend remédier à cela en fournissant un accès RESTful aux données, commençant par les records et performances des athlètes.

## Choix Techniques

Pour répondre à cette problématique, le projet s'appuie sur :

- **Scraping** : Utilisation de [Puppeteer](https://pptr.dev/) pour naviguer et extraire les données du site de manière efficace.
- **API** : Mise en place d'une API avec [Express.js](https://expressjs.com/).
- **Tests** : [Jest](https://jestjs.io/fr/)
- **Containerisation** : Utilisation de Docker pour faciliter le déploiement et la portabilité de l'application.

## Fonctionnalités

### Court Terme

- **Récupération des records d'un athlète** : Permettre aux utilisateurs de récupérer facilement les records personnels d'un athlète via une simple requête API.

### Long Terme

- **Accès intégral aux fiches athlètes** : Étendre les capacités de l'API pour permettre l'extraction et la consultation de toutes les informations disponibles sur une fiche d'athlète, incluant résultats de compétitions, historiques de performance etc...

## Auteur

- Cyril BIER

---
