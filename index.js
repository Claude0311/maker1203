var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var crypto = require("crypto");

//链接本地数据库
var DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/mongoose'; 

mongoose.connect(DB_URL);

app.use(express.static('public'));
//解析表单数据
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})
//显示静态页面
app.get('/',function(req,res){
    res.render('index',__dirname+"public/index.html")
})

var ConSchema = require('./schemas/hand.js');

app.post('/chdb', function (req, res) {
	var percent = req.body.percent||50;
	var mode = req.body.mode||0;
	console.log('percent',percent," mode=",mode);
	ConSchema.find({ID:'123'},function(err,obj){
		if (err) {
            console.log("Error:" + err);
        }else{
			if(obj.length == 0){
                //新建
				var newper = new ConSchema({ID:'123',control:percent,setmode:mode});
				newper.save(function(err,res){
					if(err){
						console.log(err);
					}
					else{
						console.log('成功儲存：');
						//console.log(res);
						res.send({status:'success',message:true});
				}});
            }else{
				console.log("更改資料");
                ConSchema.updateOne({ID:'123'},{$set:{control:percent,setmode:mode}},function(err,res){
					if (err) throw err;
				});
				res.send({status:'success',message:true});
			}
		}
  })
});

app.all('/getdata',async (req,res)=>{
	//var hand_val = 40;
	let [weather_val, predict_val] = await Promise.all([require('./weather.js').getWeather||50, require('./predict.js').getPredict||50]);
	ConSchema.find({ID:'123'},function(err,obj){
		if (err) {
            console.log("Error:" + err);
        }else{
			if(obj.length > 0){
                //傳直
				var hand_val = obj[0].control||50;
				var msg_val = obj[0].message||"";
				var mode_val = obj[0].setmode||0;
				console.log(weather_val);
				res.json({data:{hand:hand_val,weather:weather_val,message:msg_val,mode:mode_val,predict:predict_val}});
				console.log('hand & weather sent');
            }
			else{
				res.json({data:{weather:weather_val,predict:predict_val}});
				console.log('weather sent');
			}
		}
	})
})

app.get('/savedata',function(req,res){
	var msg = req.query.msg;
	
	console.log("收到訊息："+msg);
	res.send('get it!');
	
	ConSchema.find({ID:'123'},function(err,obj){
		if(!err && obj.length>0){
			ConSchema.updateOne({ID:'123'},{$set:{message:msg}},function(err,res){
				if (err) throw err;
				console.log({message:msg})
			});
		}
	})
})

var server = app.listen(process.env.PORT||1993,function(){
    console.log('server connect');
	console.log(DB_URL);
	console.log(process.env.PORT);
})