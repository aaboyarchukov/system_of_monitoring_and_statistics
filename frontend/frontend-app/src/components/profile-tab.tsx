"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
interface ProfileData {
  email: string
  name: string
  surname: string
  sex: string
  height: number
  weight: number
  date_birth_ms: number
  photo_url: string

}

interface ProfileTabProps {
  user_id: number
}


export default function ProfileTab({user_id} : ProfileTabProps) {
  const defaultProfile: ProfileData = {
    email: "",
    name: "",
    surname: "",
    sex: "М",
    height: 0,
    weight: 0,
    date_birth_ms: (new Date()).getTime(),
    photo_url: "../public/placeholder.svg?height=300&width=300",
  }

  const [profile, setProfile] = useState<ProfileData>(defaultProfile)
  
  function getFullYearDifference(date1: Date, date2: Date): number {
    const yearsDiff = date2.getFullYear() - date1.getFullYear();
    const monthsDiff = date2.getMonth() - date1.getMonth();
    const daysDiff = date2.getDate() - date1.getDate();

    let fullYears = yearsDiff;
    
    const monthsDiffLessZero = monthsDiff < 0
    const monthsDiffIsZero = monthsDiff === 0
    const  daysDiffLessZero = daysDiff < 0

    if (monthsDiffLessZero || (monthsDiffIsZero && daysDiffLessZero)) {
      fullYears--;
    }

    return fullYears;
  }

  function GetSex(sex: string) : string {
    const sexMale = "Мужской" 
    const sexFemale = "Женский" 
    
    if (sex === "М") {
      return sexMale
    }

    return sexFemale
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:50640/get_profile/${user_id}`)
        if (!response.ok) {
          throw new Error('Ошибка при получении профиля')
        } 

        const profileData: ProfileData = await response.json()
        setProfile(profileData)

      } catch (error) {
        console.error('Ошибка загрузки профиля:', error)
      }
    }

    fetchProfile()
  }, [user_id])

  return (
    <div className="flex flex-col md:flex-row gap-12 p-6">
      <div className="flex flex-col items-center gap-6">
        <div className="w-[300px] h-[300px] border-2 border-[#0f2d69] rounded-lg flex items-center justify-center overflow-hidden">
          {profile.photo_url ? (
            <Image
              src={profile.photo_url}
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
          <span>{profile.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Фамилия:</span>
          <span>{profile.surname}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Пол:</span>
          <span>{GetSex(profile.sex)}</span>
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
          <span>{getFullYearDifference(new Date(profile.date_birth_ms), new Date())}</span>
        </div>
      </div>
    </div>
  )
}
