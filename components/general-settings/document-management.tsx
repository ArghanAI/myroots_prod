import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Download, Trash2 } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  amount: number
  vendorName: string
  vendorPhone: string
  uploadDate: string
}

export function DocumentManagement({ onSettingsChange }: { onSettingsChange: (hasChanges: boolean) => void }) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "March 2024 Electricity Bill",
      type: "Bill",
      amount: 250.5,
      vendorName: "City Power Co.",
      vendorPhone: "555-0123",
      uploadDate: "2024-03-15",
    },
    {
      id: "2",
      name: "Community Bylaws 2024",
      type: "Bylaw",
      amount: 0,
      vendorName: "N/A",
      vendorPhone: "N/A",
      uploadDate: "2024-01-01",
    },
  ])

  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    type: "Bill",
    amount: 0,
    vendorName: "",
    vendorPhone: "",
  })

  const handleInputChange = (field: keyof Document, value: string | number) => {
    setNewDocument((prev) => ({ ...prev, [field]: value }))
    onSettingsChange(true)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewDocument((prev) => ({ ...prev, name: file.name }))
      onSettingsChange(true)
    }
  }

  const handleAddDocument = () => {
    if (newDocument.name && newDocument.vendorName) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: newDocument.name,
        type: newDocument.type || "Other",
        amount: newDocument.amount || 0,
        vendorName: newDocument.vendorName,
        vendorPhone: newDocument.vendorPhone || "N/A",
        uploadDate: new Date().toISOString().split("T")[0],
      }
      setDocuments((prev) => [...prev, newDoc])
      setNewDocument({ type: "Bill", amount: 0, vendorName: "", vendorPhone: "" })
      onSettingsChange(true)
    }
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
    onSettingsChange(true)
  }

  return (
    <div className="space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-secondary text-white hover:bg-secondary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Document
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Document</DialogTitle>
            <DialogDescription>Upload a new document and provide details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                File
              </Label>
              <Input id="file" type="file" className="col-span-3" onChange={handleFileUpload} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={newDocument.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bill">Bill</SelectItem>
                  <SelectItem value="Receipt">Receipt</SelectItem>
                  <SelectItem value="Bylaw">Bylaw</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={newDocument.amount}
                onChange={(e) => handleInputChange("amount", Number.parseFloat(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vendorName" className="text-right">
                Vendor Name
              </Label>
              <Input
                id="vendorName"
                value={newDocument.vendorName}
                onChange={(e) => handleInputChange("vendorName", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vendorPhone" className="text-right">
                Vendor Phone
              </Label>
              <Input
                id="vendorPhone"
                value={newDocument.vendorPhone}
                onChange={(e) => handleInputChange("vendorPhone", e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddDocument}>
              Add Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>${doc.amount.toFixed(2)}</TableCell>
              <TableCell>{doc.vendorName}</TableCell>
              <TableCell>{doc.uploadDate}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteDocument(doc.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

