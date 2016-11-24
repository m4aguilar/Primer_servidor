var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var cloudinary = require('cloudinary');

//Configuramos cloudinary
cloudinary.config({
  cloud_name: "bull4m",
  api_key: "685169279778821",
  api_secret: "iV7-bTmcpggAE3HYofhEHApd1h8"
});

var app = express();



//Para conectarnos a la base de datos:
//mongodb://localhost/"nombre_base_datos"
//mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/primer_servidor");

//Para decirle a express que se va a usar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var uploader = multer({dest: "./uploads"});
var middleware_upload = uploader.single('imagen');


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

app.get("/menu", function(req, res){
  Product.find(function(error, documento){
    if(error){console.log(error); }
    res.render("menu/index",{products: documento})
  });
});

app.post("/menu",middleware_upload, function(req, res){
  if(req.body.password == "1234"){
    var data = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: "file.png",
        price: req.body.price
    }
    var product = new Product(data);

      if(req.file){
        cloudinary.uploader.upload(req.file.path,
          function(result){
            product.imageUrl = result.url;
            product.save();
            //console.log(req.body);
            //console.log(product.imageUrl);
            res.render("index");
          }
        );
      }
    //console.log(req.body);
    //product.save();
    //res.render("index");
  }else {
    res.render("menu/new");
  }
});

app.get("/menu/new",function(req, res){
  res.render("menu/new");
});

app.listen(8080);
