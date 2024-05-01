const Yup = require("yup");

const loginSchema = Yup.object({
  body: Yup.object({
    email: Yup.string().email("Invalid email").required("Contact is required"),
    password: Yup.string()
      .min(6, "At least should be at least 6 characters")
      .required("Password is required"),
  }),
});

module.exports = {
  loginSchema,
};
