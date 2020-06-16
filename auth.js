const db = require("./const-db");
/**
 * Función que valida user/pass. Retorna un objeto con un boolean que indica si las credenciales
 * son válidas y un string con el nombre de usuario o un mensaje de error en caso contrario.
 * 
 * @param {string} user Username
 * @param {string} pass Password
 * @param {function} cbResult Callback: function(result: { valid: boolean, msg: string })
 */
const login = (user, pass, cbResult) => {
  db.MongoClient.connect(db.url, db.config, (err, client) => {

    if (err) {
      cbResult({
        valid: false,
        msg: "Sorry, site is under maintenance now, retry later."
      });

    } else {

      const thewitcherDB = client.db("thewitcher");
      const usersCollection = thewitcherDB.collection("users");

      usersCollection.findOne({ user: user, password: pass }, (err, foundUser) => {

        if (err) {
          cbResult({
            valid: false,
            msg: "Sorry, the site is under maintenance now, retry later."
          });

        } else {

          if (!foundUser) {
            cbResult({
              valid: false,
              msg: "Invalid user/password."
            });
          } else {
            cbResult({
              valid: true,
              user: foundUser.user
            });
          }

        }

        client.close();
      });

    }

  });
}

module.exports = {
  login
}