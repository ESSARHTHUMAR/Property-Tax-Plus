import React from "react";

export default function UnderDevelopment() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] w-full text-center px-4">
      <div className="relative mb-6">
        <div className="w-40 h-40 bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-600 rounded-full animate-pulse blur-xl opacity-70 absolute -top-4 -left-4"></div>
        <div className="w-40 h-40 bg-[#2C4E6C] text-white flex items-center justify-center text-xl font-semibold rounded-full shadow-lg relative z-10">
          🚧
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 animate-bounce">
        Page Under Development
      </h1>
      <p className="text-gray-600 text-sm sm:text-base max-w-md">
        We&apos;re working hard to bring this page to life. Hang tight, it&rsquo;ll be ready soon!
      </p>
    </div>
  );
}
