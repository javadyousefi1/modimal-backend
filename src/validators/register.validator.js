const Yup = require("yup");

const registerSchema = Yup.object({
  body: Yup.object({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    email: Yup.string().email("Invalid email").required("Contact is required"),
    password: Yup.string()
      .min(6, "At least should be at least 6 characters")
      .required("Password is required"),
  }),
});

module.exports = {
  registerSchema,
};
