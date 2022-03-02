const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// localhost:3001/api/tags

// localhost:3001/api/tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product
    });
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

// localhost:3001/api/tags/id
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product
    })
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

// localhost:3001/api/tags
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// localhost:3001/api/tags/id
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE - localhost:3001/api/tags/id
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
