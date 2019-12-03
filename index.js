var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var crypto = require("crypto");

//链接本地数据库
var DB_URL = process.env.MONGOLDB_URI || 'mongodb://localhost:27017/mongoose'; 
mongoose.connect(DB_URL);

app.use(express.static('public'));
//解析表单数据
app.use(bodyParser.urlencoded({extended:true}))
//显示静态页面
app.get('/',function(req,res){
    res.render('index',__dirname+"public/index.html")
})

var ConSchema = require('./schemas/hand.js');
app.post('/chdb', function (req, res) {
  var percent = req.body.percent;
  ConSchema.find({ID:'123'},function(err,obj){
		if (err) {
            console.log("Error:" + err);
        }else{
			if(obj.length == 0){
                //新建
				var newper = new ConSchema({ID:'123',control:percent});
				newper.save(function(err,res){
					if(err){
						console.log(err);
					}
					else{
						console.log('成功儲存：');
						//console.log(res);
				}});
            }else{
				console.log("更改資料");
                ConSchema.updateOne({ID:'123'},{$set:{control:Number}},function(err,res){
						if (err) throw err;
				});
				//res.send({status:'success',message:false})
			}
		}
  })
});

var server = app.listen(process.env.PORT||1993,function(){
    console.log('server connect');
})