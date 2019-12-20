const request = require('request');
const url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-069?Authorization=CWB-07299207-BA8B-4910-ACF1-232B3C002AE1&limit=8&format=JSON&locationName=%E6%B0%B8%E5%92%8C%E5%8D%80&elementName=RH&startTime=";
//use this api: "https://opendata.cwb.gov.tw/dist/opendata-swagger.html#/%E9%A0%90%E5%A0%B1/get_v1_rest_datastore_F_D0047_069"
request(url, (err, res, body) => {
	const data = body.records.locations.location.weatherElement;
	console.log(data);
	let weathers = [];
	//console.log($('.BoxTable tbody tr').eq(1).eq(1));
	for (let i = 1; i < table_tr.length; i++) { // 走訪 tr
      const table_td = table_tr.eq(i).find('td'); // 擷取每個欄位(td)
      const mois = table_td.eq(7).text();  //濕度
      // 建立物件並(push)存入結果
	  
	  if(mois!=='-'){weathers.push(parseInt(mois, 10));}
    }
	//console.log('陣列',weathers);
	
	const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
	//console.log(average(weathers));
	module.exports = average(weathers) // 15
})