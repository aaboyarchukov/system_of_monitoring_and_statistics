"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
interface ProfileData {
  firstName: string
  lastName: string
  height: string
  weight: string
  age: string
  photoUrl: string

  // email?: string
  // name?: string
  // surname?: string
  // sex?: string
  // height?: string
  // weight?: string
  // date_birth_ms?: number

}


export default function ProfileTab() {
  const defaultProfile: ProfileData = {
    firstName: "",
    lastName: "",
    height: "",
    weight: "",
    age: "",
    photoUrl: "../public/placeholder.svg?height=300&width=300",
  }

  const [profile, setProfile] = useState<ProfileData>(defaultProfile)
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile') // замените на свой API
        if (!res.ok) throw new Error('Ошибка при получении профиля')
        const data: ProfileData = await res.json()
        setProfile(data)
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error)
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-12 p-6">
      <div className="flex flex-col items-center gap-6">
        <div className="w-[300px] h-[300px] border-2 border-[#0f2d69] rounded-lg flex items-center justify-center overflow-hidden">
          {profile.photoUrl ? (
            <Image
              src={profile.photoUrl || "/placeholder.svg"}
              alt="Фото профиля"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="text-3xl font-bold text-[#0f2d69]">Фото</div>
          )}
        </div>
        <Button className="w-full bg-[#0f2d69] hover:bg-[#0f2d69]/90 text-white font-medium py-2 px-4 rounded-full cursor-pointer">
          Изменить
        </Button>
      </div>

      <div className="flex flex-col gap-6 text-xl">
        <div className="flex items-center gap-2">
          <span className="font-bold">Имя:</span>
          <span>{profile.firstName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Фамилия:</span>
          <span>{profile.lastName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Рост:</span>
          <span>{profile.height}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Вес:</span>
          <span>{profile.weight}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Возраст:</span>
          <span>{profile.age}</span>
        </div>
      </div>
    </div>
  )
}
