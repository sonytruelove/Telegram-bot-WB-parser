process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const token=""
const robot = new TelegramBot(token, {polling: true});
const axios = require('axios').default;
const xlsx = require('node-xlsx').default;
var data = [
  [1, 2, 3],
  [true, false, null, 'sheetjs'],
  ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
  ['baz', null, 'qux'],
];

function get(url){
  return axios.get(url).then(function(response){
  return response.data[response.data.length-1]["price"]["RUB"].toString()
 
  }).catch(function(error){console.log(error)})
  
}

robot.on('message',(message)=>{
  var buffer=0
  var chatid=message.chat.id;
  var msg=message.text;
  var args=msg.split(" ");
  var page=0;
  var filepage=0;
  var fileOptions=0;
  for(var i=1;i<10;i++){
    setTimeout(function gets(){
      page++
      axios.get('https://catalog.wb.ru/catalog/men_shoes/catalog?appType=1&couponsGeo=12,3,18,15,21&curr=rub&dest=-1029256,-102269,-1278703,-1255563&emp=0&kind=1&lang=ru&locale=ru&page='+page+'&pricemarginCoeff=1.0&reg=0&regions=68,64,83,4,38,80,33,70,82,86,75,30,69,22,66,31,40,1,48,71&sort=priceup&spp=0&subject=104;105;128;130;232;396;1382;1586').then(response=>{    
  filepage++
      
       fileOptions = {
  filename: 'men_shoes.xlsx',
  contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
    
    var str=''
    for(var s=0;s<response.data.data.products.length;s++) {
         data[s]=[response.data.data.products[s].brand,response.data.data.products[s].name, response.data.data.products[s].salePriceU/100+"р."];   
    }
    str='';
      
      buffer = xlsx.build([{name: 'Страница:', data: data}]);
robot.sendDocument(chatid, buffer,{},fileOptions);
    buffer=0;
        fileOptions=0;
        
  }).catch(err=>{console.log(err)})}, 10000);}

});
robot.on("ready",function(){
         console.log("Работаем");
         })


