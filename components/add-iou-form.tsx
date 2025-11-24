"use client"

import type React from "react"

import { useState } from "react"
import { useIOUs } from "@/components/iou-context"
import type { IOUCurrency, IOUType } from "@/lib/types"

const CATEGORIES = ["Prestito", "Cena", "Spesa", "Regalo", "Altro"] as const

const CURRENCY_LABELS: Record<IOUCurrency, string> = {
  EUR: "€ Euro",
  USD: "$ Dollar",
  PI: "π Pi",
}

export default function AddIOUForm() {
  const { addIOU } = useIOUs()
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<IOUType>("owed")
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Prestito")
  const [currency, setCurrency] = useState<IOUCurrency>("EUR")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !amount) return

    await addIOU({
      name,
      amount: Number(amount),
      date: new Date().toISOString(),
      paid: false,
      type,
      category,
      currency,
    })

    setName("")
    setAmount("")
    setType("owed")
    setCategory("Prestito")
    setCurrency("EUR")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex gap-2 rounded-2xl bg-gray-50 p-1">
        <button
          type="button"
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            type === "owed"
              ? "bg-emerald-500 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setType("owed")}
        >
          They owe <span className="font-black">me</span>
        </button>
        <button
          type="button"
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            type === "owing"
              ? "bg-amber-500 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setType("owing")}
        >
          I owe <span className="font-black">them</span>
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          className="border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-500/60 rounded-xl px-3 py-2.5 w-full text-sm shadow-sm bg-white"
          placeholder="Person or contact name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-[2fr,1.4fr] gap-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Amount</label>
          <input
            className="border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-500/60 rounded-xl px-3 py-2.5 w-full text-sm shadow-sm bg-white"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Currency</label>
          <div className="flex rounded-xl bg-gray-50 p-1 text-xs font-semibold">
            {(["EUR", "USD", "PI"] as IOUCurrency[]).map((cur) => (
              <button
                key={cur}
                type="button"
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  currency === cur
                    ? "bg-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setCurrency(cur)}
              >
                {CURRENCY_LABELS[cur].split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                category === cat
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md shadow-blue-500/20 transition-all">
        Add IOU
      </button>
    </form>
  )
}
