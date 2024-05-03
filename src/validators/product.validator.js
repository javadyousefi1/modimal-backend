const Yup = require("yup");

const productSchema = Yup.object({
  body: Yup.object({
    // productName: Yup.string().required("product is required yup"),
    // count: Yup.number("number").required("count is required yup"),
  }),
});

module.exports = {
  productSchema,
};
