# API rest expressjs

## Etape 1

Réalisation d'une api avec nodejs et le module express.js.

Les données utilisées sont stockées dans un fichier JSON et représentent une todo list.

### Routes

- GET : `/todos`
- GET : `/todos/1`
- POST : `/todos`
- PUT : `/todos/1`
- DELETE : `/todos/1`

## Etape 2

Ajout d'une brique d'authentification avec un couple email + mot de passe. Les mots de passe sont encryptés avec bcrypt

Il faut être authentifié pour accéder aux routes `todos`.

Les utilisateurs authentifiés auront accès uniquement à leurs todos.

### Routes

- POST : `/auth/register`
- POST : `/auth/login`
- POST : `/auth/logout`
