import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ChatComingSoon() {
  return (
    <div className="min-h-screen roots-background p-4 md:pl-24 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Chat Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">We're working hard to bring you a seamless chat experience. Stay tuned!</p>
          <Link href="/dashboard">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

