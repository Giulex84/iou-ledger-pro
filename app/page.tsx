"use client"

import { useState } from "react"
import { useIOUs } from "@/components/iou-context"
import IOUCard from "@/components/iou-card"
import type { IOUCurrency } from "@/lib/types"

type CurrencyFilter = IOUCurrency | "ALL"

export default function Home() {
  const { ious } = useIOUs()

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL")
  const [currencyFilter, setCurrencyFilter] = useState<CurrencyFilter>("ALL")

  const active = ious.filter((i) => !i.paid)

  const categories = Array.from(new Set(active.map((i) => i.category))).filter(Boolean).sort()

  const filteredActive = active.filter((iou) => {
    const matchesSearch =
      !search.trim() ||
      iou.name.toLowerCase().includes(search.trim().toLowerCase())

    const matchesCategory =
      categoryFilter === "ALL" || iou.category === categoryFilter

    const matchesCurrency =
      currencyFilter === "ALL" || iou.currency === currencyFilter

    return matchesSearch && matchesCategory && matchesCurrency
  })

  const owedToMe = filteredActive
    .filter((i) => i.type === "owed")
    .reduce((sum, i) => sum + i.amount, 0)

  const iOwe = filteredActive
    .filter((i) => i.type === "owing")
    .reduce((sum, i) => sum + i.amount, 0)

  const totalCount = filteredActive.length

  const currencySymbol = (cur: CurrencyFilter) => {
    if (cur === "ALL") return "€/$/π"
    switch (cur) {
      case "USD":
        return "$"
      case "PI":
        return "π"
      case "EUR":
      default:
        return "€"
    }
  }

  return (
    <div className="space-y-6">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">IOU Ledger Pro</h1>
        <p className="mt-1 text-sm text-gray-500">Track who owes what, across currencies.</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="sr-only" htmlFor="search">
              Search IOUs
            </label>
            <div className="relative">
              <input
                id="search"
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent"
                placeholder="Search by name or note"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              type="button"
              className={`px-3 py-1.5 rounded-full border ${
                categoryFilter === "ALL"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600"
              }`}
              onClick={() => setCategoryFilter("ALL")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`px-3 py-1.5 rounded-full border ${
                  categoryFilter === cat
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600"
                }`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex rounded-2xl bg-gray-50 p-1 text-[11px] font-semibold">
            {(["ALL", "EUR", "USD", "PI"] as CurrencyFilter[]).map((cur) => (
              <button
                key={cur}
                type="button"
                className={`px-2.5 py-1 rounded-xl transition-all ${
                  currencyFilter === cur
                    ? "bg-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setCurrencyFilter(cur)}
              >
                {currencySymbol(cur)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-2xl border border-emerald-100 shadow-sm">
          <p className="text-xs font-medium text-emerald-700 mb-1">Owed to Me</p>
          <p className="text-2xl font-bold text-emerald-900">
            {currencySymbol(currencyFilter)} {owedToMe.toFixed(2)}
          </p>
          <p className="text-[11px] text-emerald-600 mt-1">
            {filteredActive.filter((i) => i.type === "owed").length} active
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-2xl border border-amber-100 shadow-sm">
          <p className="text-xs font-medium text-amber-700 mb-1">I Owe</p>
          <p className="text-2xl font-bold text-amber-900">
            {currencySymbol(currencyFilter)} {iOwe.toFixed(2)}
          </p>
          <p className="text-[11px] text-amber-600 mt-1">
            {filteredActive.filter((i) => i.type === "owing").length} active
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Active IOUs</h2>
          <p className="text-xs text-gray-500">{totalCount} items</p>
        </div>
        <div className="space-y-3 pb-4">
          {filteredActive.map((iou) => (
            <IOUCard key={iou.id} iou={iou} />
          ))}
          {filteredActive.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <p className="text-sm font-medium">No active IOUs</p>
              <p className="text-xs mt-1">Try changing filters or add a new IOU.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
