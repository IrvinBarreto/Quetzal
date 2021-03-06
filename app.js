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

/* const colageinX = new Producto({
    name:"COLAGEIN-X",
    url: "/img/colageinX.jpeg",
    ingredients: "Arándano, Granada.",
    description:"Regenerador celular para cabello, le da fuerza, brillo y volumen. Endurece uñas. Fortalece la piel, la reafirma y suaviza. Previene enfermedades cardiovasculares. Desvanece líneas de expresión, manchas por el sol y paño. Quita celulitis, ayuda a mantener la elasticidad de la piel. Ayuda a prevenir la metástasis (proceso cuándo una célula se convierte en cáncer) Auxiliar en artritis y osteoporosis. Fortalece y regenera el cartílago."
    
});

colageinX.save(function(err){
    if(!err){
        console.log("guardado correctamente")
       
    }
}); */




app.get("/",function(req,res){
    Producto.find({'_id':{$in:[ mongoose.Types.ObjectId('5f7635195e15a07a3ceb6e8c'),
    mongoose.Types.ObjectId('5f7620d73e2a8f4e90cb55af'),
    mongoose.Types.ObjectId('5f7635c149031b7b1899eb79')]}},function(err, arr){
        if(!err){
            
            res.render("home",{ productosDestacados: arr});
        }
    })
    
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
    const productoBuscado = req.params.consultaProducto;
    
    Producto.findOne({_id: productoBuscado}, function(err,productoEncontrado){
        if(!err){
            res.render("producto",{oneProducto:productoEncontrado})
        }
    })

})










 app.listen(process.env.PORT || 3000, function(){
     console.log("server started on port 3000");
     
 })