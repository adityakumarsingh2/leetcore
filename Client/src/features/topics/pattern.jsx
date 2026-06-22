import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MoveHorizontal,
  Search,
  Hash,
  Grid2X2,
  BarChart3,
  Plus,
  Layers3,
  Leaf,
  Loader2,
  AlertTriangle
} from "lucide-react";
import apiClient from "../../services/apiClient";

const iconMap = {
  "two-pointers": <MoveHorizontal size={40} />,
  "sliding-window": <Layers3 size={40} />,
  "prefix-sum": <Plus size={40} />,
  "binary-search": <Search size={40} />,
  "matrix": <Grid2X2 size={40} />,
  "sorting": <BarChart3 size={40} />,
  "kadanes-algorithm": <Leaf size={40} />,
  "hashing": <Hash size={40} />,
  "monotonic-stack": <Layers3 size={40} />
};

function Patterns({ topicName }) {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPatterns = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get(`/questions/patterns?topic=${encodeURIComponent(topicName)}`);
        if (isMounted) {
          if (response.data?.success) {
            setPatterns(response.data.patterns || []);
          } else {
            setError("Failed to load practice patterns");
          }
        }
      } catch (err) {
        console.error("Error fetching patterns:", err);
        if (isMounted) {
          setError(err.response?.data?.message || "Failed to connect to practice server");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (topicName) {
      fetchPatterns();
    }
    return () => {
      isMounted = false;
    };
  }, [topicName]);

  const getPatternPath = (patternSlug) => {
    const encodedTopic = encodeURIComponent(topicName || "");
    const encodedPattern = encodeURIComponent(patternSlug);
    return `/dashboard/dsa/Practice/${encodedTopic}/${encodedPattern}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-white/60 text-sm">Loading practice patterns...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-6 my-8 p-6 bg-red-950/20 border border-red-500/20 rounded-2xl flex flex-col items-center gap-4 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400" />
        <div>
          <h3 className="text-white font-bold text-lg">Error Loading Patterns</h3>
          <p className="text-red-400/80 text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg text-sm font-medium transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (patterns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-white/40 text-sm">No practice patterns available for {topicName}.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patterns.map((item, index) => {
          const pct = item.total > 0 ? Math.round((item.solvedCount / item.total) * 100) : 0;
          return (
            <Link
              key={index}
              to={getPatternPath(item.slug)}
              className="
                relative
                block
                bg-[#111113]/80
                
                border border-white/10
                
                rounded-2xl
                p-6
                h-[220px]
                cursor-pointer
                transition-all
                duration-300
                scale-100
                hover:scale-[1.02]
                group
              "
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 rounded-xl  flex items-center justify-center text-white  transition-all duration-300">
                  {iconMap[item.slug] || <Layers3 size={40} />}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40 group-hover:text-white/60">
                  {pct}% Done
                </span>
              </div>

              <h3 className="text-white text-lg font-bold  transition-colors duration-300 mt-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                {item.desc}
              </p>

              <div className="absolute bottom-6 left-6 flex gap-3">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[11px] font-medium">
                  {item.solvedCount} / {item.total} Solved
                </span>
              </div>

              {/* Progress Line Bar */}
              <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/5 overflow-hidden rounded-b-2xl">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Patterns;
