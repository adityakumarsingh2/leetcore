import {
  MoveHorizontal,
  Search,
  Hash,
  Grid2X2,
  BarChart3,
  Plus,
  Layers3,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";

function Patterns({ topicName }) {
  const patterns = [
    {
      title: "Two Pointers",
      desc: "Use two indices moving toward each other or in the same direction.",
      icon: <MoveHorizontal size={40} />,
    },
    {
      title: "Sliding Window",
      desc: "Maintain a dynamic subarray.",
      icon: <Layers3 size={40} />,
    },
    {
      title: "Prefix Sum",
      desc: "Precompute cumulative sums.",
      icon: <Plus size={40} />,
    },
    {
      title: "Binary Search",
      desc: "Divide search space in half.",
      icon: <Search size={40} />,
    },
    {
      title: "Matrix",
      desc: "Navigate 2D arrays.",
      icon: <Grid2X2 size={40} />,
    },
    {
      title: "Sorting",
      desc: "Sort first, then solve Problems",
      icon: <BarChart3 size={40} />,
    },
    {
      title: "Kadane’s Algorithm",
      desc: "Maximum/minimum subarray optimization.",
      icon: <Leaf size={40} />,
    },
    {
      title: "Hashing",
      desc: "Use HashMap or HashSet.",
      icon: <Hash size={40} />,
    },
    {
      title: "Monotonic Stack",
      desc: "Maintain increasing/decreasing order.",
      icon: <Layers3 size={40} />,
    },
  ];

  const getPatternPath = (patternName) => {
    const encodedTopic = encodeURIComponent(topicName || "");
    const encodedPattern = encodeURIComponent(patternName);

    return `/dashboard/dsa/Practice/${encodedTopic}/${encodedPattern}`;
  };

  return (
    <div className="  px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {patterns.map((item, index) => (
          <Link
            key={index}
            to={getPatternPath(item.title)}
            className="
              relative
              block
              bg-[#111113]/88
              border border-white/20
              rounded-2xl
              p-6
              h-[210px]
              cursor-pointer
              transition-all
              duration-300
              scale-100
              hover:scale-[1.02]
            "
          >
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-orange-700 flex items-center justify-center text-white">
                {item.icon}
              </div>
            </div>

            <h3 className="text-white text-lg font-bold text-center">
              {item.title}
            </h3>

            <p className="text-gray-400 text-center text-xs mt-1">
              {item.desc}
            </p>

            <div className="absolute bottom-4 left-4 flex gap-3">
              <span className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 text-xs">
                15 Problems
              </span>

              
            </div>

            
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Patterns;
