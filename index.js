const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
app.use(express.urlencoded({extended:true}));





app.listen(port,()=>{
    console.log(`The port is running on ${port}`);
})

app.get("/",(req,res)=>{
    res.render("home.ejs");
})