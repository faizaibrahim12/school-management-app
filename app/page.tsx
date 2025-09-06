import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { School, Plus, Eye } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <School className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">School Management System</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Efficiently manage school information with our comprehensive system. Add new schools and view existing ones
            with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Plus className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">Add School</CardTitle>
              <CardDescription>
                Register a new school with complete information including contact details and images.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/add-school">
                <Button className="w-full" size="lg">
                  Add New School
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Eye className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">View Schools</CardTitle>
              <CardDescription>Browse and explore all registered schools in an organized grid layout.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/show-schools">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  View All Schools
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
