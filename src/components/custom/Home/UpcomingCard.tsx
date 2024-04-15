import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"

function formatDate(inputDate: Date) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(inputDate);
}

export const UpcomingCard =  ({title , description , time , date , meetingCode} : {title : string , description : string , time : string , date : Date , meetingCode : string}) => {
    const inputDate = new Date(date);
    const formattedDate = formatDate(inputDate);
    const router = useRouter();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(meetingCode);
            alert("Meeting code copied to clipboard!");
        } catch (error) {
            console.error("Failed to copy meeting code:", error);
            alert("Failed to copy meeting code. Please try again.");
        }
    };


    return(
        <div className="upcoming-card p-4 max-lg:p-6 ">
            <div className="flex flex-col gap-4">
                <span> <Image src = "/calender.png" alt = "Calender" height={30} width={30}></Image> </span>
                <span className="text-2xl"><h2 className="text-white font-bold">{`${title} : ${description}`}</h2></span>
            </div>
            <div className="">
                <span className="text-[#ECF0FF] font-normal">
                    <h2>{`${formattedDate} - ${time}`}</h2>
                </span>
            </div>
            <div className="flex justify-end gap-2">
                <span className="bg-[#0E78F9] p-2 rounded-lg text-white"><button onClick={() => router.push(`/Call/${meetingCode}`)}>Start</button></span>
                <button onClick={handleCopy}>
                    <span className="flex bg-[#252A41] items-center rounded-lg p-2 gap-1 text-[#C9DDFF]">
                        <img src = "/copy.png" alt = "Copy" className=" h-4 w-4"></img>
                        <h2 className="text-white font-normal text-lg">Copy Invitation</h2>
                    </span>
                </button>
            </div>
            <div>

            </div>
        </div>
    )
};

