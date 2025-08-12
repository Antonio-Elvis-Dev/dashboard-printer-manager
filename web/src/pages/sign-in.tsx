import z from "zod";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

import { Link, useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const signInZod = z.object({
  email: z.string().email(),
  password: z.string(),
});
type SignInForm = z.infer<typeof signInZod>;

export const SignIn = () => {
  const { signIn } = useAuth();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
      password: searchParams.get("password") ?? "",
    },
  });

  async function handleSignIn(data: SignInForm) {
    signIn(data);
  }

  return (
    <div className=" p-8">
       
        
     
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center ">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>
        <form
          action=""
          className="space-y-4 gap-4"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Sua senha</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  );
};
