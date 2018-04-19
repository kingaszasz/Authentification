
//csatlakozunk az atadtázis serverhet
// előtte a net start MongoDb kell!

const host = 'localhost';
const port = 27017;
const user = 'userfortestdb';
const password = 'userpassword';
const database = 'testdb'; //ehhez az adatbázishoz akarok csatlakozni

/* robomongoban új user létrehozása
new shell, futtat

use testdb
db.createUser(
   {
     user: "userfortestdb",
     pwd: "userpassword",
     roles:
       [
         { role: "readWrite", db: "testdb" }       ]
   }
)
*/

module.exports = {
    uri: `mongodb://${user}:${password}@${host}:${port}/${database}`, // a mongodb-hez való csatlakozás
    options: { // nem feltétlenfontos
        connectTimeoutMS: 2000, //mennyi időt adunka kapcsolódásra
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 100, // Reconnect every 500ms
    }
}