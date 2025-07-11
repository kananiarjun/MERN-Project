// Add review to a product
router.post('/:id/review', async (req, res) => {
  const { name, comment } = req.body;

  try {
    const product = await Product.findById(req.params._id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.reviews.push({ name, comment });
    await product.save();

    res.status(200).json({ message: 'Review added', reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error adding review', err });
  }
});
