"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload, School } from "lucide-react"

const schoolSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  contact: z.string().regex(/^\d{10}$/, "Contact must be a 10-digit number"),
  email_id: z.string().email("Please enter a valid email address"),
  image: z.any().optional(),
})

type SchoolFormData = z.infer<typeof schoolSchema>

export default function AddSchoolPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue("image", file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call - In real implementation, this would save to MySQL
      console.log("School data:", data)

      // Simulate saving to localStorage for demo purposes
      const existingSchools = JSON.parse(localStorage.getItem("schools") || "[]")
      const newSchool = {
        id: Date.now(),
        ...data,
        image: imagePreview || "/traditional-schoolhouse.png",
      }
      existingSchools.push(newSchool)
      localStorage.setItem("schools", JSON.stringify(existingSchools))

      toast({
        title: "Success!",
        description: "School has been added successfully.",
      })

      reset()
      setImagePreview(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add school. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center mb-2">
            <School className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-foreground">Add New School</h1>
          </div>
          <p className="text-muted-foreground">Fill in the details to register a new school in the system.</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>School Information</CardTitle>
            <CardDescription>Please provide accurate information for the school registration.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">School Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter school name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="Enter city"
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  {...register("address")}
                  placeholder="Enter complete address"
                  className={errors.address ? "border-destructive" : ""}
                  rows={3}
                />
                {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    {...register("state")}
                    placeholder="Enter state"
                    className={errors.state ? "border-destructive" : ""}
                  />
                  {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number *</Label>
                  <Input
                    id="contact"
                    {...register("contact")}
                    placeholder="Enter 10-digit contact number"
                    className={errors.contact ? "border-destructive" : ""}
                  />
                  {errors.contact && <p className="text-sm text-destructive">{errors.contact.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email_id">Email Address *</Label>
                <Input
                  id="email_id"
                  type="email"
                  {...register("email_id")}
                  placeholder="Enter email address"
                  className={errors.email_id ? "border-destructive" : ""}
                />
                {errors.email_id && <p className="text-sm text-destructive">{errors.email_id.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">School Image</Label>
                <div className="flex items-center space-x-4">
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="School preview"
                      className="w-full max-w-xs h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Adding School..." : "Add School"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset()
                    setImagePreview(null)
                  }}
                  className="flex-1"
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
