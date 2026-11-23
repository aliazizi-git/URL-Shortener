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
      "password must contain uppercase, lowercase, number, and special character"
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
          await api.post("/auth/register", values);
          notify("success", "User created successfully! Please sign in.");
          formik.resetForm();
          setIsLogin(true);
        }
      } catch (error) {
        const message = error.response?.data?.message || "Authentication failed";
        notify("error", message);
      }
    },
  });

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm mx-auto">
        <div className="p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800 shadow-xl backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-zinc-100">
              {isLogin ? "Sign in to account" : "Create an account"}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              {isLogin ? "Enter your credentials to continue" : "Start shortening links with custom aliases"}
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                Username {isLogin && "or Email"}
              </label>
              <input
                type="text"
                {...formik.getFieldProps("username")}
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-zinc-700 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition font-mono"
                placeholder="username"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-xs text-rose-400 mt-1 font-mono">{formik.errors.username}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-zinc-700 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition font-mono"
                  placeholder="name@domain.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{formik.errors.email}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-zinc-700 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition font-mono"
                placeholder="••••••••"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-rose-400 mt-1 font-mono leading-tight">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-sm font-semibold tracking-tight transition cursor-pointer shadow-sm shadow-emerald-500/10"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800/80 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                formik.resetForm();
              }}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition font-mono cursor-pointer"
            >
              {isLogin ? "Need an account? Sign Up →" : "Already registered? Sign In →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
