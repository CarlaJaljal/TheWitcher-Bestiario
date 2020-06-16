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
          cbResult([]);
        } else {
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
 * @param {string} filterId Id de las bestias buscadas
 * @param {function} cbResult callback function(beasts: Array)
 * 
 * @returns {object | undefined} Objeto con datos de la persona encontrada o undefined si no se encuentra
 */
const getByBook = (filterId, cbResult) => {
  mongodb.MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      cbResult(undefined);
      client.close();
    } else {
      const thewitcherDB = client.db("thewitcher");
      const beastsCollection = thewitcherDB.collection("beasts");

      beastsCollection.find({ libroID: filterId }).toArray((err, beasts) => {

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
      cbResult(undefined);
      client.close();
    } else {
      const thewitcherDB = client.db("thewitcher");
      const beastsCollection = thewitcherDB.collection("beasts");

      beastsCollection.findOne({ _id: o_id }, (err, beast) => {

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
 * Busca la bestia con el id recibido y lo updatea con los datos que recibe.
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

      cbResult(undefined);
      client.close();
    } else {
      const thewitcherDB = client.db("thewitcher");
      const beastsCollection = thewitcherDB.collection("beasts");

      beastsCollection.findOneAndUpdate({ _id: o_id}, {$set: body}, {returnOriginal: false}, (err, beastupdated) => {

        if (err) {
          cbResult(undefined);
        } else {
          cbResult(beastupdated.value);
        }
        client.close();
      });
    }
  });
}




module.exports = {
  getByIdAndUpdate,
  getAll,
  getByBook,
  getById
};