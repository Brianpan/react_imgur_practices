var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
//npm install --save lodash
var _ = require('lodash');

module.exports = Reflux.createStore({
  listenables: [Actions],	
  getImages: function(topicId){
    Api.get('topics/'+topicId)
       .then(function(json){
       	  //lodash reject 篩選
       	  this.images = _.reject(json.data, function(image){
       	  	//回傳true 會fitler掉
       	  	return image.is_album
       	  });
       	  this.triggerChange();
       }.bind(this));
  },
  getImage: function(id){
    Api.get('gallery/image/'+ id)
       .then(function(json){
       	 //images存在直接push
 	     if(this.images){
 	     	this.images.push(json.data);
 	     }else{
 	        this.images = [json.data];	
 	     }

 	     this.triggerChange();  	
       }.bind(this));
  },
  find: function(id){
  	//找match id的出來_.find
    var image = _.find(this.images, {id: id});
    
    if(image){
      return image;	
    }else{
      //沒有事先找好就要透過id抓個別
      this.getImage(id);
      return null;	
    }
  },
  triggerChange: function(){
  	//會傳到listenTo那邊的callback function的參數裡
  	this.trigger('change', this.images);
  }
});