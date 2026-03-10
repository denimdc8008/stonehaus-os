import { db } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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

const TYPE_COLORS: Record<string, string> = {
  INVESTOR: 'bg-purple-100 text-purple-800',
  BROKER: 'bg-blue-100 text-blue-800',
  LANDOWNER: 'bg-green-100 text-green-800',
  ATTORNEY: 'bg-orange-100 text-orange-800',
  LENDER: 'bg-yellow-100 text-yellow-800',
  PARTNER: 'bg-pink-100 text-pink-800',
  VENDOR: 'bg-slate-100 text-slate-800',
  OTHER: 'bg-gray-100 text-gray-800',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default async function ContactsPage() {
  const contacts = await db.contact.findMany({
    orderBy: { lastName: 'asc' },
    take: 100,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">Investors, brokers, landowners & partners</p>
        </div>
        <Button asChild>
          <Link href="/contacts/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No contacts yet. Add your first contact to get started.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => {
                const fullName = `${contact.firstName} ${contact.lastName}`
                return (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <Link href={`/contacts/${contact.id}`} className="font-medium hover:underline">
                          {fullName}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={TYPE_COLORS[contact.type] ?? ''}>
                        {contact.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{contact.company ?? '—'}</TableCell>
                    <TableCell className="text-sm">{contact.email ?? '—'}</TableCell>
                    <TableCell className="text-sm">{contact.phone ?? '—'}</TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
