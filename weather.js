const request = require('request')
const url = 'https://www.cwb.gov.tw/V7/observe/24real/Data/C0AH1.htm';//'https://www.cwb.gov.tw/V8/C/W/OBS_Station.html?ID=C0AH1';
const cheerio = require('cheerio')

module.exports = {
	getWeather : new Promise((resolve, reject) => {
		request(url, (err, res, body) => {
			const $ = cheerio.load(body);
			//console.log(body);
			let weathers = [];
			//console.log($('.BoxTable tbody tr').eq(1).eq(1));
			const table_tr = $('.BoxTable tbody tr');
			for (let i = 1; i < 8; i++) { //每三小時一個，最多72小時
			  const table_td = table_tr.eq(i).find('td'); // 擷取每個欄位(td)
			  const mois = table_td.eq(7).text();  //濕度
			  // 建立物件並(push)存入結果
			  
			  if(mois!=='-'){weathers.push(parseInt(mois, 10));}
			}
			//console.log('陣列',weathers);
			
			const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
			//console.log(average(weathers));
			resolve(average(weathers)));
		})
	})
}
