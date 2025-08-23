'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, DollarSign, BarChart, TrendingUp } from "lucide-react"

const stats = [
    { title: "Active Users", value: "37", icon: Users },
    { title: "24h Volume", value: "$1,287,428", icon: DollarSign },
    { title: "Transactions/hr", value: "156", icon: BarChart },
    { title: "Uptime", value: "98.5%", icon: TrendingUp },
]

export function AdminStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
