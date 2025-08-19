
"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Adresse email invalide."),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères."),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    setIsLoading(true);
    try {
      let userCredential: UserCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Connexion réussie!", description: "Bienvenue à nouveau." });
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Inscription réussie!", description: "Votre compte a été créé." });
      }
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'authentification",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <Card className="w-full max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isLogin ? "Connexion" : "Inscription"}
          </CardTitle>
          <CardDescription className="text-white/80">
            {isLogin
              ? "Accédez à votre espace personnel."
              : "Créez un compte pour commencer."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="fadma@exemple.com"
                {...register("email")}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-accent text-primary-foreground hover:bg-accent/90" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {isLogin ? "Se connecter" : "S'inscrire"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-white/80 hover:text-white"
          >
            {isLogin
              ? "Pas encore de compte? S'inscrire"
              : "Déjà un compte? Se connecter"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
