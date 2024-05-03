const Yup = require("yup");

const productSchema = Yup.object({
  // body: Yup.object({
  // }),
  productName: Yup.string().required("product is required"),
});

module.exports = {
  productSchema,
};
