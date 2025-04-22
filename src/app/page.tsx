import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-red-600 to-blue-800 text-white p-20 rounded-lg">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Property Tax Management Simplified
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            AI-powered solutions to optimize your property tax operations and
            reduce liabilities
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/appeals"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
