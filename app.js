var express = require ("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");


mongoose.connect("mongodb+srv://nikrad:milomilo27@memorytheraphybot-qbmbv.gcp.mongodb.net/test?retryWrites=true&w=majority",  {useNewUrlParser:true, useCreateIndex:true}).then(() => {
	console.log("connected to DB");
}).catch(err => {
	console.log("error:", err.message);
});



	
	
mongoose.set('useUnifiedTopology', true);



app.use(bodyParser.urlencoded({extended: true}));

app.use(flash());


// app.set("view engine", "html");

app.use(express.static(__dirname + '/views/public/'));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//schema set up

var memorySchema = new mongoose.Schema({
	email: String,
	text: String,
	city: String,
	date: String
	
});

var Memory = mongoose.model("Memory", memorySchema);



app.get("/about", async (req, res) =>{
	res.render("public/html/about.ejs");
	
});

app.get("/archive", async (req, res) =>{
	// Get all memories from DB
    Memory.find({}, function(err, memory){
       if(err){
           console.log(err);
       } else {
          res.render("public/html/archive.ejs", {memory:memory});
       }
    });
});
	


app.get("/", function(req, res){
	Memory.find({}, function(err, memories){
		if(err){
			console.log("error");		
		} else 
		res.render("public/html/index.ejs");
	});
});

app.post("/", function(req, res){
	//get data and add to archive array
	var text = req.body.text;
	var date = req.body.date;
	var city = req.body.city;
	var email = req.body.email;
	var newMemory = {email:email, text:text, city:city, date:date}
	Memory.create(newMemory, function(err, newlyCreated){
		if(err){
			console.log("err");
		
		} else {
			// res.redirect("/");
			// res.json({ (req.body) });
			res.end();
			console.log(req.body);
		}
	});
	console.log("post");

});

// app.get("/memories/new", function(req, res){
// 		res.render("public/new.ejs");
// });



app.listen(process.env.PORT || 3000, process.env.IP, (req, res) =>{ 
	console.log('server listening'); 
});
		   
		   
		   
		   