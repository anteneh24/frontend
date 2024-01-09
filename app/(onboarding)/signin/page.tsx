"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("singin");
    try {
      const response = await axios.post(
        "http://ec2-16-171-35-75.eu-north-1.compute.amazonaws.com:3000/login",
        {
          username,
          password,
        }
      );

      if (response.data.status) {
        // Successful login
        // Redirect or perform other actions
        router.push("/");
        console.log(response.data.message);
      } else {
        // Unsuccessful login, show an error message
        setError(response.data.message);
      }
    } catch (error: any) {
      console.error("Error in login request:", error.message);
      setError("Internal server error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-7xl text-white font-semibold">Sign in</h1>
        <form className="flex min-w-[350px] flex-col gap-6 items-center">
          {/* Input fields for username and password */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-input p-3 px-5 rounded-xl text-white placeholder-white"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-input p-3 px-5 rounded-xl text-white placeholder-white"
            />
          </div>
          {/* Remember me checkbox */}
          <div className="w-full flex gap-4 items-center justify-center">
            <input type="checkbox" name="" id="" />
            <p className="text-white">Remember me</p>
          </div>
          {/* Display error message if login fails */}
          {error && <p className="text-red-500">{error}</p>}
          {/* Login button */}
          <button
            type="button"
            onClick={handleLogin}
            className="bg-primary text-white w-full py-4 rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
