const express 		= require('express');
const morgan 		= require("morgan");
const mongoose 	= require("mongoose");
const bodyParser 	= require("body-parser");

const app = express();


mongoose.connect('mongodb://localhost/trainingBatch12',
										{
											useNewURLParser: true,
											useUnifiedTopology:true
										}
					);

mongoose.promise = global.Promise; 

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json({limit: '50mb'}));


// CORS Policy

app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
	if(req.method === 'OPTIONS'){
		res.header("Access-Control-Allow-Methods","POST, GET, PUT, PATCH, DELETE");
		return res.status(200).json({});
	}
	next();
})


//============================================================
// 		Import Your API Routes here
//============================================================


const userMgmtRoutes = require("./api/userManagement/routes.js");

app.use(userMgmtRoutes);






















app.use((req,res,next)=>{
	const error = new Error("This page is not found");
	error.status = 404;
	next(error);
});


app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		error :{ message: error.message}
	});
	res.end();
});


module.exports = app;