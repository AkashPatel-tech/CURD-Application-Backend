const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter catalog name"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Catalog = mongoose.model("Catalog", CatalogSchema);
module.exports = Catalog;
