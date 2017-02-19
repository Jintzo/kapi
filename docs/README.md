# KFA-API
In diesem Repo befindet sich die API der Kornformanalyse-Plattform, die als eigenständige Node-Express-Anwendung umgesetzt ist.

### Aufsetzen

1. `git clone`
2. `npm install`
3. `node bin/www`

Es bietet sich an, [`nodemon`](https://www.npmjs.com/package/nodemon) (installieren durch Ausführen von `sudo npm i -g nodemon`) oder [`pm2`](https://www.npmjs.com/package/pm2) (installieren durch Ausführen von `sudo npm i -g pm2`) zu verwenden, um die API zu betreiben. `nodemon` wird für hot-reloading während des Entwickelns verwendet und `pm2` für geclustertes Deployment im production stage.

!> __Hinweis__: <br> Die Dokumentationsdateien, die zur Übersicht gehören, sind auf Deutsch verfasst, da sie weniger technischer als informativer Natur sind. Alle anderen Dokumentationsdateien werden mit [documentationjs](http://documentation.js.org/) aus dem Quelltext herausgeneriert und sind deshalb auf Englisch.