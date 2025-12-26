import React, { useState } from "react";
import BaseForm from "@/components/common/baseComp/BaseForm";
import FormHeader from "@/components/ui/form/FormHeader";
import FormBody from "@/components/ui/form/FormBody";
import FormFooter from "@/components/ui/form/FormFooter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LOGINFORM } from "@/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import {login } from "@/services/spring-apis/auth.service";
import { showError, showSuccess } from "@/utils/toast";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            await login(payload);
            showSuccess("Login successful!", "login-success");
            // Navigate to dashboard (Doctor/Patient]) after login
            
            navigate("/", { replace: true });

        } catch (error) {
            console.error("Login failed:", error);
            showError(error.response.data.error || "Login Failed", "login-failure");
        }
    }

    return (
        <BaseForm onSubmit={handleLogin}>
            <FormHeader title={LOGINFORM.TITLE} description={LOGINFORM.DESCRIPTION} />

            <FormBody>
                <Input
                    name="email"
                    required
                    type="email"
                    placeholder="Email"
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
                    className="w-full
          bg-primaryColor hover:bg-primaryColorHover"
                    type="submit"
                >
                    {LOGINFORM.SUBMIT_BUTTON_TEXT}
                </Button>
                <div className="text-sm">
                    {" "}
                    {LOGINFORM.FOOTER_TEXT}
                    <Link
                        to={LOGINFORM.FOOTER_LINK_HREF}
                        replace
                        className="text-blue-800 underline"
                    >
                        {LOGINFORM.FOOTER_LINK_TEXT}
                    </Link>
                </div>
            </FormFooter>
        </BaseForm>
    );
};

export default LoginForm;
