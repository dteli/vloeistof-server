const router = require('express').Router();

const Op = require('sequelize').Op;

let Drinks = require('../db').import('../models/drinks');


// get all drinks
router.get('/', async (req, res) => {
  try {
    const data = await Drinks.findAll();

    res.send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});




// get all drinks by a specific user
router.get('/user/:id', async (req, res) => {
  try {
    const data = await Drinks.findAll({
      where: { userId: req.params.id }
    });

    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get('/created/:id', async (req, res) => {
  try {
    const data = await Drinks.findAll(
      {where: { cDBId: 0 }}
    );

    res.send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/api/:id', async (req, res) => {
  try {
    const data = await Drinks.findAll(
      {where: { cDBId: { [Op.ne]: 0 } }}
    );

    res.send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/favorite/:id', async (req, res) => {
  try {
    const data = await Drinks.findAll(
      {where: { favorite: true }}
    );

    res.send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


// get specific drink
router.get('/:id', async (req, res) => {
  try {
    const data = await Drinks.findOne({
      where: { id: req.params.id }
    });

    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



// post new drink
router.post('/new', async (req, res) => {
  try {
    const d = req.body.drink;

    const reply = await Drinks.create({
      name: d.name,
      ingredients: d.ingredients,
      instructions: d.instructions,
      cDBId: d.cDBId,
      userId: req.user.id,
      thumbUrl: d.thumbUrl
    });

    res.send(reply);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// modify drink
router.put('/:id', async (req, res) => {
  try {
    const d = req.body.drink;
    const id = req.params.id;
    const userId = req.user.id;

    let name = d.name;
    let ingredients = d.ingredients;
    let instructions = d.instructions;
    let thumbUrl = d.thumbUrl;
    let cDBId = d.cDBId;

    let d0 = await Drinks.findOne({ id, userId });

    if (!name) name = d0.name;
    if (!ingredients) ingredients = d0.ingredients;
    if (!instructions) instructions = d0.instructions;
    if (!thumbUrl) thumbUrl = d0.thumbUrl;
    if (!cDBId) cDBId = d0.cDBId;

    let response = Drinks.update({
      name,
      ingredients,
      instructions,
      thumbUrl,
      cDBId
    }, {where: {id, userId}});

    res.json(response)

  } catch (err) {
    res.status(500).json({message: err.message});
  }
});


// delete drink
router.delete('/:id', async (req, res) => {

});


module.exports = router;