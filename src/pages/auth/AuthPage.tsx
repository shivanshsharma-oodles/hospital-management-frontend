import React from "react";
import Hero from "@/components/pagesComp/landingComp/Hero";
import { useLocation } from "react-router-dom";
import LoginForm from "@/components/pagesComp/landingComp/auth/LoginForm";
import SignupForm from "@/components/pagesComp/landingComp/auth/SignUpForm";
import AdminLoginForm from "@/components/pagesComp/landingComp/auth/AdminLoginForm";

const AuthPage = ({variant = "default"} : {variant?: "default" | "admin"}) => {
  const location = useLocation();

  return (
    <Hero
      rightSlot={
        location.pathname === "/signup"
          ? <SignupForm />
          : variant==="admin"
            ? <AdminLoginForm />
            : <LoginForm />
      }
      variant={variant}
    />
  );
};

export default AuthPage;
