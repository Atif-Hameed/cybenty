const CircularProgress = ({ percentage, className, text="Complete", text1Style, text2Style }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
    return (
      <div className="relative flex items-center justify-center">
        <svg
          className={`w-40 h-40 transform rotate-[-90deg] ${className} `}
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          <circle
            className="text-[#D9D9D9]"
            strokeWidth="14"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className="text-purple"
            strokeWidth="14"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-xl text-gray ${text1Style}`}>{`${percentage}%`}</span>
          <span className={`text-sm text-gray ${text2Style} `}>{text}</span>
        </div>
      </div>
    );
  };
  
  export default CircularProgress;
  