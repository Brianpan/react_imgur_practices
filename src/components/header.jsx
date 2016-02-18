var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var Link = Router.Link;

var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');
module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  getInitialState: function(){
    return {topics: []}
  },
  componentWillMount: function(){
    Actions.getTopics();
  },
  render: function() {
  	return <nav className="nav navbar-default header">  
  	  <div className="container-fluid"> 

  	    <Link to="/" className="navbar-brand">
  	      圖庫API
  	    </Link>
  	    <ul className="nav navbar-nav navbar-right">
  	      {this.renderTopics()}
  	    </ul>
  	  </div>
  	</nav>
  },
  onChange: function(event, topics){
    this.setState({topics: topics});
  },
  renderTopics: function(){
    //取前四個topic
    //activeClassName 代表現在url match會加上active class
    return this.state.topics.slice(0, 4).map(function(topic){
      return <li key={topic.id}>
        <Link activeClassName="active" to={'topics/'+ topic.id}>
          {topic.name}
        </Link>
      </li>
    });
  }
});