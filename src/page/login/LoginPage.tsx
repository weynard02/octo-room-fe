import React from "react";
import { Button, Input, Card } from "../../components";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Card
        className="w-full max-w-md"
        title="Login"
        description="Welcome! Please log in to continue."
      >
        <img src="/path/to/image.jpg" alt="Logo Image" className="mb-4 w-5" />
        <form className="space-y-6">
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
          />
          <Button type="submit" fullWidth size="lg">
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
