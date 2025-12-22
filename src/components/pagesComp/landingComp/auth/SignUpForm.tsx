import React, { useState } from "react";
import BaseForm from "@/components/common/baseComp/BaseForm";
import FormHeader from "@/components/ui/form/FormHeader";
import FormBody from "@/components/ui/form/FormBody";
import FormFooter from "@/components/ui/form/FormFooter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SIGNUPFORM } from "@/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "@/services/spring-apis/auth.service";
import { showError, showSuccess } from "@/utils/toast";

const SignupForm = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle Signup
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);

        const payload = {
            name: formdata.get("name") as string,
            email: formdata.get("email") as string,
            phone: formdata.get("phone") as string,
            password: formdata.get("password") as string,
        };

        try {
            await signup(payload);
            showSuccess("Signup successful! Please login.", "signup-success");
            // Navigate to login page for logging in after signup
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Signup failed:", error);
            showError(error.response.data.error, "signup-failure");
        }
    }

    return (
        <BaseForm onSubmit={handleSignup}>
            <FormHeader
                title={SIGNUPFORM.TITLE}
                description={SIGNUPFORM.DESCRIPTION}
            />

            <FormBody>
                <Input
                    name="name"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    name="email"
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    name="phone"
                    required
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Allow only digits
                        if (/^\d*$/.test(value)) {
                            setPhone(value);
                        }
                    }}
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
                <Button className="w-full bg-primaryColor hover:bg-primaryColorHover" type="submit">
                    {SIGNUPFORM.SUBMIT_BUTTON_TEXT}
                </Button>

                <div className="text-sm"> {SIGNUPFORM.FOOTER_TEXT}
                    <Link
                        to={SIGNUPFORM.FOOTER_LINK_HREF}
                        replace
                        className="text-blue-800 underline"
                    >
                        {SIGNUPFORM.FOOTER_LINK_TEXT}
                    </Link>
                </div>
            </FormFooter>
        </BaseForm>
    );
};

export default SignupForm;
