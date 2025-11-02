import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
 
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const GoogleButton = () => {
  const navigate= useNavigate()
  const { handleGoogleSignIn, setUser, setLoading } = useContext(AuthContext);
  const handleGoogle = () => {
    handleGoogleSignIn()
      .then((result) => {
        const user = result.user;
        if (user) {
          const newUser = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          };

          fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              navigate("/"); // redirect to home after registration
              console.log(data);
                  
            })
            .catch((err) => toast.error(err.message));
      
          
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
