"use client"

import AddIOUForm from "@/components/add-iou-form"

export default function AddPage() {
  return (
    <div className="space-y-5 pt-4 pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add IOU</h1>
        <p className="mt-1 text-sm text-gray-500">
          Record a new IOU with category and currency.
        </p>
      </div>
      <AddIOUForm />
    </div>
  )
}
