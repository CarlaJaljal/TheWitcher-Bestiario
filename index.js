const HTTP_PORT = 4000;

const express = require("express");
const path = require("path");
const expHbs = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();

const beasts = require ("./beasts")



app.set("view engine", "handlebars");

app.engine("handlebars", expHbs({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts")
}));

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.render("index")
})
app.get("/libro/:id", (req, res)=>{
  beasts.getByBook(parseInt(req.params.id), list => res.render("libro", {beasts: list}));
})
app.get("/bestia/:id", (req, res) => {

  beasts.getById(req.params.id, beastItem => {
    res.render("bestia", { beast: beastItem })
  })
});

app.get("/edit/:id", (req, res) => {

  beasts.getById(req.params.id, beastItem => {
    res.render("edit", { beast: beastItem })
  })
});
app.post("/edit/:id",(req, res)=>{

  beasts.getByIdAndUpdate(req.params.id, req.body, beastItem => {
    console.log(beastItem)
    res.render("bestia", {beast: beastItem})
  })
})

// Inicio del servidor
app.listen(HTTP_PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${HTTP_PORT}/ ...`)
  });