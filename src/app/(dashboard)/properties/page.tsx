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
import { Plus, MapPin } from 'lucide-react'
import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  UNDER_CONTRACT: 'bg-yellow-100 text-yellow-800',
  CLOSED: 'bg-blue-100 text-blue-800',
  OFF_MARKET: 'bg-slate-100 text-slate-800',
}

export default async function PropertiesPage() {
  const properties = await db.property.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 50,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Track land and development sites</p>
        </div>
        <Button asChild>
          <Link href="/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Acreage</TableHead>
              <TableHead>Asking Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No properties yet. Add your first property to get started.
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">
                    <Link href={`/properties/${property.id}`} className="hover:underline flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {property.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{property.address}</TableCell>
                  <TableCell>{property.propertyType ?? '—'}</TableCell>
                  <TableCell>
                    {property.acreage ? `${Number(property.acreage).toFixed(2)} ac` : '—'}
                  </TableCell>
                  <TableCell>
                    {property.askingPrice
                      ? `$${Number(property.askingPrice).toLocaleString()}`
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[property.status] ?? ''}>
                      {property.status.replace(/_/g, ' ')}
                    </Badge>
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
