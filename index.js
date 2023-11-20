const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mysql = require('mysql2');


// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'kadatabse',
    password:'Vignesh@2019'
  });




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
app.use(express.urlencoded({extended:true}));





app.listen(port,()=>{
    console.log(`The port is running on ${port}`);
})

app.get("/",(req,res)=>{  
    try {
        connection.query(
            "SELECT * FROM post",
            function(err, results) {
              if(err) throw err;
              res.render("home.ejs",{results})
            }
          );
        
    } catch (error) {
        console.log(error);
    }
});

app.get("/post",(req,res)=>{
    res.render("post.ejs");
})

app.post("/posts", (req, res) => {
    let { message: newMessage, tags: newTags } = req.body;

    try {
        connection.query(
            `INSERT INTO post (message, tags) VALUES ('${newMessage}', '${newTags}')`,
            function (err, results) {
                if (err) throw err;
                console.log(results); 
                res.redirect("/");
            }
        );
    } catch (error) {
        console.log(error);
    }
});
