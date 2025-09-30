const { useState, useRef, useLayoutEffect } = React;

// --- COMPONENT: FeatureBox ---
const FeatureBox = ({ text }) => {
  return (
    <div className="bg-zinc-900 border border-teal-500/30 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.15)] w-52 h-20 flex items-center justify-center text-center px-4 transition-all duration-300 hover:border-teal-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">
      <span className="text-gray-200 tracking-wide">{text}</span>
    </div>
  );
};

// --- COMPONENT: CentralAIBox ---
const ConnectionPoint = () => (
  <div className="w-4 h-6 bg-zinc-950/70 border border-zinc-700/50 rounded-md" />
);

const CentralAIBox = () => {
  return (
    <div className="relative bg-zinc-900 border border-teal-500/40 rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.25)] w-48 h-48 flex items-center justify-center">
      <span className="text-gray-100 text-6xl font-bold tracking-wider">AI</span>

      {/* Connection Points - Left */}
      <div className="absolute left-0 -translate-x-1/2 top-1/4 -translate-y-1/2">
        <ConnectionPoint />
      </div>
      <div className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <ConnectionPoint />
      </div>
      <div className="absolute left-0 -translate-x-1/2 top-3/4 -translate-y-1/2">
        <ConnectionPoint />
      </div>

      {/* Connection Points - Right */}
      <div className="absolute right-0 translate-x-1/2 top-1/4 -translate-y-1/2">
        <ConnectionPoint />
      </div>
      <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2">
        <ConnectionPoint />
      </div>
      <div className="absolute right-0 translate-x-1/2 top-3/4 -translate-y-1/2">
        <ConnectionPoint />
      </div>
    </div>
  );
};

// --- COMPONENT: ConnectingLines ---
const AnimatedLine = ({ d }) => {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const dotLength = 8;

  useLayoutEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [d]);

  const animationStyle = {
    "--path-length": pathLength,
    "--dot-length": `${dotLength}px`,
    animationDuration: `${2.5 + Math.random() * 2}s`,
    animationDelay: `${Math.random() * 2}s`,
    strokeDasharray: `${dotLength} ${pathLength}`,
    visibility: pathLength > 0 ? "visible" : "hidden",
  };

  return (
    <g>
      <path d={d} stroke="#6B7280" strokeWidth="1" fill="none" />
      <path
        ref={pathRef}
        d={d}
        stroke="#2dd4bf"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        className="animated-path"
        style={animationStyle}
      />
    </g>
  );
};

const Dot = ({ cx, cy }) => (
  <circle cx={cx} cy={cy} r="3" fill="#6B7280" />
);

const ConnectingLines = ({ topY, bottomY }) => {
  const startTopY = 202;
  const startMidY = 250;
  const startBotY = 298;

  const leftTopPath = `M 472 ${startTopY} C 400 ${startTopY}, 380 ${topY}, 296 ${topY}`;
  const leftMidPath = `M 472 ${startMidY} H 296`;
  const leftBotPath = `M 472 ${startBotY} C 400 ${startBotY}, 380 ${bottomY}, 296 ${bottomY}`;

  const rightTopPath = `M 680 ${startTopY} C 752 ${startTopY}, 772 ${topY}, 856 ${topY}`;
  const rightMidPath = `M 680 ${startMidY} H 856`;
  const rightBotPath = `M 680 ${startBotY} C 752 ${startBotY}, 772 ${bottomY}, 856 ${bottomY}`;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1152 500"
      preserveAspectRatio="none"
      className="absolute inset-0"
    >
      <AnimatedLine d={leftTopPath} />
      <AnimatedLine d={leftMidPath} />
      <AnimatedLine d={leftBotPath} />

      <Dot cx={296} cy={topY} />
      <Dot cx={296} cy={startMidY} />
      <Dot cx={296} cy={bottomY} />

      <AnimatedLine d={rightTopPath} />
      <AnimatedLine d={rightMidPath} />
      <AnimatedLine d={rightBotPath} />

      <Dot cx={856} cy={topY} />
      <Dot cx={856} cy={startMidY} />
      <Dot cx={856} cy={bottomY} />
    </svg>
  );
};

// --- COMPONENT: ControlPanel ---
const ControlPanel = ({
  topLinesHeight,
  setTopLinesHeight,
  bottomLinesHeight,
  setBottomLinesHeight,
}) => {
  return (
    <div className="absolute bottom-4 right-4 bg-zinc-900/80 border border-teal-500/30 backdrop-blur-sm rounded-lg p-4 z-30 shadow-lg w-64">
      <h3 className="text-lg font-semibold text-teal-400 mb-4 text-center">
        Line Controls
      </h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="top-lines"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Top Lines Height ({topLinesHeight})
          </label>
          <input
            id="top-lines"
            type="range"
            min="0"
            max="150"
            value={topLinesHeight}
            onChange={(e) => setTopLinesHeight(Number(e.target.value))}
            className="w-full h-2 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label
            htmlFor="bottom-lines"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Bottom Lines Height ({bottomLinesHeight})
          </label>
          <input
            id="bottom-lines"
            type="range"
            min="350"
            max="500"
            value={bottomLinesHeight}
            onChange={(e) => setBottomLinesHeight(Number(e.target.value))}
            className="w-full h-2 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Header ---
const Header = () => (
  <header className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-4 py-8 z-20">
    <button className="px-6 py-2 rounded-full bg-[#2a6b63] text-gray-100 shadow-[0_0_20px_rgba(42,107,99,0.8)] transition-all hover:shadow-[0_0_30px_rgba(42,107,99,1)] hover:bg-[#317c72]">
      Get Started
    </button>
    <button className="px-6 py-2 rounded-full bg-black border border-gray-700 text-gray-300 transition-all hover:border-gray-500 hover:text-white">
      Book A Demo
    </button>
  </header>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  const [topLinesHeight, setTopLinesHeight] = useState(40);
  const [bottomLinesHeight, setBottomLinesHeight] = useState(460);

  const leftFeatures = ["Instant Insights", "Smart Visuals", "Ask Anything"];
  const rightFeatures = ["Predictive Power", "Plug & Play", "Always On"];

  return (
    <main className="bg-black min-h-screen w-full flex flex-col items-center justify-center p-8 text-gray-200 relative overflow-hidden">
      <Header />
      <div className="w-full max-w-6xl mx-auto h-[500px] mt-16">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-24 w-full h-full relative">
          <div className="flex flex-col justify-between h-full items-center z-10">
            {leftFeatures.map((feature, index) => (
              <FeatureBox key={index} text={feature} />
            ))}
          </div>

          <div className="flex justify-center items-center z-10">
            <CentralAIBox />
          </div>

          <div className="flex flex-col justify-between h-full items-center z-10">
            {rightFeatures.map((feature, index) => (
              <FeatureBox key={index} text={feature} />
            ))}
          </div>

          <ConnectingLines
            topY={topLinesHeight}
            bottomY={bottomLinesHeight}
          />
        </div>
      </div>
      <ControlPanel
        topLinesHeight={topLinesHeight}
        setTopLinesHeight={setTopLinesHeight}
        bottomLinesHeight={bottomLinesHeight}
        setBottomLinesHeight={setBottomLinesHeight}
      />
    </main>
  );
};

// --- RENDER THE APP ---
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
