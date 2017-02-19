# Konfiguration

## Konstanten

`conf/constants.json` ist die zentrale Konfigurationsdatei der API und beinhaltet alle verwendeten Konstanten. Alle Leistungsanpassungen und Optimierungen sollten von hier aus getätigt werden.

## Credentials

Die API benötigt eine Credentials-Datei (`conf/credentials.json`), welche die für den Zugriff auf die verschiedenen Datenbanken benötigten Nutzerdaten enthält. Diese Datei muss folgendes Format haben:
```javascript
{
  "host": "[host]",
  "user": "[user]",
  "password": "[password]"
}
```

!> __Hinweis__: <br> Die Credentials-Datei wird von git ignoriert, damit keine Zugangsdaten öffentlich verfügbar sind.

## Datenbankverbindungen

`database.js` kümmert sich um das Pooling aller Verbindungen zu der ausgewählten Datenbank. Die Konfiguration geschieht durch die [Credentials-Datei](#credentials). Die ausgewählte Datenbank wird zur Erstellung des Pools übergeben. Die Anzahl möglicher paralleler Datenbankverbindungen wird über die [Standard-Konfigurationsdatei](#konstanten) geregelt.

# Scripts

## Start

`bin/www` initialisiert den [Express-Router](https://expressjs.com/en/api.html#router) und lädt anschließend die [App](#app).


### normalizePort

port normalization function

**Parameters**

-   `val` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** specified port valid

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** normalized port, false on error

### onError

HTTP server error handler

**Parameters**

-   `error` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** HTTP server error

Returns **void** 

### onListening

HTTP listening event handler

Returns **void**

## App

`app.js` lädt alle Abhängigkeiten der eigentlichen Anwendung und bindet alle konfigurierten Routes ein. Das Script ist ebenfalls für das Handling von HTTP-Fehlern - insbesondere 501 und 404 - zuständig.