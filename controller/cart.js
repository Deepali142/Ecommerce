const cart = require('../model/cart');
const item = require('../model/item');
const user = require('../model/user');

exports.createCart = async (req, res) => {
    const owner = req.user._id;
    const { itemId } = req.body;
    const quantity = Number.parseInt(req.body.quantity)
    try {
        const cart = await findOne({ owner });
        const item = await findOne({ _id: itemId });
        if (!item) {
            return res.send('Item not found')
        }
        const price = item.price;
        const name = item.name;

        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId == itemId)
            if (itemIndex > -1) {
                let product = cart.item[itemIndex];
                product.quantity = product.quantity + quantity;
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price
                }, 0);
                cart.items[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart);
            } else {
                cart.items.push({ itemId, name, price, quantity });
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price
                }, 0)
                await cart.save();
                res.status(200).send(cart)
            }
        } else {
            const newCart = await cart.create({
                owner,
                items: [{ itemId, name, quantity, price }],
                bill: quantity * price,
            })
            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Something went wrong')
    }
}

exports.getCart = async (req, res) => {
    const owner = req.user._id;
    try {
        const cart = await cart.findOne({ owner })
        if (cart && cart.item.length > 0) {
            return res.send(cart)
        } else {
            return res.send(null)
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}

exports.removeCart = async (req, res) => {
    const owner = req.user._id;
    const itemId = req.body.itemId;

    try {
        const cart = await cart.findOne({ owner });
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId == itemId)
            if (itemIndex > -1) {
                let product = cart.item[itemIndex];
                cart.bill = cart.bill - product.quantity * product.price
                if (cart < 0) {
                    cart.bill = 0;
                }
                cart.item.splice(itemIndex, 1);
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price
                }, 0)
                await cart.save();
                return res.status(200).send(cart);
            } else {
                return res.send('Item not found')
            }
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}









