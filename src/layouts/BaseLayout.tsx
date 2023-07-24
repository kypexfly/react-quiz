import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen h-full flex-col px-2">
      <Navbar />
      <main className="custom-container grow">{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
