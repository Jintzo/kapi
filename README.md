# KFA-API
In diesem Repo befindet sich die API der Kornformanalyse-Plattform, die als eigenständige Node-Express-Anwendung umgesetzt ist.

### Aufsetzen

1. `git clone`
2. `npm install`
3. `node bin/www`

Es bietet sich an, mit `sudo npm install -g nodemon` nodemon zu installieren und dann statt `node bin/www` nun `nodemon bin/www` auszuführen, um live reloading zu ermöglichen.
 
Die Anwendung erwartet in `conf/credentials.json` hinterlegte Zugangsdaten für die MySQL-Datenbank. Diese haben folgendes Format:
```json
{
  "host": "[host]",
  "user": "[user]",
  "password": "[password]"
}
```