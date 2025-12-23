import React from "react";
import Logo from "@/assets/Logo.svg";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP } from "@/utils/constants";
import { storage } from "@/utils/storageFetch";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Role } from "@/types";

interface NavLink {
  label: string;
  href: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string; // Optional
}

interface CommonNavbarProps {
  user?: UserProfile;
  links?: NavLink[];
  role?: Role
}

const CommonNavbar = ({ user, links, role }: CommonNavbarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.clear();
    navigate("/", {replace: true})
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="sm:max-w-none 2xl:container flex h-14 items-center justify-between px-4">

        {/* Left Side: Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <img src={Logo} className="w-8 h-8" alt="Logo" />
            <span className="hidden sm:inline-block">{APP.NAME}</span>
          </Link>

          {/* Middle: Navigation Links (Desktop) */}
          {links &&
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="flex gap-1">
                {links.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link to={link.href}>
                      <div
                        className={
                          navigationMenuTriggerStyle() +
                          (isActive(link.href) ? " bg-accent text-accent-foreground" : "")
                        }
                      >
                        {link.label}
                      </div>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          }

        </div>

        {/* Right Side: Profile Dropdown */}
        {
          user ?
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            : role &&
            <Button onClick={handleLogout} variant="secondary" className="cursor-pointer">
              Logout
            </Button>
        }

      </div>
    </header>
  );
};

export default CommonNavbar;