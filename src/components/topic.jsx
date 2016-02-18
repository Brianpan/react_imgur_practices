var React = require('react');

var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');

var ImagePreview = require('./image-preview');
//call react-router參數方式
// ex call id : this.props.params.id
module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange')
  ],
  getInitialState: function(){
  	return {images: []}
  },
  componentWillMount: function(){
    Actions.getImages(this.props.params.id);
  },
  componentWillReceiveProps: function(nextProps){
    //得到新props時會觸發這個func
    //再來看是否更新資料 re-render 
    //用來解決同樣component不同route不會重新get資料的問題
    Actions.getImages(nextProps.params.id);
    
  },	
  render: function(){
  	//會render 兩次
  	// 1. 開始getImages
  	// 2. 結束getImages
  	// 點擊其他同樣component的route不會重新mount
  	
  	return <div className="topic">
      {this.renderImages()}
    </div>
  },
  onChange: function(event, images){
    this.setState({images: images})
  },
  renderImages: function(){
  	return this.state.images.slice(0, 20).map(function(img){
  	  //把img的props透過{...img}傳入	
      return <ImagePreview key={img.id} {...img} />
  	});
  }	
})