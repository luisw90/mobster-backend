var express = require('express');
var router = express.Router();
const uuid = require('node-uuid');
var { membersCollection } = require('./db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.status(200);
  res.send(mob);
});

router.post('/', (req, res, next) => {
  let member = { 
    name: req.body.name,
    linkedin: req.body.linkedin,
    github: req.body.github,
    mobId: req.body.mobId
  }
  res.status(201).json(member);
});

router.patch('/:name/:id', (req, res, next) => {
  memberCollection.forEach(member => {
    if (member.name === req.params.name && member.mobId === req.params.id) {
      member.name = req.body.name;
      member.mobId = req.body.mobId;
      res.status(200);
      res.send(member);
      return;
    } else {
      res.status(404).end();
    }
  })
});

router.put('/:name/:id', (req, res, next) => {
  const index = memberCollection.findIndex(member => member.name === req.params.name && member.mobId === req.params.id)
  if (index !== undefined) {
    memberCollection.splice(index, 1, req.body);
    res.status(200);
    res.send(memberCollection);
    return;
  } else {
    res.status(404).end();
  }
});

router.delete('/:name/:id', (req, res, next) => {
  const index = memberCollection.findIndex(member => member.name === req.params.name && member.mobId === req.params.id)
  if (index !== undefined) {
    memberCollection.splice(index, 1);
    res.status(200);
    res.send(memberCollection);
    return;
  } else {
    res.status(404).end();
  }
});

module.exports = router;
