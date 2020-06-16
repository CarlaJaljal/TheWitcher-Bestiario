const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://admin:lOvrM8tI89gVUlxw@carlajaljal-voeex.gcp.mongodb.net/thewitcher?retryWrites=true&w=majority"
const config = { useUnifiedTopology: true };

module.exports = {
  mongodb,
  MongoClient,
  url,
  config
}
