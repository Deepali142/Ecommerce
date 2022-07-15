const express = require('express');
const {createItem,Itemlist,searchById,updateItem,removeItem} = require('../controller/item');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/NewItem',createItem);
router.get('/itemlist',Itemlist);
router.get('/searchById',searchById);
router.put('/updateItem',authenticate,updateItem);
router.delete('/deleteitem',authenticate,removeItem);

module.exports = router;