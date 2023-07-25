import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen flex-col gap-4 px-2">
      <Navbar />
      <main className="custom-container grow space-y-4 ">{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
