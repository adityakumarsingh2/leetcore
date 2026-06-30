function Motivation() {

    return (

        <div
            className="
                w-[94%]
                mx-auto
                rounded-3xl
                border
                h-44
                sm:h-128
                border-white/10
                bg-[#111114]
                text-white
                overflow-hidden
                relative
                backdrop-blur-2xl
                shadow-[0_16px_45px_rgba(0,0,0,0.18)]
                transition-transform
                duration-300
                hover:-translate-y-0.5
            "
        >


            <img
                src="./motivation.png" alt="Motivation" className="w-full h-full object-cover" />

        </div>

    );

}

export default Motivation;
