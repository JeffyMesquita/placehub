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

  function paginatedResults() {
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skipIndex = (page - 1) * 5;
      const results = {};

      try {
        results.results = await User.find()
          .sort({ _id: 1 })
          .limit(limit)
          .skip(skipIndex)
          .exec();
        res.paginatedResults = results;
        next();
      } catch (error) {
        res.status(500).json({ message: "Ocorreu um Erro" });
      }
    };
  }

  router.get("/list", paginatedResults, async (req, res) => {
    const results = await db.findDocuments();
    res.send(results);
  });

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
});

module.exports = router;
