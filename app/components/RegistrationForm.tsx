'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const registrationSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 25 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must include at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must include at least one special character'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val, 'You must accept the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;


const getPasswordStrength = (password: string) => {
  if (!password) return 'None';
  if (password.length === 0) return 'None';
  if (password.length < 8) return 'Weak';
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (hasNumber && hasSpecialChar) return 'Strong';
  return 'Medium';
};

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkUsernameAvailability = async (username: string) => {
  
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const availableUsernames = ['user1', 'admin', 'test'];
    return !availableUsernames.includes(username);
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    console.log('Form submitted:', data);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  const password = watch('password');
  const passwordStrength = getPasswordStrength(password);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
     
      <div>
        <label className="block text-sm font-medium mb-1 text-black">Email</label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-3 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}
      </div>

   
      <div>
        <label className="block text-sm font-semibold mb-2 text-black">Username</label>
        <input
          {...register('username')}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
          placeholder="Enter your username"
          onBlur={async (e) => {
            const isAvailable = await checkUsernameAvailability(e.target.value);
            setIsUsernameAvailable(isAvailable);
          }}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>
        )}
        {isUsernameAvailable !== null && (
          <p className={`text-sm mt-1 ${isUsernameAvailable ? 'text-green-500' : 'text-red-500'}`}>
            {isUsernameAvailable ? 'Username is available' : 'Username is already taken'}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">Password</label>
        <input
          {...register('password')}
          type="password"
          className="w-full px-4 py-3 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
        )}
        <div className="mt-2">
          <p className="text-sm text-black">Password Strength:</p>
          <div className="w-full bg-gray-200 rounded-md h-2">
            <div
              className={`h-2 rounded-md ${
                passwordStrength === 'Weak'
                  ? 'bg-red-500'
                  : passwordStrength === 'Medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{
                width: `${
                  passwordStrength === 'Weak'
                    ? '33%'
                    : passwordStrength === 'Medium'
                    ? '66%'
                    : '100%'
                }`,
              }}
            />
          </div>
          <p className="text-sm mt-2 text-black">
            Strength:{" "}
            <span
              className={
                passwordStrength === 'Weak'
                  ? 'text-red-500'
                  : passwordStrength === 'Medium'
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }
            >
              {passwordStrength}
            </span>
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">Confirm Password</label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="w-full px-4 py-3 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="text-blue-500 text-sm mt-2">{errors.confirmPassword.message}</p>
        )}
      </div>


      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('terms')}
            className="mr-3"
          />
          <span className="text-sm text-black">I accept the terms and conditions</span>
        </label>
        {errors.terms && (
          <p className="text-blue-500 text-sm mt-1">{errors.terms.message}</p>
        )}
      </div>

      <button
         type="submit"
         disabled={isSubmitting}
         className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-700 disabled:bg-gray-400"
        >
         {isSubmitting ? 'Submitting...' : 'Register'}
    </button>
    </form>
  );
}