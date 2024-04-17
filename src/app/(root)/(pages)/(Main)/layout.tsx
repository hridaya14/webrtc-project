"use client"
import Navbar from "@/components/custom/Home/Navbar"
import Sidebar from "@/components/custom/Home/Sidebar"


const HomeLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
        <main className="relative">
            <Navbar/>
            <div className="flex lg:overflow-y-hidden h-[100vh] ">
                <Sidebar/>
                <section className=" flex min-h-screen flex-1 flex-col pt-24">
                  <div className="w-full lg:overflow-y-scroll">{children}</div>
                </section>
            </div>
        </main>
        
    )
  }

export default HomeLayout;