"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/authContext"; // Import useAuth

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // Use the login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate a login API call
    try {
      // Replace this with your actual login API call
      const userData = await fakeLoginApi(email, password);

      // Call the login function from AuthContext
      login(userData);

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  // Simulate a fake login API call
  const fakeLoginApi = async (email: string, password: string) => {
    // Replace this with your actual API call
    return new Promise<{ id: string; name: string; email: string }>(
      (resolve, reject) => {
        setTimeout(() => {
          if (email === "admin@gmail.com" && password === "admin") {
            resolve({
              id: "123",
              name: "admin",
              email: "admin@gmail.com",
            });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1000); // Simulate network delay
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
