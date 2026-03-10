import React from "react";
import { Link } from "react-router-dom";
import { Button, Input, Card } from "../components";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-50">
      <Card
        className="w-full max-w-md"
        title="Create Account"
        description="Join us today! Please fill in your details."
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-linear-to-br from-red-600 to-red-800 rounded-md flex items-center justify-center text-xl text-white font-bold">
            OctoRoom
          </div>
        </div>
        <form className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            id="phone"
            name="phone"
            placeholder="+62 (555) 123-4567"
            required
          />
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            required
          />
          <Button
            type="submit"
            fullWidth
            size="lg"
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            Register
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-red-600 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
