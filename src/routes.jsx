var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;

var Main = require('./components/main');
var Topic = require('./components/topic');
var ImageDetail = require('./components/image-detail');

// <Route path="topics/:id" component={Topic}>
// 設定參數傳到component
// call id方式 this.props.params.id
module.exports = (
  <Router>
    <Route path="/" component={Main}>
      <Route path="topics/:id" component={Topic}> 
      </Route>
      <Route path="images/:id" component={ImageDetail}/>   
    </Route>
  </Router>
);