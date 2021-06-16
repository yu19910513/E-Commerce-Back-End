const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {

  try {
    const all_tags = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    });
    res.status(200).json(all_tags)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
try {
  const one_tag = await Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  });
  res.status(200).json(one_tag)
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const new_tag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(new_tag)
  } catch (err) {
    console.log(err);
      res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const updated_tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updated_tag)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted_tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleted_tag) {
      res.status(404).json({message: 'No tag found with this id'});
    } else {return res.status(200).json(deleted_tag)}

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
