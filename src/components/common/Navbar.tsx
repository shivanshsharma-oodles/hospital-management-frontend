// import { LOGO } from "@/components/design/ImagesToggle";
import React from "react";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";
import { Logo } from "@/components/design/LogoImage";

interface NavbarProps {
  OnSignInClick: () => void;
  OnRegisterClick: () => void;
}

const NavBar = ({ OnSignInClick, OnRegisterClick }: NavbarProps) => {
  return <>
      <Navbar01
        logo={<Logo className="w-24 h-14" />}
        logoHref="#"
        signInText="Sign In"
        onSignInClick={OnSignInClick}
        ctaText="Register"
        onCtaClick={OnRegisterClick}
      />
    </>
};

export default NavBar;
