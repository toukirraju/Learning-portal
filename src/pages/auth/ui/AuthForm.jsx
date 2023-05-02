import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useSignInMutation,
  useStudentRegisterMutation,
} from "../../../redux/featuers/auth/authApi";
import AuthInput from "./AuthInput";
import { Loader } from "@mantine/core";
import ErrorMessage from "../../../components/ErrorMessage";

const AuthForm = ({ authType }) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signIn, { isSuccess, isLoading, isError, error }] =
    useSignInMutation();

  const [
    studentRegister,
    {
      isSuccess: reqSuccess,
      isLoading: regLoading,
      isError: reqIsError,
      error: regError,
    },
  ] = useStudentRegisterMutation();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authType === "studentRegister") {
      if (formValue.password !== formValue.confirmPassword) {
        alert("Password dose not match");
      } else {
        const { confirmPassword, ...newFormValue } = formValue;
        newFormValue.role = "student";
        newFormValue.id = Math.floor(new Date().getTime().toString());
        // console.log(newFormValue);
        studentRegister(newFormValue);
      }
    } else {
      signIn(formValue);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/dashboard");
    } else if (reqSuccess) {
      navigate("/course-player");
    }
  }, [isSuccess, reqSuccess]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className={`px-3 py-5  relative ${!isError && "hidden"}`}>
        {isError && error?.data && <ErrorMessage message={error?.data} />}
      </div>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        {/* <div>
          <label for="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            autocomplete="name"
            required
            className="login-input rounded-t-md"
            placeholder="Student Name"
          />
        </div> */}

        {authType === "studentRegister" && (
          <AuthInput
            name="name"
            type="text"
            required
            value={formValue.name}
            onChange={handleChange}
            className="login-input rounded-t-md"
            placeholder="Student Name"
          />
        )}

        <AuthInput
          name="email"
          type="email"
          required
          value={formValue.email}
          onChange={handleChange}
          className={`login-input ${
            authType !== "studentRegister" && "rounded-t-md"
          } `}
          placeholder="Email address"
        />
        {/* <div>
              <label className="sr-only">Email address</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formValue.email}
                onChange={handleChange}
                className="login-input rounded-t-md"
                placeholder="Email address"
              />
            </div> */}
        <AuthInput
          name="password"
          type="password"
          required
          value={formValue.password}
          onChange={handleChange}
          placeholder="Password"
          className={`login-input ${
            authType !== "studentRegister" && "rounded-b-md"
          } `}
        />

        {authType === "studentRegister" && (
          <AuthInput
            name="confirmPassword"
            type="password"
            required
            value={formValue.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="login-input rounded-b-md"
          />
        )}

        {/* <div>
          <label for="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autocomplete="confirm-password"
            required
            className="login-input rounded-b-md"
            placeholder="Confirm Password"
          />
        </div> */}
        {/* <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formValue.password}
                onChange={handleChange}
                className="login-input rounded-b-md"
                placeholder="Password"
              />
            </div> */}
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          {authType === "studentRegister" ? (
            <Link
              to="/"
              className="font-medium text-violet-600 hover:text-violet-500"
            >
              Already have an account
            </Link>
          ) : (
            authType !== "adminLogin" && (
              <Link
                to="/student/register"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Create New Account
              </Link>
            )
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-violet-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader
              color="violet"
              size="xl"
              variant="dots"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            />
          )}

          {authType === "adminLogin" || authType === "studentLogin"
            ? "Sign in"
            : "Sign up"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
