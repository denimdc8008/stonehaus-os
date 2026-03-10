import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, FileText, CheckSquare, TrendingUp, DollarSign } from 'lucide-react'

async function getDashboardStats(userId: string) {
  const [deals, properties, contacts, tasks] = await Promise.all([
    db.deal.count(),
    db.property.count(),
    db.contact.count(),
    db.task.count({ where: { status: { not: 'COMPLETED' } } }),
  ])
  return { deals, properties, contacts, tasks }
}

export default async function DashboardPage() {
  const session = await auth()
  const stats = await getDashboardStats(session!.user.id)

  const statCards = [
    {
      title: 'Active Deals',
      value: stats.deals,
      icon: TrendingUp,
      description: 'Total pipeline deals',
      color: 'text-blue-500',
    },
    {
      title: 'Properties',
      value: stats.properties,
      icon: Building2,
      description: 'Tracked properties',
      color: 'text-green-500',
    },
    {
      title: 'Contacts',
      value: stats.contacts,
      icon: Users,
      description: 'Investors, brokers & owners',
      color: 'text-purple-500',
    },
    {
      title: 'Open Tasks',
      value: stats.tasks,
      icon: CheckSquare,
      description: 'Pending action items',
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name}. Here&apos;s your operations overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
