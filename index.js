const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

const productsRouter = require('./productsRouter');
const cartsRouter = require('./cartsRouter');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//Prueba prueba