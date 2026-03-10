import { db } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const STAGE_COLORS: Record<string, string> = {
  PROSPECTING: 'bg-slate-100 text-slate-800',
  LETTER_OF_INTENT: 'bg-blue-100 text-blue-800',
  DUE_DILIGENCE: 'bg-yellow-100 text-yellow-800',
  UNDER_CONTRACT: 'bg-orange-100 text-orange-800',
  CLOSED: 'bg-green-100 text-green-800',
  DEAD: 'bg-red-100 text-red-800',
}

export default async function DealsPage() {
  const deals = await db.deal.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      property: { select: { name: true, address: true } },
      assignedTo: { select: { name: true } },
    },
    take: 50,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals</h1>
          <p className="text-muted-foreground">Manage your acquisition pipeline</p>
        </div>
        <Button asChild>
          <Link href="/deals/new">
            <Plus className="mr-2 h-4 w-4" />
            New Deal
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deal Name</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Asking Price</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No deals yet. Create your first deal to get started.
                </TableCell>
              </TableRow>
            ) : (
              deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">
                    <Link href={`/deals/${deal.id}`} className="hover:underline">
                      {deal.name}
                    </Link>
                  </TableCell>
                  <TableCell>{deal.property?.name ?? '—'}</TableCell>
                  <TableCell>
                    <Badge className={STAGE_COLORS[deal.stage] ?? ''}>
                      {deal.stage.replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {deal.askingPrice
                      ? `$${Number(deal.askingPrice).toLocaleString()}`
                      : '—'}
                  </TableCell>
                  <TableCell>{deal.assignedTo?.name ?? '—'}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(deal.updatedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
