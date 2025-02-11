"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const fundRequestSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  category: z.string({ required_error: "Please select a category." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
})

type FundRequestValues = z.infer<typeof fundRequestSchema>

export function CreateFundRequest({ onSettingsChange }: { onSettingsChange: (hasChanges: boolean) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FundRequestValues>({
    resolver: zodResolver(fundRequestSchema),
  })

  const onSubmit = (data: FundRequestValues) => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(data)
      toast({
        title: "Fund request submitted",
        description: "Your fund request has been successfully submitted.",
      })
      setIsSubmitting(false)
      onSettingsChange(true)
      setIsOpen(false)
      reset()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Fund Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Fund Request</DialogTitle>
          <DialogDescription>Submit a new fund request for your community project or need.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input id="title" {...register("title")} placeholder="Enter fund request title" />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount ($)
            </label>
            <Input id="amount" type="number" {...register("amount")} placeholder="Enter amount" />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Select onValueChange={(value) => register("category").onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emergency">Emergency Fund</SelectItem>
                <SelectItem value="project">Community Project</SelectItem>
                <SelectItem value="event">Event Funding</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Provide details about your fund request"
              className="resize-none"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Fund Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

