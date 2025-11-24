"use client"

import type { IOU } from "@/lib/types"
import { useIOUs } from "@/components/iou-context"

function getCurrencySymbol(currency: IOU["currency"]) {
  switch (currency) {
    case "USD":
      return "$"
    case "PI":
      return "π"
    case "EUR":
    default:
      return "€"
  }
}

export default function IOUCard({ iou }: { iou: IOU }) {
  const { togglePaid } = useIOUs()

  const symbol = getCurrencySymbol(iou.currency)
  const directionLabel = iou.type === "owed" ? "owes me" : "I owe"

  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                iou.type === "owed" ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <p className="font-semibold text-base text-gray-900 truncate">{iou.name}</p>
          </div>

          <div className="flex items-baseline gap-2 ml-4">
            <p className="text-2xl font-bold text-gray-900">
              {symbol}
              {iou.amount.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">{directionLabel}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-4 mt-2 text-[11px]">
            <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-gray-600 border border-gray-100">
              {iou.category}
            </span>
            <span className="text-gray-400">
              {new Date(iou.date).toLocaleDateString()}
            </span>
            {iou.paid && (
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 border border-emerald-100">
                Paid
              </span>
            )}
          </div>
        </div>

        <button
          className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            iou.paid
              ? "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => togglePaid(iou.id, !iou.paid)}
        >
          {iou.paid ? "Mark Unpaid" : "Mark Paid"}
        </button>
      </div>
    </div>
  )
}
