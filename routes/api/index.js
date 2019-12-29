const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth/index"));
router.use("/advertise", require("./advertise/index"));
router.use('/expert', require('./expert/index'));
router.use('/news', require('./news'))
router.use('/report', require('./report/index'))
router.use('/cash', require('./cash/index'))
router.use('/user', require('./user/index'))
router.use('/userad', require('./userad/index'))
module.exports = router;