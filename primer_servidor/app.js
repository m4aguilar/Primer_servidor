var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();



//Para conectarnos a la base de datos:
//mongodb://localhost/"nombre_base_datos"
//mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/primer_servidor");

//Para decirle a express que se va a usar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Definimos el schema del login
var login = {name:String, pass:String};
var productSchema = {
    title:String,
    description:String,
    imageUrl:String,
    price:Number
};

var Product = mongoose.model("Product", productSchema);

//Indicamos que el motor de las vistas va a ser jade
app.set('view engine', 'jade');

app.use(express.static("public"));

//req: solicitud, res: respuesta
app.get("/", function(req, res){
    //render sirve para renderizar una vista
    //La extension no hay que ponersela porque ya
    //indicamos que era una tipo "jade"
    res.render("index");
});

app.post("/menu", function(req, res){
  if(req.body.password == "1234"){
    var data = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: "hola.png",
        price: req.body.price
    }
    var product = new Product(data);
    console.log(req.body);
    product.save();
    res.render("index");
  }else {
    res.render("menu/new");
  }
});

app.get("/menu/new",function(req, res){
  res.render("menu/new");
});

app.listen(8080);
