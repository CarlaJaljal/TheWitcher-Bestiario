const mongodb = require("mongodb");
const mongoURL = "mongodb://localhost:27017";

/**
 * Consulta todos los datos de bestias
 * 
 * @param {function} cbResult callback function(beastlist: Array)
 */
const getAll = (cbResult) => {
  mongodb.MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      // retornar array vacío
      cbResult([]);
      client.close();
    } else {
      const thewitcherDB = client.db("thewitcher");
      const beastsCollection = thewitcherDB.collection("beasts");

      beastsCollection.find().toArray((err, beastList) => {
        if (err) {
          // retornar array vacío
          cbResult([]);
        } else {
          // retornar array con datos
          cbResult(beastList)
        }
        client.close();
      });

    }
  });
}

/**
 * Retorna las bestias según libro.
 * 
 * @param {number} filterId Id de las bestias buscadas
 * @param {function} cbResult callback function(beasts: Array)
 * 
 * @returns {object | undefined} Objeto con datos de la persona encontrada o undefined si no se encuentra
 */
const getByBook = (filterId = Number, cbResult) => {
  mongodb.MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      // retornar array vacío
      cbResult(undefined);
      client.close();
    } else {
      const thewitcherDB = client.db("thewitcher");
      const beastsCollection = thewitcherDB.collection("beasts");

      beastsCollection.find({ libroID: filterId }).toArray((err, beasts) => {

        // retornar array con datos
        if (err) {
          cbResult(undefined);
        } else {
          cbResult(beasts);
        }

        client.close();
      });

    }
  });
}

/**
 * Retorna la bestia del id recibido
 * 
 * @param {string} filterId Id de la bestia buscada
 * @param {function} cbResult callback function(beast: object)
 * 
 * @returns {object | undefined} Objeto con datos de la bestia encontrada o undefined si no se encuentra
 */
const getById = (filterId, cbResult) => {

  //Convierto el string que me llega en un ObjectID de mongodb
  var o_id = new mongodb.ObjectID(filterId);

  mongodb.MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      // retornar array vacío
      cbResult(undefined);
      client.close();
    } else {
      const thewitcherDB = client.db("thewitcher");
      const beastsCollection = thewitcherDB.collection("beasts");

      beastsCollection.findOne({ _id: o_id }, (err, beast) => {

        // retornar array con datos
        if (err) {
          cbResult(undefined);
        } else {
          cbResult(beast);
        }

        client.close();
      });

    }
  });
}

/**
 * Retorna la bestia del id recibido
 * 
 * @param {string} filterId Id de la bestia buscada
 * @param {object} body contenido del body
 * @param {function} cbResult callback function(beast: object)
 * 
 * @returns {object | undefined} Objeto con datos de la bestia encontrada o undefined si no se encuentra
 */
const getByIdAndUpdate = (filterId, body, cbResult) => {

  //Convierto el string que me llega en un ObjectID de mongodb
  var o_id = new mongodb.ObjectID(filterId);

  mongodb.MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      // retornar array vacío
      cbResult(undefined);
      client.close();
    } else {
      const thewitcherDB = client.db("thewitcher");
      const beastsCollection = thewitcherDB.collection("beasts");

      beastsCollection.findOneAndUpdate({ _id: o_id}, body, {returnOriginal: false}, (err, beastupdated) => {
        // retornar array con datos
        if (err) {
          cbResult(undefined);
        } else {
          cbResult(beastupdated);
        }
        client.close();
      });
    }
  });
}



// Exportación de las 3 funciones
module.exports = {
  getByIdAndUpdate,
  getAll,
  getByBook,
  getById
};