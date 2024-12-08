const Banner = require('../models/banner');


// Upload Banner
exports.uploadBanner = async (req, res) => {
  try {
    const { image } = req.body;
    const banner = new Banner({ image });
    await banner.save();
    return res.status(201).send(banner);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Get Banners
exports.getBanner = async (req, res) => {
  try {
    const banners = await Banner.find();
    return res.status(200).send(banners);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Delete Banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params; // Get banner ID from the request params
    const banner = await Banner.findByIdAndDelete(id); // Find and delete the banner

    if (!banner) {
      return res.status(404).json({ error: "Banner not found" }); // Handle not found
    }

    return res.status(200).json({ message: "Banner deleted successfully", banner });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


