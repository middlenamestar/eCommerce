const router = require('express').Router();
const { Category, Product } = require('../../models');

// localhost:3001/api/categories

// Find all categories - localhost:3001/api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find one category by its id - localhost:3001/api/categories/id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new category - localhost:3001/api/categories
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by its id - localhost:3001/api/categories/id
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a category by its id localhost:3001/api/categories/id
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
