const Cart = require('../models/Cart');
const Image = require('../models/Image');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const catchError = require('../utils/catchError');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const results = await Purchase.findAll({ 
        where: { userId},
        include: {
            model: Product,
            include: [Image],
        }
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const cart = await Cart.findAll({
        where: {userId: req.user.id},
        attributes: ['userId', 'productId', 'quantity'],
        raw: true
    })

    const purchases = await Purchase.bulkCreate(cart)

    await Cart.destroy({where: {userId: req.user.id}})

    return res.json(purchases)
});

module.exports = {
    getAll,
    create
}