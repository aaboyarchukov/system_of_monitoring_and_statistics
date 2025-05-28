"use client"

import { Button } from "@/components/ui/button"

interface PlayerCircleProps {
  number: number
  isOnCourt: boolean
  onClick: () => void
  className?: string
  isHighlighted?: boolean
  isDisqualified?: boolean
  fouls?: number
}

export function PlayerCircle({
  number,
  isOnCourt,
  onClick,
  className = "",
  isHighlighted = false,
  isDisqualified = false,
  fouls = 0,
}: PlayerCircleProps) {
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className={`w-12 h-12 rounded-full text-white font-bold border-2 hover:opacity-80 transition-all ${
          isDisqualified
            ? "bg-gray-500 border-gray-400 opacity-50 cursor-not-allowed"
            : isHighlighted
              ? "bg-yellow-400 border-yellow-300 text-black animate-pulse"
              : "bg-[#0F2D69] border-[#0F2D69]"
        } ${className}`}
        onClick={isDisqualified ? undefined : onClick}
        disabled={isDisqualified}
      >
        {number}
      </Button>
      {fouls > 0 && (
        <div
          className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
            isDisqualified ? "bg-red-600 text-white" : "bg-yellow-500 text-black"
          }`}
        >
          {fouls}
        </div>
      )}
      {isDisqualified && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-0.5 bg-red-600 rotate-45"></div>
          <div className="w-8 h-0.5 bg-red-600 -rotate-45 absolute"></div>
        </div>
      )}
    </div>
  )
}
