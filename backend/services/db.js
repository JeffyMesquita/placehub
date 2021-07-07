const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

//Url pra conexão
const url = "mongodb://localhost:27017";

//nome do banco
const dbName = "apinodepages";
const client = new MongoClient(url, { useUnifiedTopology: true });

var _db;

function connectToDb(callback) {
  //Usando o método de conexão
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Conectado com sucesso!!");
    _db = client.db(dbName);
    callback(err);
  });
}

async function findDocuments(page) {
  //trás os itens da coleção
  const collection = _db.collection("users");
  //trás os itens páginados
  try {
    const sizePage = 5;
    const sizeSkip = sizePage * (page - 1);
    const results = await collection
      .find()
      .skip(sizeSkip)
      .limit(sizePage)
      .toArray();
    return results;
  } catch (error) {
    throw new Error(error);
  }
}

const insertDocument = async (document) => {
  //trás os itens da coleção
  const collection = _db.collection("users");
  //inserindo um item
  try {
    const results = await collection.insertOne(document);
    return results;
  } catch (error) {
    throw new Error(error);
  }
};

const updateDocument = async (document) => {
  //trás os itens da coleção
  const collection = _db.collection("users");
  //Att um item
  try {
    const results = await collection.updateOne(
      { _id: document._id },
      { $set: document }
    );
    return results;
  } catch (error) {
    throw new Error(error);
  }
};

const removeDocument = async (document) => {
  //trás os itens da coleção
  const collection = _db.collection("users");
  //remove um item
  try {
    const results = await collection.deleteOne({ _id: document._id });
    return results;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  connectToDb,
  findDocuments,
  insertDocument,
  updateDocument,
  removeDocument,
};

// teste de conexão
// connectToDb(async () => {
//   const results = await findDocuments();
//   console.log(results);
// });
