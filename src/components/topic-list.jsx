
var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var TopicStore = require('../stores/topic-store');
var Actions = require('../actions');

module.exports = React.createClass({
  mixins: [
    //當TopicStore被trigger run 'onChange' function
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  getInitialState: function(){
    return {
      topics: []	
    }
  },
  componentWillMount: function(){
    // TopicStore.getTopics();
    // 改用Action 寫法 把使用store的方式透過Actions
    Actions.getTopics();
  }, 
  render: function(){
    return <div className="list-group">
      <h2>Topic List</h2>
      {this.renderTopics()}
    </div>
  },
  renderTopics: function(){
  	return this.state.topics.slice(0, 4).map(function(topic){
  	  //link to 指定 route id	
  	  return <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
  	    <h4>{topic.name}</h4>
  	    <p>{topic.description}</p>
  	  </Link>	
  	});
  },
  //TopicStore被呼叫 trigger onChange函數
  //改變state re-render component 更新資料 
  onChange: function(event, topics){
	// 把TopicStore裡面 this.trigger()裡面的params傳到這裏
  	// console.log(event);
  	this.setState({topics: topics});
  }	
});

//npm install --save reflux
// componentWillMount API做法的缺點
// - siblings間無法溝通 props 只能 縱向溝通
// - 容易有duplicated code
// - component不應該有處理資料邏輯的部份

//getInitialState: function(){
  //   return {
  //     topics: []	
  //   }
  // },
  // componentWillMount: function(){
  //   Api.get('topics/defaults')
  //      .then(function(data){
  //        this.setState({
  //            資料存在data key裡 	
  //        	topics: data.data 
  //        });	
  //      }.bind(this));
  // },
  // render: function(){
  //   return <div className="list-group">
  //     {this.renderTopics()}
  //   </div>
  // },
  // renderTopics: function(){
  // 	return this.state.topics.map(function(topic){
  // 	  return <li>
  // 	    {topic}
  // 	  </li>	
  // 	});
  // }
 // -----------
 // 仍可refactor 
 // componentWillMount: function(){
 //    TopicStore.getTopics()
 //    		  .then(function(){
 //    		  	//綁定最外層的this
 //    		  	this.setState({
 //    		  	  //TopicStore.topics call getTopics得到的topics 	
 //    		  	  topics: TopicStore.topics	
 //    		  	})
 //    		  }.bind(this))	 
 //  },
