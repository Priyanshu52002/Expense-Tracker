import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white">
      <div className="text-center space-y-6 p-10 bg-white/20 rounded-lg shadow-lg backdrop-blur-md">
        <h1 className="text-5xl font-extrabold">Welcome</h1>
        <h2 className="text-4xl font-semibold">to</h2>
        <h2 className="text-xl font-semibold">SpendWise</h2>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-700 transition rounded-lg text-lg font-semibold shadow-md">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-3 bg-green-500 hover:bg-green-700 transition rounded-lg text-lg font-semibold shadow-md">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
