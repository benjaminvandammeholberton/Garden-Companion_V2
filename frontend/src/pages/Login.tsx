import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { updateTokenInAxiosHeaders } from "../api/axios";

//shadcn ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
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

interface LoginProps {
  toggleAuth: () => void;
  removeMessageSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleAuth, removeMessageSuccess }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  removeMessageSuccess()

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
        navigate("/me/dashboard");
      }
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="px-10 mt-20">
      <CardHeader>
        <CardTitle>
          Connexion
        </CardTitle>
      </CardHeader>
      <CardContent className="w-80">
        {isLoading && <span>Chargement</span>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitLoginForm)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jardinierdu53@gmail.fr" {...field} />
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
            <Button type="submit">Se connecter</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <a href="#">Mot de passe oublié</a>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Ok</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <a className="cursor-pointer" onClick={toggleAuth}>
          Pas encore inscrit ?
        </a>
      </CardFooter>
    </Card>
  );
};

export default Login;
