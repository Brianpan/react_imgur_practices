//Action 是一個proxy 去取用store裡面的資料
var Reflux = require('reflux');

module.exports =  Reflux.createActions([
  'getTopics',
  'getImages',
  'getImage'
]);