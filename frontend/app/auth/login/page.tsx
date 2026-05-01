"use client";

import { login } from "@/utility/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading] = useState<boolean>(false);
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(form);
    if(res.success){
      console.log(res.data);
    }else{
      console.log(res.error);
    }
    setLoading(false)
    if(res.success){
      router.push("/game");
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
      <div className="bg-[#2a2a2a] p-8 rounded-2xl w-[350px] shadow-xl">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Email"
            className="p-3 rounded-lg bg-[#3a3a3a] text-white outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-[#3a3a3a] text-white outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold">
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-green-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}