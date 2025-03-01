"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { registerUser, loginUser } from "@/utils/authApi";

type FormData = {
  username?: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  isRegister: boolean;
};

export default function AuthForm({ isRegister }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (isRegister) {
        await registerUser({
          username: data.username || "",
          email: data.email,
          password: data.password,
        });
      } else {
        await loginUser({ email: data.email, password: data.password });
      }
      alert(isRegister ? "Registration successful!" : "Login successful!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen text-gray-900">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          {isRegister ? "Sign Up" : "Welcome Back"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[90%] md:max-w-md"
        >
          {isRegister && (
            <div className="mb-4 md:mb-6 relative">
              <label className="block mb-1 required-label">Username</label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.username && (
                <p className="absolute left-0 text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}
          <div className="mb-4 md:mb-6 relative">
            <label className="block mb-1 required-label">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.email && (
              <p className="absolute left-0 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4 md:mb-6 relative">
            <label className="block mb-1 required-label">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.password && (
              <p className="absolute left-0 text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {!isRegister && (
            <div className="text-right mb-4">
              <a href="#" className="text-blue-500 text-sm">
                Forgot Password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : isRegister ? "Sign Up" : "Sign In"}
          </button>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

          {isRegister && (
            <>
              <div className="flex items-center justify-center my-4">
                <div className="w-1/3 border-t"></div>
                <span className="px-2 text-gray-400">OR</span>
                <div className="w-1/3 border-t"></div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex items-center justify-center w-full border p-2 rounded-md hover:bg-gray-100">
                  <FcGoogle className="mr-2" /> Continue with Google
                </button>
                <button className="flex items-center justify-center w-full border p-2 rounded-md hover:bg-gray-100">
                  <FaApple className="mr-2" /> Continue with Apple
                </button>
              </div>
            </>
          )}

          <div className="text-center mt-4">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              href={isRegister ? "/auth/login" : "/auth/register"}
              className="text-blue-500"
            >
              {isRegister ? "Login" : "Sign Up"}
            </a>
          </div>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-gray-100">
        <img
          src="/login-image.jpg"
          alt="Login Illustration"
          className="rounded-lg w-[80%] md:w-3/4 lg:w-2/3 h-auto"
        />
      </div>
    </div>
  );
}
