import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderLogin from "../components/header/HeaderLogin";
import Login from "./Login";
import Register from "./Register";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [messageSuccess, SetMessageSuccess] = useState(false)

  const displayMessageSuccess = () => {
    SetMessageSuccess(true)
  }

  const removeMessageSuccess = () => {
    SetMessageSuccess(false)
  }

  // Check the current path and set the initial state accordingly
  useEffect(() => {
    if (location.pathname === "/auth/register") {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }, [location.pathname]);

  const toggleAuth = () => {
    if (isRegister) {
      navigate("/auth/login"); // Navigate to the login route
    } else {
      navigate("/auth/register"); // Navigate to the register route
    }
    setIsRegister(!isRegister); // Toggle the form state
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center main-background pb-10">

      <HeaderLogin />
      {messageSuccess && 
      <div className="w-64 absolute right-0 top-20">   
        <Alert className="bg-green-50">
          <AlertTitle>Votre compte a été créé 👍</AlertTitle>
          <AlertDescription>
            Rendez-vous dans votre boite mail pour valider l'inscription
          </AlertDescription>
        </Alert>
      </div>}
      {isRegister ? (
        <Register toggleAuth={toggleAuth} displayMessageSuccess={displayMessageSuccess} />
      ) : (
        <Login toggleAuth={toggleAuth} removeMessageSuccess={removeMessageSuccess} />
      )}
    </div>
  );
};

export default Auth;
