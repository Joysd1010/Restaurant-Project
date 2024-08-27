
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative">
        <div className="w-32 h-32 relative">
          <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-dna-spin circle1"></div>
          <div className="absolute w-4 h-4 bg-green-500 rounded-full animate-dna-spin circle2"></div>
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full animate-dna-spin circle3"></div>
          <div className="absolute w-4 h-4 bg-yellow-500 rounded-full animate-dna-spin circle4"></div>
          <div className="absolute w-4 h-4 bg-purple-500 rounded-full animate-dna-spin circle5"></div>
          <div className="absolute w-4 h-4 bg-pink-500 rounded-full animate-dna-spin circle6"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
