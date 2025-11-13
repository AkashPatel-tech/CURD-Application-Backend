const express = require("express");
const router = express.Router();
const {
  getCatalogs,
  getCatalogWithProducts,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  getAllCatalogsAndProducts,
} = require("../controllers/catalog.controller.js");

// All catalog routes
router.get("/all", getAllCatalogsAndProducts);
router.get("/", getCatalogs);
router.get("/:id", getCatalogWithProducts);
router.post("/", createCatalog);
router.put("/:id", updateCatalog);
router.delete("/:id", deleteCatalog);

module.exports = router;
