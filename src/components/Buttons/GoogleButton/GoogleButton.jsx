import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const GoogleButton = () => {
  const { handleGoogleSignIn, setUser, setLoading } = useContext(AuthContext);
  const handleGoogle = () => {
    handleGoogleSignIn()
      .then((result) => {
        const user = result.user;
        if (user) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Log In successful !",
            showConfirmButton: false,
            timer: 1500,
          });
            setUser(user);
            setLoading(false)
        }
      })
      .catch((err) => {
          toast.error(err.message),
              console.log(err.message);
      });
  };
  return (
    <button
      onClick={handleGoogle}
      className="w-full border border-gray-300 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition cursor-pointer"
    >
      <FcGoogle className="text-xl" />
      <span className="text-gray-700 font-medium">Sign In With Google</span>
    </button>
  );
};

export default GoogleButton;
