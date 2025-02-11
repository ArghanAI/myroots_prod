"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
  Zap,
  LayoutDashboard,
  Bell,
  Users,
  Sparkles,
  Percent,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

const DecorativeShape = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-[999px] ${className}`}></div>
)

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <Card className="p-4 sm:p-6 rounded-xl backdrop-blur-sm border transform hover:scale-105 transition-transform">
    <h3 className="text-lg sm:text-xl font-semibold flex items-center text-accent-foreground mb-2 sm:mb-3">
      <Icon className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
      {title}
    </h3>
    <p className="text-sm sm:text-base text-accent-foreground/70">{description}</p>
  </Card>
)

const MetricCard = ({ icon: Icon, metric, description }: { icon: any; metric: string; description: string }) => (
  <div className="flex flex-col items-center text-center">
    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary mb-2" />
    <h3 className="text-lg sm:text-xl font-bold text-deepBlue mb-1">{metric}</h3>
    <p className="text-xs text-deepBlue/70">{description}</p>
  </div>
)

const TermsOfServiceDialog = ({ 
  open, 
  onOpenChange, 
  onAccept,
  termsAccepted 
}: { 
  open: boolean, 
  onOpenChange: (open: boolean) => void,
  onAccept: () => void,
  termsAccepted: boolean 
}) => {
  const [localAccepted, setLocalAccepted] = useState(false)

  const handleAccept = () => {
    onAccept()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-center">Terms of Service</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm sm:text-base overflow-y-auto max-h-[60vh] sm:max-h-[65vh] pr-2 sm:pr-6">
          <h3 className="font-semibold">1. Acceptance of Terms</h3>
          <p>By accessing or using Roots by Sproutify ("the Platform"), you agree to be bound by these Terms of Service, as well as any additional terms, conditions, and policies referenced herein or available by hyperlink. If you do not agree to all the terms and conditions of this agreement, you may not access or use the Platform.</p>

          <h3 className="font-semibold">2. Description of Services</h3>
          <p>Platform Services: Roots by Sproutify provides tools, content, and functionalities that may include (but are not limited to) communication tools (phone and email campaigns), analytics, payment facilitation, and other offerings.</p>
          <p>Modifications: We reserve the right to modify, suspend, or discontinue any part of the Platform or these Terms at any time, with or without notice to you. Your continued use of the Platform after such changes constitutes your acceptance of the revised Terms.</p>

          <h3 className="font-semibold">3. Eligibility</h3>
          <p>Legal Age: You must be at least the age of majority in your jurisdiction to use the Platform. By using the Platform, you represent and warrant that you have the legal capacity to enter into a binding contract.</p>
          <p>Compliance: You agree to comply with all applicable local, state, national, and international laws and regulations when using the Platform.</p>

          <h3 className="font-semibold">4. Account Registration</h3>
          <p>Account Creation: You may be required to create an account to access certain features of the Platform. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.</p>
          <p>Account Security: You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately at roots_support@sproutify.us of any unauthorized use of your account or any other breach of security.</p>
          <p>Account Responsibility: You are fully responsible for all activities that occur under your account, whether or not you authorize such activities.</p>

          <h3 className="font-semibold">5. Payment Processing and User-to-User Transactions</h3>
          <p>Third-Party Providers: Payment processing on the Platform may be facilitated by one or more third-party providers. By making or receiving payments through the Platform, you agree to abide by any terms of service or agreements required by these third-party providers.</p>
          <p>User-to-User Payments: The Platform may allow users to exchange funds among themselves. These transactions are strictly between the sending and receiving parties.</p>
          <p>No Liability: Roots by Sproutify is not a party to these transactions and is not responsible for any aspect of user-to-user payment disputes, including but not limited to mismanagement, non-payment, chargebacks, or any form of fraud.</p>
          <p>Assumption of Risk: You acknowledge that all risks associated with sending or receiving payments from other users lie solely with you. You agree to use your own independent judgment before making or accepting any payments and understand that you are doing so at your own risk.</p>
          <p>Billing and Fees: You authorize us (or our third-party payment processors) to charge your chosen payment method for any applicable fees owed to Roots by Sproutify. We are not responsible for any fees, charges, or surcharges assessed by your payment provider.</p>
          <p>Refunds: All sales and fees for services provided by Roots by Sproutify are subject to our Refund Policy (if any). If no Refund Policy is explicitly stated, all sales are final unless otherwise required by law.</p>

          <h3 className="font-semibold">6. Communications and Marketing</h3>
          <p>Phone and Email Campaigns: By providing your contact information, you consent to receive phone calls, text messages, and emails from us relating to Platform updates, marketing campaigns, or other business communications. You may opt out at any time by following the unsubscribe or opt-out instructions provided in each communication.</p>
          <p>Messaging Rates: Standard data and messaging rates may apply for phone or text communications. You are responsible for all fees charged by your telecommunications provider.</p>

          <h3 className="font-semibold">7. Data Collection and Use</h3>
          <p>Analytics and Product Development: We collect and use data generated through your use of the Platform for analytics, product development, and to offer additional products, services, or features at our discretion.</p>
          <p>Privacy: We respect your privacy. For more information about how we collect, use, and share personal data, please review our Privacy Policy. By using the Platform, you agree to our collection, use, and sharing of information as described in the Privacy Policy.</p>

          <h3 className="font-semibold">8. User Conduct</h3>
          <p>When using the Platform, you agree to:</p>
          <p>Lawful Use: Not violate any applicable law, regulation, or contractual obligation.</p>
          <p>Prohibited Activities: Refrain from engaging in harassment, bullying, spamming, or any activity that could interfere with or disrupt the Platform.</p>
          <p>User Content: You are solely responsible for any content you publish, post, or share on the Platform. By posting content, you represent and warrant that you have the necessary rights to share such content.</p>

          <h3 className="font-semibold">9. Intellectual Property</h3>
          <p>Ownership: All content on the Platform, including text, graphics, logos, and software, is owned by or licensed to Roots by Sproutify and is protected by intellectual property laws.</p>
          <p>License to Use: We grant you a non-exclusive, non-transferable, revocable license to use the Platform for personal or internal business use in accordance with these Terms.</p>
          <p>User Content License: By uploading or posting any content, you grant Roots by Sproutify a worldwide, royalty-free, non-exclusive license to reproduce, modify, display, and otherwise use your content for the purpose of providing the Platform's services.</p>

          <h3 className="font-semibold">10. Third-Party Links and Services</h3>
          <p>The Platform may contain links to or integrations with third-party websites, products, or services that are not owned or controlled by Roots by Sproutify. We do not endorse or assume any responsibility for these third-party websites, products, or services. Your use of any third-party services is at your own risk and subject to the third party's terms and policies.</p>

          <h3 className="font-semibold">11. Disclaimers</h3>
          <p>No Warranty: The Platform is provided on an "AS IS" and "AS AVAILABLE" basis. Roots by Sproutify expressly disclaims any and all warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
          <p>User-to-User Interactions: You understand and agree that any interactions or transactions you have with other users are solely between you and those users. We do not investigate, verify, or guarantee any user's identity or authority to make or receive payments.</p>
          <p>No Liability for Interactions: We are not liable for any action or inaction of any user, nor for any occurrences on or off the Platform related in any way to communications, transactions, or relationships initiated on the Platform.</p>
          <p>No Guarantee of Availability: We do not guarantee uninterrupted, secure, or error-free access to the Platform. We will not be liable for any disruptions, delays, or imperfections in the Platform.</p>

          <h3 className="font-semibold">12. Limitation of Liability</h3>
          <p>To the maximum extent permitted by law, in no event shall Roots by Sproutify or its affiliates, officers, employees, agents, or licensors be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for lost profits, data loss, goodwill, or other intangible losses resulting from:</p>
          <p>Your use of or inability to use the Platform;</p>
          <p>Any conduct or content of any third party on the Platform, including other users;</p>
          <p>Any content obtained from the Platform; and</p>
          <p>Unauthorized access, use, or alteration of your transmissions or content.</p>

          <h3 className="font-semibold">13. Indemnification</h3>
          <p>You agree to defend, indemnify, and hold harmless Roots by Sproutify, its affiliates, and their respective officers, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in any way connected with:</p>
          <p>Your access to or use of the Platform;</p>
          <p>Your violation of these Terms;</p>
          <p>Your violation of any third-party rights;</p>
          <p>Any transaction, exchange of funds, or other interaction between you and any other user.</p>

          <h3 className="font-semibold">14. Termination</h3>
          <p>Termination Rights: We reserve the right to suspend or terminate your account or access to the Platform at our sole discretion for any reason, including violation of these Terms.</p>
          <p>Effect of Termination: Upon termination, your right to use the Platform will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive.</p>

          <h3 className="font-semibold">15. Governing Law and Dispute Resolution</h3>
          <p>Governing Law: These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Roots by Sproutify is organized, without regard to its conflict of law provisions.</p>
          <p>Dispute Resolution: Any dispute arising from or relating to the subject matter of these Terms shall be finally settled by arbitration in accordance with the rules of the recognized arbitration association in our jurisdiction, and judgment upon the award rendered by the arbitrator(s) may be entered in any court having jurisdiction thereof.</p>
          <p>Class Action Waiver: You agree to resolve any disputes with us on an individual basis and not as part of any class or representative action.</p>

          <h3 className="font-semibold">16. General Provisions</h3>
          <p>Entire Agreement: These Terms, together with our Privacy Policy, constitute the entire agreement between you and Roots by Sproutify and govern your use of the Platform.</p>
          <p>Waiver and Severability: Any failure by us to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is deemed invalid by a court, the remaining provisions will remain in effect.</p>
          <p>Assignment: You may not assign or transfer these Terms or any rights or obligations herein without our prior written consent. We may assign these Terms at our sole discretion.</p>
          
          <p className="mt-6 font-medium">Contact Information</p>
          <p>If you have any questions about these Terms, please contact us at roots_support@sproutify.us.</p>
        </div>

        <div className="flex flex-col gap-4 mt-4 border-t pt-4">
          <div className="flex items-center justify-center p-4 bg-secondary/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <Switch
                id="terms-agreement"
                checked={localAccepted}
                onCheckedChange={setLocalAccepted}
                className="data-[state=checked]:bg-secondary"
              />
              <label 
                htmlFor="terms-agreement" 
                className="text-sm sm:text-base font-medium text-accent-foreground cursor-pointer hover:text-secondary"
              >
                I have read and agree to the Terms of Service
              </label>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAccept}
              className="flex-1 bg-secondary text-white hover:bg-secondary/90"
              disabled={!localAccepted}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const LoginDialog = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login - in a real app, you would validate credentials
    setTimeout(() => {
      // Store auth state
      localStorage.setItem("isAuthenticated", "true")
      // Redirect to dashboard
      router.push("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl border border-primary">
      <div className="text-center mb-4 sm:mb-6 mt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-accent-foreground">Welcome to ROOTS</h2>
        <p className="text-xs sm:text-sm text-accent-foreground/70 mt-2">
          Join our community of leaders making an impact.
        </p>
      </div>
      <div className="flex justify-center mb-4">
        <Image
          src="/roots-logo.png"
          alt="ROOTS Logo"
          width={48}
          height={48}
          className="w-12 h-12 sm:w-16 sm:h-16"
        />
      </div>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-primary/10">
          <TabsTrigger value="login" className="data-[state=active]:bg-secondary data-[state=active]:text-white">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="data-[state=active]:bg-secondary data-[state=active]:text-white">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="px-4 sm:px-6 pb-4 sm:pb-6">
          <form className="space-y-3 sm:space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="email" className="text-xs sm:text-sm font-medium text-accent-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-9 sm:pl-10 border-primary focus:ring-secondary text-sm"
                />
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="password" className="text-xs sm:text-sm font-medium text-accent-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-9 sm:pl-10 border-primary focus:ring-secondary text-sm"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 rounded-full text-sm"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="signup" className="px-4 sm:px-6 pb-4 sm:pb-6">
          <form className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="firstName" className="text-xs sm:text-sm font-medium text-accent-foreground">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className="pl-9 sm:pl-10 border-primary focus:ring-secondary text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="lastName" className="text-xs sm:text-sm font-medium text-accent-foreground">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className="pl-9 sm:pl-10 border-primary focus:ring-secondary text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="signupEmail" className="text-xs sm:text-sm font-medium text-accent-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
                <Input
                  id="signupEmail"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-9 sm:pl-10 border-primary focus:ring-secondary text-sm"
                />
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="phoneNumber" className="text-xs sm:text-sm font-medium text-accent-foreground">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-9 sm:pl-10 border-primary focus:ring-secondary text-sm"
                />
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="signupPassword" className="text-xs sm:text-sm font-medium text-accent-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
                <Input
                  id="signupPassword"
                  type="password"
                  placeholder="Create a password"
                  className="pl-9 sm:pl-10 border-primary focus:ring-secondary text-sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTermsDialogOpen(true);
                  } else {
                    setTermsAccepted(false);
                  }
                }}
                className="data-[state=checked]:bg-secondary"
              />
              <label 
                htmlFor="terms" 
                className="text-xs sm:text-sm text-accent-foreground cursor-pointer hover:text-secondary"
                onClick={() => setTermsDialogOpen(true)}
              >
                I agree to the Terms of Service
              </label>
            </div>
            <TermsOfServiceDialog 
              open={termsDialogOpen}
              onOpenChange={setTermsDialogOpen}
              onAccept={() => setTermsAccepted(true)}
              termsAccepted={termsAccepted}
            />
            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full"
              disabled={!termsAccepted}
            >
              Create Account
            </Button>
          </form>
        </TabsContent>
      </Tabs>
      <div className="mt-3 sm:mt-4 text-center pb-4">
        <a href="#" className="text-xs sm:text-sm text-secondary hover:underline">
          Forgot Password?
        </a>
      </div>
    </Card>
  )
}

export function LandingPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="min-h-screen roots-background relative px-6 sm:px-8 py-6 sm:py-8 overflow-hidden flex flex-col">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-40 right-20 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Header with branding and auth */}
      <div className="relative z-10 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/roots-logo.png"
            alt="ROOTS Logo"
            width={48}
            height={48}
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-accent-foreground">ROOTS</h1>
            <p className="text-xs sm:text-sm text-accent-foreground/70">
              Rooted in Tradition. Built for Impact
            </p>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 ml-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-accent-foreground text-sm">
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>{/* Empty DialogHeader */}</DialogHeader>
              <LoginDialog />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-secondary hover:bg-secondary/90 text-white text-sm">Register</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>{/* Empty DialogHeader */}</DialogHeader>
              <LoginDialog />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow relative z-10">
        {/* Main hero section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-accent-foreground leading-tight">
                  Rooted in <span className="text-secondary">Tradition</span>, Built for the{" "}
                  <span className="text-primary">Future</span> – We <span className="text-secondary">Simplify</span> the
                  Work, You Make the <span className="text-primary">Impact</span>.
                </h2>
                <p className="text-lg sm:text-xl text-accent-foreground/80">
                  Discover a new way to lead and connect with your community.
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6 sm:px-8 h-10 sm:h-12 text-sm sm:text-lg"
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>{/* Empty DialogHeader */}</DialogHeader>
                    <LoginDialog />
                  </DialogContent>
                </Dialog>
                {/* Stats cards below Get Started button */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-primary/20 transform hover:scale-105 transition-transform">
                    <MetricCard icon={Users} metric="10x" description="Increased Engagement" />
                  </div>
                  <div className="bg-secondary/10 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-secondary/20 transform hover:scale-105 transition-transform">
                    <MetricCard icon={Percent} metric="95%" description="Time Saved" />
                  </div>
                  <div className="bg-primary/10 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-primary/20 transform hover:scale-105 transition-transform">
                    <MetricCard icon={Star} metric="90%" description="Satisfaction" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="relative">
              <Image
                src="/hero-image.png"
                alt="Excited person using ROOTS mobile app"
                width={500}
                height={500}
                className="relative z-10 mx-auto w-full max-w-[85%] h-auto"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16 sm:py-24 mt-8 sm:mt-16 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-5xl text-accent-foreground">
              Why Choose <span className="text-secondary">ROOTS</span>?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-accent-foreground/70 mx-auto max-w-[700px]">
              Discover how ROOTS empowers your community with innovative tools and seamless collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-gradient-to-br from-pink-50/40 to-rose-100/40 backdrop-blur-sm border-primary/20">
              <FeatureCard
                icon={Sparkles}
                title="Empowering Communities"
                description="ROOTS enhances collaboration with tools for trust, transparency, and accountability."
              />
            </div>
            <div className="bg-gradient-to-br from-orange-50/40 to-amber-100/40 backdrop-blur-sm border-secondary/20">
              <FeatureCard
                icon={Shield}
                title="Secure and Transparent"
                description="Your community's data is protected with top-notch security and real-time updates."
              />
            </div>
            <div className="bg-gradient-to-br from-green-50/40 to-emerald-100/40 backdrop-blur-sm border-primary/20">
              <FeatureCard
                icon={Zap}
                title="Streamlined Operations"
                description="Simplify management with intuitive tools that eliminate manual errors."
              />
            </div>
            <div className="bg-gradient-to-br from-blue-50/40 to-sky-100/40 backdrop-blur-sm border-secondary/20">
              <FeatureCard
                icon={LayoutDashboard}
                title="Effortless Organization"
                description="Stay on track with dashboards that make tasks, records, and reporting seamless."
              />
            </div>
            <div className="bg-gradient-to-br from-purple-50/40 to-violet-100/40 backdrop-blur-sm border-primary/20">
              <FeatureCard
                icon={Bell}
                title="Stay Connected"
                description="Automated reminders ensure deadlines, events, and updates are never missed."
              />
            </div>
            <div className="bg-gradient-to-br from-indigo-50/40 to-blue-100/40 backdrop-blur-sm border-primary/20">
              <FeatureCard
                icon={Users}
                title="Smarter Leadership"
                description="Innovative solutions to empower leaders and strengthen your community's future."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 sm:mt-16 py-3 sm:py-4 bg-accent-foreground text-white rounded-full mx-2 sm:mx-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p className="text-xs sm:text-sm">
              For Partnerships:{" "}
              <a href="mailto:roots_outreach@sproutify.us" className="text-secondary hover:underline">
                roots_outreach@sproutify.us
              </a>
            </p>
            <p className="text-xs sm:text-sm">
              For Support:{" "}
              <a href="mailto:roots_support@sproutify.us" className="text-secondary hover:underline">
                roots_support@sproutify.us
              </a>
            </p>
          </div>
          <div className="flex space-x-3 sm:space-x-4">
            <a href="#" className="text-white hover:text-secondary">
              <Facebook size={16} className="sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-white hover:text-secondary">
              <Twitter size={16} className="sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-white hover:text-secondary">
              <Instagram size={16} className="sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-white hover:text-secondary">
              <Linkedin size={16} className="sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

