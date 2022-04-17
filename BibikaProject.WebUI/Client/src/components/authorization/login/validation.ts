import * as Yup from "yup";

export const validationFields = () => {
  return Yup.object().shape({
    email: Yup.string().email("Input valid email").required("Input email"),
    password: Yup.string()
      .required("Input password")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
        "Please valid password. 8 symbols. One uppercase, one lowercase, one special character and no spaces"
      ),
  });
};
