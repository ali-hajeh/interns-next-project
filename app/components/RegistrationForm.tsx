'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the schema for the form using Zod
const registrationSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[0-9]/, 'Password must include at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must include at least one special character'
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Infer the type of the form data from the schema
type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  // Load saved form data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('registrationForm');
    if (savedData) {
      reset(JSON.parse(savedData));
    }
  }, [reset]);

  // Save form data to localStorage whenever the form values change
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('registrationForm', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Watch password field for real-time validation
  const password = watch('password', ''); // Default to an empty string

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    if (!password) return 'Weak'; // Handle empty password
    if (password.length < 8) return 'Weak';
    if (!/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password))
      return 'Medium';
    return 'Strong';
  };

  const passwordStrength = getPasswordStrength(password);

  // Handle form submission
  const onSubmit = (data: RegistrationFormData) => {
    console.log('Form submitted:', data); // Debugging line
    localStorage.removeItem('registrationForm'); // Clear saved data after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register('email')}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Username Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          {...register('username')}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your username"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          {...register('password')}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
        <div className="mt-2">
          <p className="text-sm">
            Password Strength:{' '}
            <span
              className={`font-medium ${
                passwordStrength === 'Weak'
                  ? 'text-red-500'
                  : passwordStrength === 'Medium'
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }`}
            >
              {passwordStrength}
            </span>
          </p>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          {...register('confirmPassword')}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Terms and Conditions Field */}
      <div>
        <label className="flex items-center">
          <input type="checkbox" {...register('terms')} className="mr-2" />
          <span className="text-sm">I accept the terms and conditions</span>
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}
