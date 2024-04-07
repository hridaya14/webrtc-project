import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className=" w-64 bg-[#1C1F2E] h-screen max-sm:hidden">
            <ul className="text-white flex flex-col gap-12 items-start py-4 px-4 text-lg">
                <Link href= "/Home" className="p-2 flex items-center justify-center gap-4 ">
                    <img src = "/home.svg"></img>
                    <span><h2>Home</h2></span>
                </Link>
                <Link href= "/Upcoming" className="p-2 flex items-center justify-center gap-4 ">
                    <img src = "/upcoming.png"></img>
                    <span><h2>Upcoming</h2></span>
                </Link>
                <Link href= "/Create" className="p-2 flex items-center justify-center gap-4 ">
                    <img src = "/plus.png"></img>
                    <span><h2>Schedule Meeting</h2></span>
                </Link>
                <Link href= "/Create" className="p-2 flex items-center justify-center gap-4 ">
                    <img src = "/plus.png"></img>
                    <span><h2>Personal Room</h2></span>
                </Link>
            </ul>
        </aside>
    )
}

export default Sidebar;