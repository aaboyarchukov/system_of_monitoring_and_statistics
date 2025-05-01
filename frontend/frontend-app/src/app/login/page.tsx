"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#374b9b]">
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-3xl shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-center text-[#0f2d69]">Вход</h1>

        <div className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Email*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69]"
              required
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69] pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#b5b5b5]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-center">
            <Link href="/register" className="text-sm italic text-[#0f2d69] hover:underline">
            Регистрация
            </Link>
          </div>

          <div className="pt-4">
            <Button className="w-full py-6 font-medium text-white rounded-full bg-[#0f2d69] hover:bg-[#0f2d69]/90 cursor-pointer">
              Войти
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
