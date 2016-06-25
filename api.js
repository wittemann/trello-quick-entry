const user = require('./user.js');

const addCard = function(title) {
  var Trello = require("trello");
  var trello = new Trello(user.appKey, user.userToken);

  trello.addCard(title, null, user.listId,
    function (error, trelloCard) {
      if (error) {
        console.log('Could not add card:', error);
      } else {
        console.log('Added card:', trelloCard);
      }
    });
};

module.exports = {
  addCard
};
