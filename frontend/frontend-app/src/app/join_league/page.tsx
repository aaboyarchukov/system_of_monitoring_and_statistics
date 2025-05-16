"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Define types for our data
type League = {
  id: string
  name: string
}

export default function JoinLeaguePage() {
  const [sport, setSport] = useState("")
  const [leagueName, setLeagueName] = useState("")
  const [leagues, setLeagues] = useState<League[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch leagues when sport changes
//   useEffect(() => {
//     async function fetchLeagues() {
//       if (!sport) {
//         setLeagues([])
//         return
//       }

//       setIsLoading(true)
//       setError(null)
//       setLeagueName("") // Reset league selection when sport changes

//       try {
//         const response = await fetch(`/api/leagues?sport=${sport}`)

//         if (!response.ok) {
//           throw new Error("Failed to fetch leagues")
//         }

//         const data = await response.json()
//         setLeagues(data.leagues)
//       } catch (err) {
//         console.error("Error fetching leagues:", err)
//         setError("Failed to load leagues. Please try again.")
//         setLeagues([])
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchLeagues()
//   }, [sport])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ sport, leagueName })
  }

  const sportOptions = [
    { value: "football", label: "Football" },
    { value: "basketball", label: "Basketball" },
    { value: "volleyball", label: "Volleyball" },
    { value: "hockey", label: "Hockey" },
    { value: "tennis", label: "Tennis" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#374b9b]">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Вход в лигу</h1>

        <div className="bg-white rounded-2xl p-10 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-xl font-semibold text-[#0f2d69]">Спорт</label>
                <Select value={sport} onValueChange={setSport}>
                  <SelectTrigger className="w-full border-2 border-[#374b9b] rounded-full h-12 px-4">
                    <SelectValue placeholder="Choose type of sport" />
                  </SelectTrigger>
                  <SelectContent>
                    {sportOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="block text-xl font-semibold text-[#0f2d69]">Название лиги</label>
                <Select
                  value={leagueName}
                  onValueChange={setLeagueName}
                  disabled={isLoading || !sport || leagues.length === 0}
                >
                  <SelectTrigger className="w-full border-2 border-[#374b9b] rounded-full h-12 px-4">
                    {isLoading ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        <span>Loading leagues...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Name" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {leagues.map((league) => (
                      <SelectItem key={league.id} value={league.id}>
                        {league.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {!isLoading && sport && leagues.length === 0 && !error && (
                  <p className="text-amber-500 text-sm">No leagues found for this sport</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0f2d69] hover:bg-[#0f2d69]/90 text-white rounded-full py-3 h-12"
              disabled={isLoading || !sport || !leagueName}
            >
              Войти в лигу
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
