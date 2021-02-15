const express = require('express');
const router  = express.Router();

const {
    getAllCosts,
    addNewCost,
    editCost,
    deleteCost
} = require('../controllers/cost.controller');

router.get('/allCosts', getAllCosts);
router.post('/addNewCost', addNewCost);
router.patch('/editCost', editCost);
router.delete('/deleteCost', deleteCost);

module.exports = router;