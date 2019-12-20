const request = require('request');
const url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-069?Authorization=CWB-07299207-BA8B-4910-ACF1-232B3C002AE1&limit=8&format=JSON&locationName=%E6%B0%B8%E5%92%8C%E5%8D%80&elementName=RH&startTime=";
//use this api: "https://opendata.cwb.gov.tw/dist/opendata-swagger.html#/%E9%A0%90%E5%A0%B1/get_v1_rest_datastore_F_D0047_069"
request({url:url,json:true}, (err, res, body) => {
	const data = body.records.locations[0].location[0].weatherElement[0].time;
	//console.log(data);
	let weathers = [];
	
	for (let i = 0; i < 8; i++) {//每三小時一次，最多72小時
      const tmpdata = data[i].elementValue[0].value;
	  
      if(tmpdata!==''){weathers.push(parseInt(tmpdata, 10));}
    }
	//console.log('陣列',weathers);
	
	const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
	//console.log(average(weathers));
	module.exports = new Promise(function(){return average(weathers)}); // 15
})
