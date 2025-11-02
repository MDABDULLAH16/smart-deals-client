 
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import GoogleButton from "../../components/Buttons/GoogleButton/GoogleButton";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser, setLoading, setUser } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const from = location?.state?.from?.pathname || '/'
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Email:", email, "Password:", password);
    // TODO: Add Firebase or backend login logic
    loginUser(email,password).then(result => {
      const user = result.user;
      if (user) {
        setUser(user);
        toast.success('Login Successful!');
        setLoading(false);
        navigate(from,{replace:true})
      }
}).catch(err=>toast.error(err.message))

  };

   

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 font-medium hover:underline">
            Register Now
          </Link>
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="text-right mb-6">
            <Link to="/forgot-password" className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="grow border-gray-300" />
        </div>

       <GoogleButton></GoogleButton>
      </div>
    </div>
  );
};

export default Login;
