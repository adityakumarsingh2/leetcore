function Heading() {
  return (
    <div className="w-full  text-white px-1 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row  justify-between gap-2">

        {/* Left Content */}
        <div className="flex-1">
  <h1 className="text-3xl md:text-4xl font-bold mb-6">
    LeetCore Sheet – Master DSA Through Patterns
  </h1>

  <div className="bg-[#111113]/88
              border border-white/20 rounded-3xl p-6 ">
    <p className="text-sm text-gray-300 mb-3">
      A structured learning system designed to help you master Data Structures
      and Algorithms through proven problem-solving patterns.
    </p>

    <p className="text-sm text-gray-300 mb-3">
      Instead of solving random questions, learn the underlying techniques used
      in coding interviews and competitive programming.
    </p>

    <p className="text-sm text-gray-300">
      Pick a pattern below and start solving{" "}
      <span className="text-orange-400 font-semibold">
        interview-ready
      </span>{" "}
      problems with confidence while building strong problem-solving intuition.
    </p>
  </div>

  <div className="mt-6 flex items-start gap-4">
    <div>
      <h2 className="text-xl font-bold">
        Choose a pattern to practice
      </h2>

      <p className="text-sm text-gray-400">
        Select any pattern to explore concepts, visualize solutions,
        understand the intuition behind algorithms, and solve curated
        problems from beginner to advanced level.
      </p>

      <p className="text-sm text-orange-400 mt-2">
        Follow the roadmap, track your progress, and become
        placement-ready one pattern at a time.
      </p>
    </div>
  </div>
</div>

        {/* Right Image */}
        <div className="w-full lg:w-[400px] flex justify-center">
          <img
            src="/brain.png"
            alt="DSA Illustration"
            className="w-full max-w-sm object-contain"
          />
        </div>

      </div>
    </div>
  );
}

export default Heading;