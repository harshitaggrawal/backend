const express = require('express');
const { addNewAdmin, getAdmin, removeAdmin } = require('../Controller/addAdmin');
const router = express.Router();

router.post('/admin', addNewAdmin);        
router.get('/admin', getAdmin);            
router.delete('/admin/:id', removeAdmin);  

module.exports = router;
