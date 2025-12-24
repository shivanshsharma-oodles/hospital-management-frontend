import React, { useState } from "react";
import BaseForm from "@/components/common/baseComp/BaseForm";
import FormHeader from "@/components/ui/form/FormHeader";
import FormBody from "@/components/ui/form/FormBody";
import FormFooter from "@/components/ui/form/FormFooter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ADMINLOGINFORM } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "@/services/spring-apis/auth.service";
import { showError, showSuccess } from "@/utils/toast";
import { useActiveRole } from "@/context/ActiveRoleContext";

const AdminLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setActiveRole} = useActiveRole();
    const navigate = useNavigate();

    // Handle Login
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);

        const payload = {
            email: formdata.get("email") as string,
            password: formdata.get("password") as string,
        };

        try {
                await adminLogin(payload);
                showSuccess("Admin login successful!", "admin-login-success");
                // Navigate to admin dashboard after login
                setActiveRole("ADMIN");
                navigate("/admin/dashboard", { replace: true });
                return;
        } catch (error) {
            console.error("Login failed:", error);
            showError(error.response.data.error, "login-failure");
        }
    }

    return (
        <BaseForm onSubmit={handleLogin}>
            <FormHeader title={ADMINLOGINFORM.TITLE} description={ADMINLOGINFORM.DESCRIPTION} />

            <FormBody>
                <Input
                    name="email"
                    required
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    name="password"
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormBody>

            <FormFooter>
                <Button
                    className="w-full bg-primaryColor hover:bg-primaryColorHover"
                    type="submit"
                >
                    {ADMINLOGINFORM.SUBMIT_BUTTON_TEXT}
                </Button>
            </FormFooter>
        </BaseForm>
    );
};

export default AdminLoginForm;
