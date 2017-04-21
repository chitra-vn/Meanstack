var express= require('express');
var app= express();
var mongojs = require('mongojs');//requires mongo js module
var db=mongojs('booklist',['booklist']);//mongodb collection we are using
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public")); 
app.use(bodyParser.json());


app.get('/booklist',function(req,res){
    console.log("i received a get request")

db.booklist.find(function (err, docs) { 
    console.log(docs);
    res.json(docs);

    });
});

app.post('/booklist',function(req,res){
    console.log(req.body);
    db.booklist.insert(req.body,function(err,doc){
        res.json(doc);
    })
});

app.delete('/booklist/:id',function(req,res){
    var id=req.params.id;
    console.log(id);
    db.booklist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    })
});

app.get('/booklist/:id',function(req,res){
    var id=req.params.id;
    console.log(id);
    db.booklist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    });
});

app.put('/booklist/:id',function(req,res){
    var id=req.params.id;
    console.log(req.body);
    console.log(id);
    console.log("Iam inside update");
    db.booklist.findAndModify({Query:{_id:mongojs.ObjectId(id)},
        update:{$set:{totalInventory:req.body.totalInventory,outInCirculation:req.body.outInCirculation}},
        //update:{$set:{author:req.body.author}},
        new:true},function (err,doc){
            res.json(doc);
        });
});
app.listen(3000);
console.log("server running on port 3000");