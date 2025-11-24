"use client"

import { Card } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

interface SummaryProps {
  totalOwedToMe: number
  totalIOwe: number
  netBalance: number
}

export function Summary({ totalOwedToMe, totalIOwe, netBalance }: SummaryProps) {
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-3">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-success/10 p-2">
            <ArrowUpRight className="h-4 w-4 text-success" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Owed to Me</p>
            <p className="text-xl font-bold text-success">π {totalOwedToMe.toFixed(2)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-destructive/10 p-2">
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">I Owe</p>
            <p className="text-xl font-bold text-destructive">π {totalIOwe.toFixed(2)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            <Minus className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Net Balance</p>
            <p
              className={`text-xl font-bold ${
                netBalance > 0 ? "text-success" : netBalance < 0 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              π {netBalance.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
