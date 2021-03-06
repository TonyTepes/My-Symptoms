const db = require("../models");
let userController = module.exports;

userController.getUsers = (req, res) => {
  db.User.findAll({
    include: [db.Symptom],
    attributes: ["username", "status"]
  }).then(dbUser => {
    res.json(dbUser);
  });
};

userController.getUserById = (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Symptom]
  }).then(dbUser => {
    res.json(dbUser);
  });
};

userController.deleteUser = (req, res) => {
  if (req.user) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbUser => {
      res.json(dbUser);
    });
  } else {
    res.redirect("/signin");
  }
};
