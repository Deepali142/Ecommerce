const items = require('../model/item');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './image/items/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage }).single('image');

exports.createItem = async (req, res) => {
    upload(req, res, async function (err) {
        const { name, price, description, category } = req.body;
        const files = req.file;
        if (!name) {
            return res.send('Please enter name')
        }
        if (!price) {
            return res.send('Please enter price')
        }
        if (!description) {
            return res.send('Please enter description')
        }
        if (!files) {
            return res.send('Please select image')
        }
        if (!category) {
            return res.send('Please enter category')
        }

        const newItems = await items({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: req.file.path,
            owner: req.body.user_id
        })

        newItems.save().then((data) => {
            return res.send({ message: 'Item save successfully!!', data })
        }).catch((err) => {
            return res.send({ message: err.message })
        })

    })
};

exports.Itemlist = async (req, res) => {
    await items.find()
        .then((result) => {
            return res.send(result)
        }).catch((err) => {
            return res.send(err)
        })
};

exports.searchById = async (req, res) => {
    await items.findById({ _id: req.params._id })
        .then((result) => {
            return res.send(result)
        }).catch((err) => {
            return res.send(err)
        })
};

exports.updateItem = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.send({ message: err.message });
        }
        else {
            var files = req.file;
            var data = req.body;
            var id = data.id;
            if (id == null || id == undefined || id == '') {
                return res.send('Please enter valid id')
            }
            items.findById(err, datafind => {
                if (err) {
                    return res.send(err);
                } else {
                    items.findOneAndUpdate({ _id: id }, { $set: { data, files } })
                        .then((data) => {
                            return res.send(data)
                        }).catch((err) => {
                            return res.send(err)
                        })
                }
            })
        }
    })
};

exports.removeItem = async (req, res) => {
    await items.deleteOne({ _id: req.params.id }, { isDeleted: true })
    .then(() => {
        return res.send('Item deleted successfully!!')
    }).catch((err) => {
        return res.send(err)
    })
};