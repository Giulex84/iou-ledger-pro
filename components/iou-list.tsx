"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, TrendingDown, TrendingUp } from "lucide-react"
import type { IOU } from "@/lib/types"
import { formatDate } from "@/lib/utils/format-date"

interface IouListProps {
  ious: IOU[]
  onMarkAsPaid: (id: string) => void
  showDate?: boolean
}

export function IouList({ ious, onMarkAsPaid, showDate = false }: IouListProps) {
  if (ious.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No IOUs yet. Add your first IOU.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Active IOUs</h2>
      {ious.map((iou) => (
        <Card key={iou.id} className="flex items-center justify-between gap-4 p-4">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div
              className={`mt-0.5 rounded-full p-2 ${
                iou.type === "owed_to_me" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              }`}
            >
              {iou.type === "owed_to_me" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-foreground">π {iou.amount.toFixed(2)}</p>
                <span
                  className={`text-xs font-medium ${iou.type === "owed_to_me" ? "text-success" : "text-destructive"}`}
                >
                  {iou.type === "owed_to_me" ? "Owed to me" : "I owe"}
                </span>
              </div>
              <p className="text-sm text-foreground">{iou.description}</p>
              <p className="text-xs text-muted-foreground">{iou.person}</p>
              {showDate && <p className="mt-1 text-xs text-muted-foreground">{formatDate(iou.createdAt)}</p>}
            </div>
          </div>
          <Button onClick={() => onMarkAsPaid(iou.id)} size="sm" variant="outline" className="shrink-0">
            <Check className="mr-1 h-4 w-4" />
            Paid
          </Button>
        </Card>
      ))}
    </div>
  )
}
