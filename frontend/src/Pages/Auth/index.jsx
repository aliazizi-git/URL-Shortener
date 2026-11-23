import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import api from "../../Services/api";
import { useDispatch } from "react-redux";
import notify from "../../../Utils/notify";
import { useNavigate } from "react-router-dom";
import { login } from "../../Store/Slices/authSlice";
export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const registerSchema = Yup.object({
    username: Yup.string()
      .required("username is required")
      .max(50, "max length of username is 50 character"),
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string().matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  });
  const loginSchema = Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: isLogin ? loginSchema : registerSchema,
    onSubmit: async (values) => {
      try {
        if (isLogin) {
          const res = await api.post("/auth/login", {
            username: values.username,
            password: values.password,
          });
          const { token, user } = res.data.data;
          dispatch(login({ token, user }));
          notify("success", "You logged in successfully");
          navigate("/");
        } else {
          const res = await api.post("/auth/register", values);
          notify("success", "user created successfully");
          formik.resetForm();
          setIsLogin(true);
        }
      } catch (error) {
        const message = error.response?.data?.message;
        notify("error", message);
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" {...formik.getFieldProps("username")} />
        {formik.touched.username && formik.errors.username && (
          <p>{formik.errors.username}</p>
        )}
        {!isLogin && (
          <>
            <input type="text" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email && (
              <p>{formik.errors.email}</p>
            )}
          </>
        )}
        <input type="text" {...formik.getFieldProps("password")} />
        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}
        <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            formik.resetForm();
          }}
        >
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </form>
    </div>
  );
}
