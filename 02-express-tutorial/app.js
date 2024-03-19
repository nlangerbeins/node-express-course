const express = require('express');
const app = express();
const { products } = require('./data');

app.use(express.static('./public'));

app.get('/api/v1/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/api/v1/products/:productID', (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find((product) => {
    return product.id === Number(productID);
  });

  if (!singleProduct) {
    return res.status(404).send('That product was not found');
  }
  return res.json(singleProduct);
});

app.get('/api/v1/query', (req, res) => {
  console.log(req.query);

  const { search, limit, price } = req.query;
  let sortedProducts = [...products];

  // Filter by search term
  //   if (search) {
  //     sortedProducts = sortedProducts.filter((product) =>
  //       product.name.startsWith(search)
  //     );
  //   }

  // Apply limit
  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit));
  }

  // Filter by maximum price
  if (price) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.price < parseFloat(price);
    });
  }

  // Filter by regular expression
  if (search) {
    const regex = new RegExp(search, 'i');
    sortedProducts = sortedProducts.filter((product) =>
      regex.test(product.name)
    );
  }

  res.status(200).json(sortedProducts);
});

app.all('*', (req, res) => {
  res.status(404).send('<h4>Page not found</h4>');
});

app.listen(3000);
