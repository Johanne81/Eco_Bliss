# Eco Bliss Bath

Eco Bliss Bath est une start-up de 20 personnes, spécialisée dans la vente de produits de beauté écoresponsables, dont le produit principal est un savon solide.

## Prérequis

Pour le lancement du projet, vous aurez besoin de :

- Docker
- Node.js
- npm
- Cypress
- Un navigateur

## Installation

1.  Clonez le dépôt :
    `git clone https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_Automatisez_des_tests_pour_une_boutique_en_ligne.git `

2.  Depuis un terminal ouvert dans le dossier du projet, lancez la commande :
    `docker-compose up`
    Docker est configuré pour que le back et le front se lancent en même temps, il n'est pas utile de taper `npm intall` puis `npm start`

3.  Ouvrez le site depuis la page [http://localhost:8080](http://localhost:8080)

## Exécution des Tests

Les tests de l'application sont réalisés à l'aide de Cypress.
Pour installer Cypress :

1.  Depuis un terminal ouvert dans le dossier du projet, lancez la commande :
    `npm install cypress --save-dev`

2.  Lancement des tests: `npx cypress open `

## Génération du rapport de Cypress

Depuis un terminal ouvert dans le dossier du projet, lancez la commande :
`npx cypress run`

## Login

Identifiant : [test2@test.fr](mailto:test2@test.fr)
Mot de passe : testtest

## API

Accédez à Swagger depuis la page [http://localhost:8081/api/doc](http://localhost:8081/api/doc)

## Auteur

Johanne SEZNEC
contact : joseznec@gmail.com

## Versions

- version 1.0.0 : tests manuels effectués par Marie. Une modification du code a été réalisée.
- version 2.0.0 : tests automatiques et exploratoires effectués par Johanne.
