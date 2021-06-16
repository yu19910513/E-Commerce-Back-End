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
  } catch (err) {
    res.status(500).json(err)
  }
});


router.put('/:id', async(req, res) => {
try {
  const update = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  if (!update) {
    res.status(404).json({message:'No category found with this id'})
  } else {
    return res.status(200).json(update);
  }
}

catch (err) {
  console.log(err);
  res.status(500).json(err);
}
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
try {
  const deletedData = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  if (!deletedData) {
    res.status(404).json({message:'No category found with this id'})
  } else {
    return res.status(200).json(deletedData);
  }

} catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // delete a category by its `id` value
});

module.exports = router;
