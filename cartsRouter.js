const express = require('express');
const fs = require('fs');
const router = express.Router();
const cartsFilePath = './carts.json';

// Crear un nuevo carrito
router.post('/', (req, res) => {
    const carts = JSON.parse(fs.readFileSync(cartsFilePath));
    const newCart = {
        id: carts.length + 1, // Autogenerar ID
        products: []
    };
    carts.push(newCart);
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
    res.status(201).json(newCart);
});

// Listar productos de un carrito por id
router.get('/:cid', (req, res) => {
    const carts = JSON.parse(fs.readFileSync(cartsFilePath));
    const cart = carts.find(c => c.id === req.params.cid);
    res.json(cart ? cart.products : []);
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const carts = JSON.parse(fs.readFileSync(cartsFilePath));
    const products = JSON.parse(fs.readFileSync('./products.json'));
    const cart = carts.find(c => c.id === req.params.cid);
    const product = products.find(p => p.id === req.params.pid);

    if (cart && product) {
        const existingProduct = cart.products.find(p => p.product === req.params.pid);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: req.params.pid, quantity: 1 });
        }
        fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Carrito o producto no encontrado' });
    }
});

module.exports = router;