var express = require('express');
var mongoose = require('mongoose');
var path = require("path");


var app = express();



//Para conectarnos a la base de datos:
//mongodb://localhost/"nombre_base_datos"
//mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/primer_servidor");

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

    var product = new Product(data);
    product.save();

    res.render("index");
});
app.get("/menu/new",function(req, res){
  res.render("menu/new")
});

app.listen(8080);
