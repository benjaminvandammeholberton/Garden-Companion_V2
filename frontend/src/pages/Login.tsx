import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { updateTokenInAxiosHeaders } from "../api/axios";
import HeaderLogin from "../components/header/HeaderLogin";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.1.192:8001/api/v1/auth/login",
        `grant_type=&username=${encodeURIComponent(
          loginForm.email
        )}&password=${encodeURIComponent(loginForm.password)}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const token = response.data.access_token;
      if (response.status === 200 && token) {
        localStorage.setItem("JWTGP", token);
        updateTokenInAxiosHeaders(token);
        navigate("/me/dashboard");
      }
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center main-background ">
      <HeaderLogin />
      <div className=" 
              w-[370px] h-[350px]
              bg-white
              opacity-90
              rounded-3xl
              flex flex-col
              justify-between
              items-center
              p-3
              "
            >
      <h1 className="text-3xl">Login</h1>
      {isLoading && <span>Chargement</span>}
      <form onSubmit={submitLoginForm} className="flex flex-col gap-4">
        <div className="flex flex-col items-center">
            <label htmlFor="email">Email</label>
            <input
              className="border"
              type="email"
              id="name"
              name="email"
              value={loginForm.email}
              onChange={handleInput}
              />
          </div>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="password">Password</label>
            <input
              className="border"
              name="password"
              type="password"
              id="password"
              value={loginForm.password}
              onChange={handleInput}
              />
          </div>
          <button className="border p-2 rounded-3xl mt-2" type="submit">
            Se connecter
          </button>
        </form>
        <div className="font-thin flex flex-col text-center">
        <a href="#">Mot de passe oublié</a>
        <a href="/register">Pas encore inscrit ?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
