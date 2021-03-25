const express = require ('express');
const { urlController } = require ('../controllers');
var router = express.Router({
    strict: true
});

router.post('/',(req, res) => {
        // urlController(req, res);
    });

module.exports = router;