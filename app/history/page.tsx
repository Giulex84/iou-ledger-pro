"use client"

import { useState } from "react"
import { useIOUs } from "@/components/iou-context"
import IOUCard from "@/components/iou-card"
import type { IOUCurrency } from "@/lib/types"

type CurrencyFilter = IOUCurrency | "ALL"

export default function HistoryPage() {
  const { ious } = useIOUs()

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL")
  const [currencyFilter, setCurrencyFilter] = useState<CurrencyFilter>("ALL")

  const categories = Array.from(new Set(ious.map((i) => i.category))).filter(Boolean).sort()

  const filtered = ious.filter((iou) => {
    const matchesSearch =
      !search.trim() ||
      iou.name.toLowerCase().includes(search.trim().toLowerCase())

    const matchesCategory =
      categoryFilter === "ALL" || iou.category === categoryFilter

    const matchesCurrency =
      currencyFilter === "ALL" || iou.currency === currencyFilter

    return matchesSearch && matchesCategory && matchesCurrency
  })

  const pending = filtered.filter((i) => !i.paid)
  const paid = filtered.filter((i) => i.paid)

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
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">History</h1>
        <p className="mt-1 text-sm text-gray-500">Browse all your IOUs, pending and paid.</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <label className="sr-only" htmlFor="search-history">
            Search IOUs
          </label>
          <input
            id="search-history"
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent"
            placeholder="Search by name or note"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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

      <div className="space-y-6 pb-6">
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Pending</h2>
            <p className="text-xs text-gray-500">{pending.length} items</p>
          </div>
          <div className="space-y-3">
            {pending.map((iou) => (
              <IOUCard key={iou.id} iou={iou} />
            ))}
            {pending.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                <p>No pending IOUs</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Paid</h2>
            <p className="text-xs text-gray-500">{paid.length} items</p>
          </div>
          <div className="space-y-3">
            {paid.map((iou) => (
              <IOUCard key={iou.id} iou={iou} />
            ))}
            {paid.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                <p>No paid IOUs</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
