var express = require("express");
var router = express.Router();
const db = require("../services/db");
const { ObjectId } = require("mongodb");

db.connectToDb((err) => {
  if (err) console.log(err);

  //Middleware
  const checkBody = (req, res, next) => {
    if ("_id" in req.body) {
      req.body._id = ObjectId(req.body._id); //converte o id em ObjectId
    }
    next();
  };  

  router.post("/add", async (req, res) => {
    const results = await db.insertDocument(req.body);
    res.send(results);
  });

  router.patch("/update", checkBody, async (req, res) => {
    const results = await db.updateDocument(req.body);
    res.send(results);
  });

  router.delete("/delete", checkBody, async (req, res) => {
    const results = await db.removeDocument(req.body);
    res.send(results);
  });

  router.get('/list/:page?', async (req, res, next) => {
    const page = parseInt(req.params.page || "1");  
    try {
      const results = await db.findDocuments(page);
      res.send(results);
    } catch (err) {
      next(err);
    }
  })

});

module.exports = router;
