import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { updateTokenInAxiosHeaders } from "../api/axios";
import HeaderLogin from "../components/header/HeaderLogin";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitRegisterForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = {
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
      };
      const response = await axios.post(
        "http://192.168.1.192:8001/api/v1/users/register",
        userData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen sm:h-screen flex flex-col gap-5 items-center justify-center main-background">
      <HeaderLogin />
      <div
        className=" 
              w-[370px] h-[450px]
              bg-white
              opacity-90
              rounded-3xl
              flex flex-col
              justify-between
              items-center
              p-3
              mt-28
              mb-10
              "
      >
        <h1 className="text-3xl">Inscription</h1>
        {isLoading && <span>Chargement</span>}
        <form onSubmit={submitRegisterForm} className="flex flex-col gap-4">
          <div className="flex flex-col items-center">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              className="border"
              type="text"
              id="username"
              name="username"
              value={registerForm.username}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="email">Email</label>
            <input
              className="border"
              type="email"
              id="email"
              name="email"
              value={registerForm.email}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="password">Mot de passe</label>
            <input
              className="border"
              name="password"
              type="password"
              id="password"
              value={registerForm.password}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="confirm-password">Confirmer mot de passe</label>
            <input
              className="border"
              name="confirmPassword"
              type="password"
              id="confirm-password"
              value={registerForm.confirmPassword}
              onChange={handleInput}
            />
          </div>
          {/* <br />
          <div className="flex flex-col items-center gap-1 relative">
            <label htmlFor="country">Pays</label>
            <input
              className="border"
              name="country"
              type="text"
              id="country"
              value={registerForm.country}
              onChange={handleInput}
            />
            <div
              className="
              choices-list 
              flex 
              flex-col 
              gap-1 
              border
              rounded-xl
              px-2
              h-44 
              z-50
              absolute 
              bg-white 
              w-64
              top-16 
              hidden
            "
            ></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="post-code">Code postal</label>
            <input
              className="border"
              name="post-code"
              type="text"
              id="post-code"
              value={registerForm.postCode}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col items-center gap-1 relative">
            <label htmlFor="city">Ville</label>
            <input
              className="border"
              name="city"
              type="text"
              id="city"
              value={registerForm.city}
              onChange={handleInput}
            />
            <div
              className="
              choices-list 
              flex 
              flex-col 
              gap-1 
              border
              rounded-xl
              px-2
              h-44 
              z-50
              absolute 
              bg-white 
              w-64
              top-16 
              hidden
            "
            ></div>
          </div> */}
          <button className="border p-2 rounded-3xl mt-2" type="submit">
            Créer un compte
          </button>
        </form>
        <div className="font-thin flex flex-col text-center">
          <a href="/login">Déjà inscrit ?</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
