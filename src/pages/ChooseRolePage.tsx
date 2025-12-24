import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useActiveRole } from "@/context/ActiveRoleContext";
import { Card, CardContent } from "@/components/ui/card";
import type { Role } from "@/types";

const ChooseRolePage = () => {
  const { roles } = useAuthUser();
  const { setActiveRole } = useActiveRole();
  const navigate = useNavigate();

  const handleSelectRole = (role: Role) => {
    setActiveRole(role);
    navigate(`/${role.toLowerCase()}/dashboard`, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Choose how you want to continue
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role) => (
            <Card
              key={role}
              className="cursor-pointer hover:bg-pink-100 hover:scale-[1.04] transition"
              onClick={() => handleSelectRole(role)}
            >
              <CardContent className="flex flex-col items-center justify-center py-8">
                <span className="text-lg font-medium">
                  Continue as {role.charAt(0) + role.slice(1).toLowerCase()} {/* Ex: DOCTOR -> Doctor */}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseRolePage;
