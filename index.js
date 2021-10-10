const express = require("express")
const app =express()
const PORT = 3001

const fs = require("fs")
const path = require("path")
const pathToFile = path.resolve("./data.json")

//    Les data sont lus depuis le fichier data.json
// const getResources = fs.readFileSync(pathToFile)
const getResources = () => JSON.parse(fs.readFileSync(pathToFile))
//    puis 'parsée' pour affichage
// console.log(JSON.parse(getResources))

app.get("/", (req, res) => {
  res.send("Hello from Express !")
})

app.get("/api/resources", (req, res) => {

  const resources = getResources()
  res.send(resources)
})

app.listen(PORT, () => console.log(`Server is listening on port : ${PORT}`))
