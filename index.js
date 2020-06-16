const HTTP_PORT = 4000;

const express = require("express");
const path = require("path");
const expHbs = require("express-handlebars");
const expSession = require("express-session");
const bodyParser = require("body-parser");

const app = express();

const auth = require("./auth")
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
app.use(expSession({
  secret: "The witcher bestiary",
  resave: false,
  saveUninitialized: false
}));

app.get("/", (req, res)=>{
    if(req.session.loggedUser){
      res.render("index", {layout: "logged", user: req.session.loggedUser})
    }
    else{
      res.render("index", {layout: "main"})
    }    
})
app.get("/libro/:id", (req, res)=>{
  if(req.session.loggedUser){
    beasts.getByBook(req.params.id, list => res.render("libro", {layout: "logged", beasts: list}));
  }else{
    beasts.getByBook(req.params.id, list => res.render("libro", {layout: "main", beasts: list}));
  }

})
app.get("/bestia/:id", (req, res) => {
  if(req.session.loggedUser){  
    beasts.getById(req.params.id, beastItem => {
    res.render("bestia", { 
      layout: "logged",
       beast: beastItem })
  })}else{
  beasts.getById(req.params.id, beastItem => {
    res.render("bestia", { beast: beastItem })
  })};
});

app.get("/edit/:id", (req, res) => {
  if(!req.session.loggedUser){
    req.session.message = {
      class: "failure",
      text: "Necesitas iniciar sesión para editar"
    };
    res.redirect("/login")
  }else{beasts.getById(req.params.id, beastItem => {
    res.render("edit", { layout: "logged", beast: beastItem })
  })}
});
app.post("/edit/:id",(req, res)=>{

  beasts.getByIdAndUpdate(req.params.id, req.body, beastItem => {
    res.render("bestia", {layout:"logged", beast: beastItem})
  })
})
app.get("/login", (req, res)=>{
  res.render("login", {message: req.session.message})
})
app.post("/login", (req, res) => {

  auth.login(req.body.user, req.body.pass, result => {

    if (result.valid) {
      req.session.loggedUser = result.user;

      res.redirect("/");
    } else {
      req.session.message = {
        class: "failure",
        text: "Datos incorrectos"
      };
      res.redirect("/login");
    }
  });

});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(HTTP_PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${HTTP_PORT}/ ...`)
  });