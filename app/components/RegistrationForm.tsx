"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

// Define the schema for form validation
const registrationSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must include numbers and special characters"
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Infer the type from the schema
type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const [passwordStrength, setPasswordStrength] = useState("weak");

  const password = watch("password", "");

  // Calculate password strength
  useEffect(() => {
    const calculatePasswordStrength = (password: string) => {
      if (password.length >= 12) return "strong";
      if (password.length >= 8) return "medium";
      return "weak";
    };
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby="email-error"
        />
        {errors.email && (
          <p id="email-error" className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username
        </label>
        <input
          id="username"
          {...register("username")}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your username"
          aria-invalid={errors.username ? "true" : "false"}
          aria-describedby="username-error"
        />
        {errors.username && (
          <p id="username-error" className="text-red-500 text-sm mt-1">
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your password"
          aria-invalid={errors.password ? "true" : "false"}
          aria-describedby="password-error"
        />
        {errors.password && (
          <p id="password-error" className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
        <div className="mt-2">
          <div className="flex gap-2">
            <div
              className={`h-2 flex-1 rounded ${
                passwordStrength === "weak" ? "bg-red-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-2 flex-1 rounded ${
                passwordStrength === "medium" ? "bg-yellow-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-2 flex-1 rounded ${
                passwordStrength === "strong" ? "bg-green-500" : "bg-gray-200"
              }`}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Password Strength:{" "}
            <span className="font-medium capitalize">{passwordStrength}</span>
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Confirm your password"
          aria-invalid={errors.confirmPassword ? "true" : "false"}
          aria-describedby="confirmPassword-error"
        />
        {errors.confirmPassword && (
          <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          {...register("terms")}
          className="mr-2"
          aria-invalid={errors.terms ? "true" : "false"}
          aria-describedby="terms-error"
        />
        <label htmlFor="terms" className="text-sm">
          I accept the terms and conditions
        </label>
      </div>
      {errors.terms && (
        <p id="terms-error" className="text-red-500 text-sm mt-1">
          {errors.terms.message}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}