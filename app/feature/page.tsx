import { AppWindowIcon, ArchiveIcon, ChevronRight, ChevronRightIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

export default async function Departure() {

    return (
        <div className="w-full h-screen  flex justify-center items-center mt-4 space-y-8">
            <div className="flex flex-col space-y-8">
                <div className="flex space-x-8">
                    <Link href="/dashboard">
                        <div className="w-[400px] h-[300px] rounded-xl flex flex-col justify-center p-8 bg-slate-200 cursor-pointer border hover:scale-[1.05] hover:bg-slate-500">
                            <div className="flex space-x-2">
                                <ChevronRightIcon color="gray" />
                                <p className="text-slate-400 ml-2">Dashboard</p>
                            </div>
                            <AppWindowIcon  size={140} scale={1} />
                        </div>
                    </Link>
                    <Link href="/counter">
                        <div className="w-[400px] h-[300px] rounded-xl flex flex-col justify-center p-8 bg-slate-200 cursor-pointer border hover:scale-[1.05] hover:bg-slate-500">
                            <div className="flex space-x-2">
                                <ChevronRightIcon color="gray" />
                                <p className="text-slate-400 ml-2">Billetterie</p>
                            </div>
                            <ArchiveIcon  size={140} scale={1} />
                        </div>
                    </Link>
                </div>
                <div className="flex space-x-8">
                    <Link href="/">
                        <div className="w-[400px] h-[300px] rounded-xl flex flex-col justify-center p-8 bg-slate-200 cursor-pointer border hover:scale-[1.05] hover:bg-slate-500">
                            <div className="flex space-x-2">
                                <ChevronRightIcon color="gray" />
                                <p className="text-slate-400 ml-2">Accueil</p>
                            </div>
                            <HomeIcon  size={140} scale={1} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}