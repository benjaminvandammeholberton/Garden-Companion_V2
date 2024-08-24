import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// shadcn ui
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RegisterProps {
  toggleAuth: () => void;
  displayMessageSuccess: () => void
}

const Register: React.FC<RegisterProps> = ({ toggleAuth, displayMessageSuccess }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    username: z.string().min(4, {
      message: "Votre nom d'utilisateur doit comporter au minimum 4 caractères",
    }),
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
    passwordConfirm: z
      .string()
      .refine((data) => data.password === data.passwordConfirm, {
        message: "Les mots de passe ne correspondent pas",
        path: ["passwordConfirm"],
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const submitRegisterForm = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const userData = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      const response = await axios.post(
        "http://localhost:8001/api/v1/users/register",
        userData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        form.reset()
        displayMessageSuccess()
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
        <CardTitle>Inscription</CardTitle>
      </CardHeader>
      <CardContent className="w-80">
        {isLoading && <span>Chargement</span>}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitRegisterForm)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utiliisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="Joy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">S'inscrire</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <a className="cursor-pointer" onClick={toggleAuth}>
          Déjà inscrit ?
        </a>
      </CardFooter>
    </Card>
  );
};

export default Register;
