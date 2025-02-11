"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Loader2 } from "lucide-react"

const createCommunitySchema = z.object({
  name: z.string().min(3, "Community name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  monthlyDues: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Please enter a valid amount",
  }),
  maxMembers: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 1, {
    message: "Community must allow at least 2 members",
  }),
  emergencyFundPercentage: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
    message: "Percentage must be between 0 and 100",
  }),
  location: z.string().min(2, "Please enter a valid location"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

type CreateCommunityFormData = z.infer<typeof createCommunitySchema>

interface CreateCommunityFormProps {
  onClose: () => void
  onSubmit: (data: CreateCommunityFormData) => Promise<void>
}

export default function CreateCommunityForm({ onClose, onSubmit }: CreateCommunityFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreateCommunityFormData>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      name: "",
      description: "",
      monthlyDues: "0",
      maxMembers: "100",
      emergencyFundPercentage: "10",
      location: "",
      website: "",
    },
  })

  const handleSubmit = async (data: CreateCommunityFormData) => {
    setIsLoading(true)
    try {
      await onSubmit(data)
      onClose()
    } catch (error) {
      console.error("Failed to create community:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl bg-white/50 backdrop-blur-sm border-primary/20">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-deepBlue">Create New Community</CardTitle>
        <CardDescription className="text-muted-foreground">
          Create a new community and invite members to join
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter community name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Describe your community" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="monthlyDues"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Dues ($)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxMembers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Members</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyFundPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Fund (%)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" max="100" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-white"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Community"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

