const Catalog = require("../models/catalog.model.js");
const Product = require("../models/product.model.js");

// Get all catalogs
const getCatalogs = async (req, res) => {
  try {
    const catalogs = await Catalog.find({});
    res.status(200).json(catalogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single catalog with its products
const getCatalogWithProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const catalog = await Catalog.findById(id);
    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }

    // mapped all product to the paticular catalog
    const products = await Product.find({ catalogId: id });

    res.status(200).json({ catalog, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create catalog
const createCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.create(req.body);
    res.status(201).json(catalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update catalog
const updateCatalog = async (req, res) => {
  try {
    const { id } = req.params;
    const catalog = await Catalog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!catalog) return res.status(404).json({ message: "Catalog not found" });
    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete catalog
const deleteCatalog = async (req, res) => {
  try {
    const { id } = req.params;
    const catalog = await Catalog.findByIdAndDelete(id);
    if (!catalog) return res.status(404).json({ message: "Catalog not found" });

    // delete its products too
    await Product.deleteMany({ catalogId: id });

    res
      .status(200)
      .json({ message: "Catalog and its products deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all catalogs and all product at a one time
const getAllCatalogsAndProducts = async (req, res) => {
  try {
    // Fetch both catalogs and products
    const [catalogs, products] = await Promise.all([
      Catalog.find({}),
      Product.find({}).populate("catalogId", "name description"),
    ]);

    res.status(200).json({
      catalogs,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCatalogs,
  getCatalogWithProducts,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  getAllCatalogsAndProducts,
};
