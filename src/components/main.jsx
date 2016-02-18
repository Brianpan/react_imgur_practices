var React = require('react');
var Header = require('./header');

var TopicList = require('./topic-list');

module.exports = React.createClass({
  render: function(){
  	return <div>
  	  <Header/>
  	  <div className="container content">
        {this.content()}
      </div>
    </div>

  },
  content: function(){
  	//this.props.children 因為router要在main以外才會實現
    if(this.props.children){
      return this.props.children  	
    }else{
      return <TopicList />	
    }  	
  }	
})