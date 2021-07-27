//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors = require('cors'); // to avoid all core problems

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.use(cors());

mongoose.connect("mongodb://localhost:27017/todoDB",{useNewUrlParser: true, useUnifiedTopology: true});

const todoSchema = mongoose.Schema({
   title:String,
   content: String
});

const Todo = mongoose.model("Todo", todoSchema); 

//------------------------------------------Request Targeting All Todos---------------------------------------//
app.route("/todos")
.get((req, res)=>{
    Todo.find({},(err, foundArticles)=>{
        if(err){
             res.send(err);
        }else{
            res.send(foundArticles);
            // console.log("Connected with frontend !")
        }
    });
})
.post((req, res)=>{
    // console.log(req.body);
    // console.log(req);
    const newArticle = new Todo({
        title : req.body.title,
        content : req.body.content
    });
    newArticle.save((err)=>{
        if(!err){
            res.send("Successfully added new article !");
        }else{
            res.send(err);
        }
    });
});

//-------------------Delete Specific todo---------------------//
app.route("/todoDelete/:todoID")
.delete((req,res)=>{
    //console.log(req.params.todoID);
    Todo.deleteOne(
        {_id:req.params.todoID},
        (err)=>{
            if(!err){
                res.send("Successfully deleted the particular article!");
            }else{
                res.send(err);
            }
        });
});


app.listen(5000, function() {
  console.log("Server started on port 5000");
});