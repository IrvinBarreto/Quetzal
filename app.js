const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/quetzalDB",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const quetzalProductoSchema = new mongoose.Schema({
    name: String,
    url: String,
    ingredients: String, 
    description: String,
       
}) 

const Producto = mongoose.model("producto",quetzalProductoSchema);

const ajoNegro = new Producto({
    name:"Ajo negro",
    url: "/img/ajoNegro.jpeg",
    ingredients: "Ajo negro, moringa, espino blanco, olivo, jengibre, guanábana y ortiga.",
    description:"Antioxidante Fortalece el sistema inmune. Mejora la circulación. Antimicrobiano, aumenta las defensas del cuerpo. Ayuda a mejorar los problemas digestivos. Mejora las vías respiratorias y ayuda cuándo existen problemas de gripe, asma, bronquitis, etc. Energizante. Previene y combate la anemia. Contiene vitamina C, B1, B2, B3, calcio, potasio y fósforo. Acelera el metabolismo. Antiestres. Disminuye el insomnio. Hidrata el organismo. Disminuye la presión arterial. Previene cáncer de Colón. Útil para las hemorragias internas y externas, por ejemplo las nasales. Previene la osteoporosis. Alivia el dolor a causa del reumatismo. Calma los dolores menstruales. Previene la diabetes Combate la migraña Ayuda en el tratamiento de gastritis y úlcera Aumenta el libido."
    
});

/* ajoNegro.save(); */



app.get("/",function(req,res){
    res.render("home");
});

app.get("/productos",function(req,res){
    Producto.find({}, (err, productos)=>{
        if(!err){
            
            res.render("productos",{ productosQuetzal: productos});
        }else{
            console.log(err)
        }
    })
    
});
app.get("/nosotros",function(req,res){
    res.render("nosotros");
});

app.get("/producto/:consultaProducto",( req ,res) =>{

})










 app.listen(process.env.PORT || 3000, function(){
     console.log("server started on port 3000");
     
 })