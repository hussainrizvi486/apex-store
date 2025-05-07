import React from 'react'
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Apple, Facebook, Twitter, Twitch, Linkedin } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <NavLink to="/" className="text-[1.25rem] font-bold">
            <span className="text-violet-500">Apex</span>
            <span className='font-normal'>Store</span>
          </NavLink>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          CREATE AN ACCOUNT
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Complete all fields to create your Logi ID.
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <Input
              placeholder="Please enter your first name"
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <Input
              placeholder="Last Name"
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <Input
              placeholder="DD/MM/YYYY"
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              placeholder="Email address"
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              placeholder="Password"
              className="mt-1 w-full"
            />
          </div>
          <div className="flex items-center">
            <input
              id="marketingOptIn"
              type="checkbox"
              className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="marketingOptIn" className="text-sm font-medium text-gray-700">
              I want personalized marketing from Logitech. You can unsubscribe anytime. See
              our <NavLink to="#" className="text-blue-500 hover:underline">Privacy Policy</NavLink>.
            </label>
          </div>

          <p className="text-xs text-gray-500">
            By creating an account, you agree to our
            <NavLink to="#" className="text-blue-500 hover:underline">Terms of Service</NavLink> and have reviewed our
            <NavLink to="#" className="text-blue-500 hover:underline">Privacy Policy</NavLink>. You agree to receive text messages and/or email communications.
            This site is protected by hCaptcha and its
            <NavLink to="#" className="text-blue-500 hover:underline">Privacy Policy</NavLink> and
            <NavLink to="#" className="text-blue-500 hover:underline">Terms of Service</NavLink> apply.
          </p>

          <Button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
            CREATE
          </Button>
        </form>

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-1/3" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <div className="border-t border-gray-300 w-1/3" />
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Facebook className="h-5 w-5 text-blue-500" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Apple className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Twitter className="h-5 w-5 text-blue-500" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Twitch className="h-5 w-5 text-purple-500" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Linkedin className="h-5 w-5 text-blue-600" />
          </Button>
        </div>

        <div className="text-center text-sm">
          <NavLink to="/login" className="text-blue-500 hover:underline">
            HAVE AN ACCOUNT? LOGIN
          </NavLink>
        </div>
      </div>
    </div>
  );
};


