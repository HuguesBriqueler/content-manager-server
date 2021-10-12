const express = require("express");
const app = express();
const PORT = 3001;

const fs = require("fs");
const path = require("path");
const pathToFile = path.resolve("./data.json");

//    Les data sont lus depuis le fichier data.json
// const getResources = fs.readFileSync(pathToFile)
const getResources = () => JSON.parse(fs.readFileSync(pathToFile));
//    puis 'parsée' pour affichage
// console.log(JSON.parse(getResources))

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express !");
});

app.get("/api/resources", (req, res) => {
  const resources = getResources();
  res.send(resources);
});

app.get("/api/resources/:id", (req, res) => {
  const resources = getResources();
  const { id } = req.params; // const id = req.params.id -- id is the name of param (:id) given in request
  const resource = resources.find((item) => item.id === id);
  res.send(resource);
});

app.post("/api/resources", (req, res) => {
  const resources = getResources(); // storing data.json file
  const resource = req.body; // editing req.body

  resource.createdAt = new Date();
  resource.status = "inactive"; // adding "management proprieties"
  resource.id = Date.now().toString();
  resources.unshift(resource); // adding req.body + new elements to json data

  fs.writeFile(
    pathToFile,
    JSON.stringify(resources, null, 2), // Saving file with new entry
    (err) => {
      if (err) return res.status(422).send("Cannot store data in the file !");
    }
  );

  console.log("POST request recieved");
  console.log(req.body);
  res.send("Data have been POSTed");
});

app.listen(PORT, () => console.log(`Server is listening on port : ${PORT}`));
