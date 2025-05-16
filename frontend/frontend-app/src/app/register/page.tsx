"use client"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NotificationProvider } from "@/components/auth-notification"
import { useNotification } from "@/components/auth-notification"
import { redirect } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const { showNotification } = useNotification();

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [gender, setGender] = useState("male")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const handleRegister = async () => {
    if (!name || !gender || !weight || !height || !birthDate || !login || !password || !repeatPassword) {
      alert("Пожалуйста, заполните все обязательные поля.")
      return
    }
  
    if (password !== repeatPassword) {
      alert("Пароль и повтор пароля не совпадают!")
      return
    }
  
    const parsedWeight = Number(weight)
    const parsedHeight = Number(height)
  
    if (isNaN(parsedWeight) || isNaN(parsedHeight)) {
      alert("Вес и рост должны быть числовыми значениями.")
      return
    }
  
    const parsedBirthDate = new Date(birthDate).getTime()
    if (isNaN(parsedBirthDate)) {
      alert("Некорректная дата рождения.")
      return
    }
  
    let normalizedGender = ""
    if (gender === "male") {
      normalizedGender = "М"
    } else if (gender === "female") {
      normalizedGender = "Ж"
    } else {
      alert("Пол должен быть либо 'М', либо 'Ж'.")
      return
    }
  
    const payload = {
      name,
      surname,
      sex: normalizedGender,
      weight: parsedWeight,
      height: parsedHeight,
      date_birth: parsedBirthDate,
      email: login,
      password,
    }
    
    console.log(payload)

    try {
      const response = await fetch("http://localhost:50540/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        console.error("Ошибка при регистрации:", errorData)
        showNotification(
          "error",
          "Registration Failed",
          errorData.message
        );
        // alert("Ошибка регистрации: " + (errorData.message || response.status))
        return
      }
  
      const result = await response.json()
      console.log("Регистрация прошла успешно:", result)
      showNotification(
        "success", // type: "success" | "error" | "warning" | "info"
        "Register Successful", // title
        "You have been successfully registered" // message
      );
      alert("Вы успешно зарегистрированы!")
      redirect("/login");
    } catch (error) {
      console.error("Сетевая ошибка:", error)
      showNotification(
        "error",
        "network error",
        "network error"
      );
    }
  }
  

  return (
    <NotificationProvider>
        <div className="flex items-center justify-center min-h-screen bg-[#374b9b]">
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-3xl shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-center text-[#0f2d69]">Регистрация</h1>
        <div className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Name*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69]"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Surname"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69]"
              onChange={(event) => setSurname(event.target.value)}
            />
          </div>
          <div className="flex gap-6 justify-around">
            <label className="flex items-center gap-2 cursor-pointer">
                <Input type="radio" name="gender" value="male" className="h-4 w-4" defaultChecked 
                onChange={(event) => setGender(event.target.value)}/>
                <span className="text-base">Мужской</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <Input type="radio" name="gender" value="female" className="h-4 w-4" 
                  onChange={(event) => setGender(event.target.value)}/>
                <span className="text-base">Женский</span>
            </label>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="Weight*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69]"
              required
              onChange={(event) => setWeight(event.target.value)}
            />
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="Height / cm*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69]"
              onChange={(event) => setHeight(event.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Input
              type="date"
              placeholder="Birth date*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69]"
              onChange={(event) => setBirthDate(event.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Email*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69]"
              required
              onChange={(event) => setLogin(event.target.value)}
            />
          </div>
          <div className="relative">
            <Input
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Password*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69] pr-12"
              onChange={(event) => setRepeatPassword(event.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#b5b5b5]"
            >
              {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Repeat password*"
              className="w-full px-4 py-6 border-[#b5b5b5] rounded-full focus:border-[#0f2d69] focus:ring-[#0f2d69] pr-12"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#b5b5b5]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="pt-4">
            <Button className="w-full py-6 font-medium text-white rounded-full bg-[#0f2d69] hover:bg-[#0f2d69]/90 cursor-pointer"
                    onClick={handleRegister}>
                Зарегистрироваться
              </Button>
            
          </div>
        </div>
      </div>
    </div>
    </NotificationProvider>
    
  )
}
