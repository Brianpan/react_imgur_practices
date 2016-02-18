//api request 位置
//先安裝 whatwg-fetch
//fetch 是browser 內建function

var Fetch = require("whatwg-fetch");
var rootUrl = "https://api.imgur.com/3/";
var apiKey = "07d0378d4594666";

//註冊到window 裡面的api 變數
//故可以在被require後用api 在browser裡面呼叫

module.exports = window.api = {
  get: function(url){
  	return fetch(rootUrl+url, {
      //用header驗證
      headers: {
      	'Authorization': 	'Client-ID ' + apiKey
      }
  	})
  	.then(function(response){
  	  //轉成json格式	
      return response.json();
  	});
  }	
}
