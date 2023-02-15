var express = require('express');
var router = express.Router();
var uuid = require ('node-uuid');
var { mobCollection, membersCollection } = require('./db');

/* GET users listing. */
// mobs/
router.get('/', (req, res, next) => {
  res.status(200);
  res.send(mobCollection);
});

// mobs/:id/members
router.get('/:id/members', (req, res, next) => {
  const membersArray = membersCollection.filter(member => member.mobId === req.params.id);
  if (membersArray.length === 0) {
    res.status(404);
    res.end()
    return;
  } else {
    res.status(200);
    res.send(membersArray);
  }
});

router.post('/', (req, res, next) => {
  const newId = uuid.v4();
  let mob = { 
    name: req.body.name,
    id: newId
  };
  mobCollection.push(mob);
  res.status(201);
  res.json(mob);
});

router.patch('/:id', (req, res, next) => {
  mobCollection.forEach(singleMob => {
    if (singleMob.id === req.params.id) {
      singleMob.name = req.body.name;
      res.status(200);
      res.send(singleMob);
      return;
    } else {
      res.status(404).end();
    }
  })
});

router.put('/:id', (req, res, next) => {
  const index = mobCollection.findIndex(singleMob => singleMob.id === req.params.id)
  if (index !== undefined) {
    mobCollection.splice(index, 1, req.body);
    res.status(200);
    res.send(mobCollection);
    return;
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', (req, res, next) => {
  const index = mobCollection.findIndex(singleMob => singleMob.id === req.params.id)
  if (index !== undefined) {
    mobCollection.splice(index, 1);
    res.status(200);
    res.send(mobCollection);
    return;
  } else {
    res.status(404).end();
  }
});

module.exports = router;
