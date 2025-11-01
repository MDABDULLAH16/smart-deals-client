import { Link } from "react-router";
 import GoogleButton from "../../components/Buttons/GoogleButton/GoogleButton";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const Register = () => {
  const {createUser} = useContext(AuthContext)
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    console.log("Email:", email, "Password:", password);
    // TODO: Add Firebase or backend login logic
    createUser(email, password).then(result => {
      const user = result.user;
      if (user) {
        updateProfile(user, { displayName: name, photoURL: photoURL }).then(() => {
          toast.success('Register Successful!')
        }).catch(err=>toast.error(err.message))
      }
    }).catch(err=>toast.error(err.message))

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Register First !
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Don’t have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="photoURL">
              PhotoURL
            </label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              placeholder="Enter your PhotoURL"
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
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:underline"
            >
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

export default Register;
