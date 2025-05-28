"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface CreatePlayerModalProps {
  onClose: () => void
  onCreatePlayer: (playerData: any) => void
}

export default function CreatePlayerModal({ onClose, onCreatePlayer }: CreatePlayerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    surname: "",
    weight: "",
    height: "",
    date: "",
    email: "",
    password: "",
    repeatPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.repeatPassword) {
      alert("Пароли не совпадают")
      return
    }
    onCreatePlayer(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-black hover:text-gray-200"
          aria-label="Закрыть"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Создание игрока</h2>

          <form onSubmit={handleSubmit} className="space-y-6 overflow-y">
            <div>
              <input
                type="text"
                placeholder="Name*"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3"
                required
              />
            </div>

            <div className="flex gap-6 justify-center">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="mr-2"
                />
                Мужской
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="mr-2"
                />
                Женский
              </label>
            </div>

            <div>
              <input
                type="text"
                placeholder="Surname"
                value={formData.surname}
                onChange={(e) => handleInputChange("surname", e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Weight*"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Height*"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3"
                required
              />
            </div>

            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email*"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password*"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Repeat Password*"
                value={formData.repeatPassword}
                onChange={(e) => handleInputChange("repeatPassword", e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                {showRepeatPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <button type="submit" className="primary-button w-full">
              Создать
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
