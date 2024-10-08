import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { updateTokenInAxiosHeaders } from "../api/axios";

// ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BarLoader from "react-spinners/BarLoader";

interface LoginProps {
  toggleAuth?: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleAuth }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    email: z.string().email({
      message: "Veuillez entrer un adresse email valide",
    }),
    password: z
      .string()
      .min(8, {
        message: "Votre mot de passe doit contenir 8 caractères minimum",
      })
      .regex(/[0-9]/, {
        message: "Votre mot de passe doit contenir au moins un chiffre",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message:
          "Votre mot de passe doit contenir au moins un caractère spécial",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitLoginForm = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8001/api/v1/auth/login",
        `grant_type=&username=${encodeURIComponent(
          values.email
        )}&password=${encodeURIComponent(values.password)}`,
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
        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        await delay(3000);
        navigate("/me/dashboard");
      }
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="relative px-10 mt-20">
      <CardHeader className="flex flex-row items-center gap-4">
        <CardTitle>Connexion</CardTitle>
        <BarLoader color="#33ffb3" loading={isLoading} width={75} />
      </CardHeader>
      <CardContent className="relative w-80">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitLoginForm)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mx-auto w-full" type="submit">
              Se connecter
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <a href="#">Mot de passe oublié</a>
        <a className="cursor-pointer" onClick={toggleAuth}>
          Pas encore inscrit ?
        </a>
      </CardFooter>
    </Card>
  );
};

export default Login;
