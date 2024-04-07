import Navbar from "@/Component/Home/Navbar"
import Sidebar from "@/Component/Home/Sidebar"

const HomeLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
        <main className=" h-screen ">
            <Navbar/>
            <section className="flex">
            <Sidebar/>
            {children}
            </section>
        </main>
        
    )
  }

export default HomeLayout;