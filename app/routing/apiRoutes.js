let friends = require('../data/friends');

module.exports = (app) => {

  app.get('/api/friends', (req, res) => res.json(friends));

  app.post('/api/friends', (req, res) => {

    let bestScore, bestFriend = 0;

    friends.forEach((fr, i) => {
      let score = 0;
      req.body.scores.forEach((sc, j) => 
        score += Math.abs(parseInt(sc) - parseInt(fr.scores[j])));
      if (i === 0) bestScore = score;
      if (score < bestScore) {
        bestFriend = i;
        bestScore = score;
      }
    });

    friends.push(req.body);
    res.json(friends[bestFriend]);
  });

};
