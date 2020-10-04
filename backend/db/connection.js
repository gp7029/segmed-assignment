const {imageData} = require('../utilities');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

module.exports = (app) => {
    db.serialize(function() {
        db.run("CREATE TABLE imageData (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, owner TEXT, url TEXT, category TEXT, format TEXT, flagged BOOLEAN CHECK (flagged IN (0,1)) )");
      
        for (let i = 0; i< imageData.length; i++){
            const {title, owner, url, category, format, flagged} = imageData[i];
            db.run("INSERT INTO imageData(title, owner, url, category, format, flagged) VALUES (?, ?, ?, ?, ?, ?)", [title, owner, url, category, format, flagged])
        }
    });

    if (!!app){
        app.locals.db = db;
    }
    return db;
}