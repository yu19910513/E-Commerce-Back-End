const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const result = await Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
    }); return res.status(200).json(result)}
  catch(err) {
    res.status(500).json(err)
  }
});



router.get('/:id', async (req, res) => {
  try {
    const result = await Category.findOne(
      {where:
        {id: req.params.id}
      },
      {
        include: {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    });
    return res.status(200).json(result)
  }
  catch(err) {
    res.status(500).json(err)
  }
});


router.post('/', async (req, res) => {
  try {
    const addedItem = await Category.create({category_name: req.body.category_name});
    return res.status(200).json(addedItem)
  } catch (error) {
    res.status(500).json(err)
  }
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
