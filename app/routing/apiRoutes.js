let friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    let bestScore, bestFriend;
    for (let i = 0; i < friends.length; i++) {
      let score = getScore(req.body.scores, friends[i].scores);
      if (i === 0) {
        bestScore = score;
        bestFriend = 0;
      } else {
        if (bestScore > score) {
          bestScore = score;
          bestFriend = i;
        }
      }
    }

    friends.push(req.body);
    res.json(friends[bestFriend]);
  });

};

let getScore = function (fr1, fr2) {
  let score = 0;

  for (let i = 0; i < fr1.length; i++) {
    let diff = Math.abs(parseInt(fr1[i]) - parseInt(fr2[i]));
    score += diff;
  }

  return score;
};
