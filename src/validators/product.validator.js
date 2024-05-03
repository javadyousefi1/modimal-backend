const Yup = require("yup");

const productSchema = Yup.object({
  body: Yup.object({
    productName: Yup.string().required("product is required yup"),
    count: Yup.number("number").required("count is required yup"),
    size: Yup.string().required("size is required yup"),
    describtion: Yup.string().required("describtion is required yup"),
    price: Yup.number().required("describtion is required yup"),
  }),
});

module.exports = {
  productSchema,
};
