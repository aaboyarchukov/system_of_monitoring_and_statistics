"use client"
import { redirect } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { NotificationProvider } from "@/components/auth-notification"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    // Простая валидация
    if (!email || !email.includes("@")) {
      alert("Введите корректный email")
      return
    }

    if (!password) {
      alert("Пароль не может быть пустым")
      return
    }

    try {
      const response = await fetch("http://localhost:50540/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const { message } = await response.json()
        alert(message || "Ошибка входа")
        return
      }

      alert("Вы успешно вошли!")
    } catch (error) {
      console.error("Login error:", error)
      console.log("Login error:", error)
      alert("Ошибка при подключении к серверу")
    } finally {
      redirect("/join_league")
    }
  }


  return (
    <NotificationProvider>
      <div className="flex items-center justify-center min-h-screen bg-[#374b9b]">
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-3xl shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-center text-[#0f2d69]">Вход</h1>

        <div className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Email*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69] pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Button onClick={() => {
              handleLogin()
            }} className="w-full py-6 font-medium text-white rounded-full bg-[#0f2d69] hover:bg-[#0f2d69]/90 cursor-pointer">
              Войти
            </Button>
          </div>
        </div>
      </div>
    </div>
    </NotificationProvider>
    
  )
}
