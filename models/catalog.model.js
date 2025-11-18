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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CatalogSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "catalogId",
});

const Catalog = mongoose.model("Catalog", CatalogSchema);
module.exports = Catalog;
