import { useParams } from "react-router-dom";
function Docsleftnavbar(){
    const { topic } = useParams();
    return(
        <>
           <div className="h-full w-[18%] border-r border-white/5">
                <div className="flex flex-col gap-4 p-4">
                    <h1 className="text-white text-lg font-semibold capitalize">
                        {topic}
                    </h1>
                    <nav>
                        <ul className="flex flex-col gap-2">
                            <li className="text-white/80 hover:text-white cursor-pointer">
                                Introduction
                            </li>
                            <li className="text-white/80 hover:text-white cursor-pointer">
                                Time Complexity
                            </li>
                            <li className="text-white/80 hover:text-white cursor-pointer">
                                Implementation
                            </li>
                            <li className="text-white/80 hover:text-white cursor-pointer">
                                Patterns
                            </li>
                        </ul>
                    </nav>
                </div>
           </div>
        </>
    )
}
export default Docsleftnavbar;