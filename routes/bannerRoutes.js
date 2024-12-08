const express = require('express');
const { uploadBanner, getBanner, deleteBanner } = require('../controllers/bannerController');
const bannerRouter = express.Router();

bannerRouter.post('/api/banner', uploadBanner);

bannerRouter.get('/api/banner', getBanner);

bannerRouter.delete('/api/dltbanner/:id', deleteBanner);

module.exports = bannerRouter;