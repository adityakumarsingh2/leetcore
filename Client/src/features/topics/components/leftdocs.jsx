function Docsleftnavbar({ doc, topicName }){
    const sections = doc?.sections || [];

    return(
        <>
           <aside className="w-full border-b border-white/5 lg:h-full lg:w-[260px] lg:flex-shrink-0 lg:border-b-0 lg:border-r">
                <div className="flex flex-col gap-4 p-4">
                    <h1 className="text-white text-lg font-semibold capitalize">
                        {doc?.topic || topicName}
                    </h1>
                    <nav>
                        <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                            {sections.map((section) => (
                                <li key={section.id} className="shrink-0 lg:shrink">
                                    <a
                                        href={`#${section.id}`}
                                        className="
                                            block
                                            rounded-lg
                                            border
                                            border-white/8
                                            bg-white/5
                                            px-3
                                            py-2
                                            text-sm
                                            text-white/75
                                            transition
                                            hover:border-orange-300/30
                                            hover:text-white
                                        "
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
           </aside>
        </>
    )
}
export default Docsleftnavbar;
