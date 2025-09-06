"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, School, MapPin, Plus } from "lucide-react"

interface SchoolData {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  image: string
}

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<SchoolData[]>([])
  const [filteredSchools, setFilteredSchools] = useState<SchoolData[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Load schools from localStorage (in real app, this would be from MySQL)
    const storedSchools = JSON.parse(localStorage.getItem("schools") || "[]")

    // Add some demo data if no schools exist
    if (storedSchools.length === 0) {
      const demoSchools: SchoolData[] = [
        {
          id: 1,
          name: "Greenwood High School",
          address: "123 Education Street",
          city: "Mumbai",
          state: "Maharashtra",
          contact: "9876543210",
          email_id: "info@greenwood.edu",
          image: "/modern-school-building.png",
        },
        {
          id: 2,
          name: "St. Mary's Convent School",
          address: "456 Learning Avenue",
          city: "Delhi",
          state: "Delhi",
          contact: "9876543211",
          email_id: "contact@stmarys.edu",
          image: "/traditional-school-building.jpg",
        },
        {
          id: 3,
          name: "Sunrise International School",
          address: "789 Knowledge Road",
          city: "Bangalore",
          state: "Karnataka",
          contact: "9876543212",
          email_id: "admin@sunrise.edu",
          image: "/international-school-campus.jpg",
        },
      ]
      setSchools(demoSchools)
      setFilteredSchools(demoSchools)
    } else {
      setSchools(storedSchools)
      setFilteredSchools(storedSchools)
    }
  }, [])

  useEffect(() => {
    const filtered = schools.filter(
      (school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredSchools(filtered)
  }, [searchTerm, schools])

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

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <School className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">All Schools</h1>
                <p className="text-muted-foreground">Browse and explore registered schools</p>
              </div>
            </div>
            <Link href="/add-school">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add School
              </Button>
            </Link>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schools by name, city, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredSchools.length === 0 ? (
          <div className="text-center py-12">
            <School className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm ? "No schools found" : "No schools registered yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm
                ? "Try adjusting your search terms to find schools."
                : "Get started by adding your first school to the system."}
            </p>
            {!searchTerm && (
              <Link href="/add-school">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First School
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredSchools.length} of {schools.length} schools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSchools.map((school) => (
                <Card key={school.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={school.image || "/placeholder.svg"}
                      alt={school.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">{school.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="line-clamp-2">{school.address}</p>
                          <p className="font-medium text-foreground">
                            {school.city}, {school.state}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
