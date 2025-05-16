"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import ProfileTab from "./profile-tab"
import { redirect } from "next/navigation"
import StatisticsTab from "./statistics-tab"
import ScheduleTab from "./schedule-tab"
import TournamentTableTab from "./tournament-table-tab"

interface SportsPageProps {
  sport: string
  league: string
}

export default function SportsPage({ sport, league }: SportsPageProps) {
  return (
    <div className="min-h-screen bg-[#374b9b] flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 mb-4 flex justify-between items-center">
        <h1 className="text-[#0f2d69] text-3xl font-bold">
          {sport}. {league}
        </h1>
        <button
          onClick={() => {redirect("/join_league")}}
          className="bg-[#0f2d69] hover:bg-[#0f2d69]/90 text-white font-medium py-2 px-4 rounded-full text-sm"
        >
          Сменить лигу
        </button>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl p-2 mb-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full bg-transparent grid grid-cols-4 gap-2">
            <TabsTrigger
              value="profile"
              className="relative data-[state=active]:shadow-none rounded-none bg-transparent text-[#0f2d69] font-semibold text-lg after:absolute after:h-0.5 after:bg-[#0f2d69] after:bottom-0 after:left-1/4 after:right-1/4 after:w-1/2 after:scale-0 data-[state=active]:after:scale-100"
            >
              Профиль
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="relative data-[state=active]:shadow-none rounded-none bg-transparent text-[#0f2d69] font-semibold text-lg after:absolute after:h-0.5 after:bg-[#0f2d69] after:bottom-0 after:left-1/4 after:right-1/4 after:w-1/2 after:scale-0 data-[state=active]:after:scale-100"
            >
              Статистика
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="relative data-[state=active]:shadow-none rounded-none bg-transparent text-[#0f2d69] font-semibold text-lg after:absolute after:h-0.5 after:bg-[#0f2d69] after:bottom-0 after:left-1/4 after:right-1/4 after:w-1/2 after:scale-0 data-[state=active]:after:scale-100"
            >
              Расписание
            </TabsTrigger>
            <TabsTrigger
              value="standings"
              className="relative data-[state=active]:shadow-none rounded-none bg-transparent text-[#0f2d69] font-semibold text-lg after:absolute after:h-0.5 after:bg-[#0f2d69] after:bottom-0 after:left-1/4 after:right-1/4 after:w-1/2 after:scale-0 data-[state=active]:after:scale-100"
            >
              Турнирная таблица
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="profile" className="m-0">
              <ProfileTab/>
            </TabsContent>
            <TabsContent value="statistics" className="m-0">
              {/* <div className="p-6 text-center text-[#0f2d69]">Статистика игрока будет здесь</div> */}
              <StatisticsTab/>
            </TabsContent>
            <TabsContent value="schedule" className="m-0">
              <ScheduleTab/>
            </TabsContent>
            <TabsContent value="standings" className="m-0">
              <TournamentTableTab/>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* <div className="w-full max-w-4xl bg-white rounded-3xl p-6 min-h-[600px]"> */}
        {/* Content area - empty in the design */}
      {/* </div> */}
    </div>
  )
}
