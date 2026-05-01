"use client";

import { signup } from "@/utility/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [loading,setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profile_img:""
  });
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await signup(form);
    if(res.success){
      console.log(res.data)
    }else{
      console.log(res.error);
    }
    setLoading(false);
    if(res.success){
      router.push("/game");
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
      <div className="bg-[#2a2a2a] p-8 rounded-2xl w-[350px] shadow-xl">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Username"
            className="p-3 rounded-lg bg-[#3a3a3a] text-white outline-none"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="p-3 rounded-lg bg-[#3a3a3a] text-white outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Profile Image Url"
            className="p-3 rounded-lg bg-[#3a3a3a] text-white outline-none"
            onChange={(e) =>
              setForm({ ...form, profile_img: e.target.value })
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
          {
            loading?"signing Up...":"sign up"
          }
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}