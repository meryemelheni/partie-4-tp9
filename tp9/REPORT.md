# Rapport TP9 : Pipeline as Code avec Jenkins

## 1. Pipeline déclaratif
Le pipeline est décrit dans le fichier `Jenkinsfile` à la racine du dépôt. Il contient les stages suivants :
- **Checkout** : récupération du code et calcul du SHA court (`SHORT_SHA`).
- **Install** : `npm install` dans un agent Docker `node:24-alpine`.
- **Quality** : en parallèle, `Lint` et `Unit tests` (avec génération du rapport JUnit).
- **Build** : construction de l'image Docker tagguée avec le SHA.
- **Push** : push de l'image sur Docker Hub (uniquement sur `main`, avec credentials).
- **Post** : archivage du rapport JUnit et de `image.txt`, nettoyage du workspace.

## 2. Agents Docker et parallélisme
Les stages `Install`, `Quality` et `Build` s'exécutent dans des conteneurs Docker éphémères (`node:24-alpine`). Le bloc `parallel` permet d'exécuter `Lint` et `Unit tests` en même temps.

## 3. Credentials et tag SHA
Le credential `dockerhub` (Username with password) est utilisé via `withCredentials`. Le token est masqué dans les logs (`****`). L'image est tagguée avec le SHA court (`869a649`) et poussée sur Docker Hub.

## 4. Multibranch Pipeline
Le job Multibranch scanne le dépôt GitHub toutes les 2 minutes et crée un job pour chaque branche. On voit apparaître `main` et `feature/rate-limit-config`. Le stage `Push` est sauté sur les branches autres que `main`.

## 5. Difficultés rencontrées
- **Chemin du Jenkinsfile** : le Jenkinsfile était dans `tp9/`, il a fallu le déplacer à la racine pour que le Multibranch le détecte.
- **Condition `when`** : la condition `branch 'main'` ne fonctionnait pas, on a utilisé `anyOf { branch 'main'; branch 'origin/main' }`.
- **DNS Docker** : le conteneur Jenkins n'arrivait pas à résoudre `google.com`, on a dû corriger la configuration DNS de la VM.
- **Nom d'utilisateur Docker Hub** : le nom était `maryemelheni` (avec un "a"), pas `meryemelheni` (avec un "e").

## 6. Captures
Les captures sont disponibles dans `captures/` :
- `pipeline-stages.png` : vue des stages avec Lint et Unit tests en parallèle
- `credentials-masked.png` : token Docker Hub masqué (`****`)
- `dockerhub-sha-tag.png` : image sur Docker Hub avec le tag SHA
- `dockerhub2-sha-tag.png` : SHA court dans le terminal
- `multibranch.png` : jobs main et feature/rate-limit-config
