const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mysql = require('mysql2');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

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


app.get("/post/:id",(req,res)=>{
    try {
        connection.query(
            "SELECT * FROM post",
            function(err, results) {
              if(err) throw err;
              res.render("view.ejs",{results})
            }
          );
        
    } catch (error) {
        console.log(error);
    }
})



app.delete("/post/:id",(req,res)=>{
    let {id} = req.params;
    try {
        connection.query(
            `DELETE FROM post WHERE id = '${id}' `,
            function(err, results) {
              if(err) throw err;
              res.redirect("/");
            }
          );
        
    } catch (error) {
        console.log(error);
    }
})



app.get("/post/edit/:id",(req,res)=>{
    let {id} = req.params;
    try {
        connection.query(
            `SELECT * FROM post WHERE id = '${id}' `,
            function(err, results) {
              if(err) throw err;
              let data = results[0];
              res.render("edit.ejs",{data})
            }
          );
        
    } catch (error) {
        console.log(error);
    }
})


app.patch("/post/edit/:id",(req,res)=>{
    let {id} = req.params;
    let {message:newMsg} = req.body;
    try {
        connection.query(
            `UPDATE post SET message = '${newMsg}' WHERE id = '${id}' `,
            function(err, results) {
              if(err) throw err;
              let data = results[0];
              res.redirect("/");
            }
          );
        
    } catch (error) {
        console.log(error);
    }
})