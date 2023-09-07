app.get('/api/products', async (req, res) => {
 try {
   const products = await stripe.products.list({
     limit: 3,
   });

   res.json({ products: products.data });
 } catch (error) {
   console.error('Error:', error);
   res.status(500).json({ error: 'Error fetching products' });
 }
});
