"use client"

import type React from "react"

import { useState } from "react"

interface CreateGroupModalProps {
  onClose: () => void
  onCreateGroup: (groupName: string) => void
}

export default function CreateGroupModal({ onClose, onCreateGroup }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (groupName.trim()) {
      onCreateGroup(groupName.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          aria-label="Закрыть"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-8">Новая группа</h2>

        <div className="bg-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-center mb-8">Создание группы</h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                placeholder="Название группы*"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2"
                required
              />
            </div>

            <button type="submit" className="primary-button w-full">
              Создать группу
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
