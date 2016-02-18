var Api = require('../utils/api');
var Reflux = require('reflux');

var Actions = require('../actions');
//reflux 儲存資料從 api來的
//listenable會把getTopics綁到Actions上 
module.exports = Reflux.createStore({
  listenables: [Actions],	
  getTopics: function(){
  	return Api.get('topics/defaults')
  		      .then(function(json){
  		      	this.topics = json.data;
  		      	//
  		      	this.triggerChange();
  		      }.bind(this));	
  },
  triggerChange: function(){
  	//trigger 是reflux 內建
  	// 'change' event you want to trigger
  	// this.topics代表在change event 觸發會回傳的資料
    this.trigger('change', this.topics);
  }
});