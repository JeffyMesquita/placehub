const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const apiRoutes = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use("/users", apiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
