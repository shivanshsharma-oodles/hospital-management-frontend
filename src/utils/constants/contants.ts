export const APP = {
    NAME: "Hospital Management",
    ADMIN_NAME: "Hospital Management Admin",
    VERSION: "1.0.0",
} as const;

export const HERO = {
    TITLE: "Efficient Hospital Management",
    SUBTITLE: "Streamline your hospital operations with our all-in-one solution.",
    ALT_TEXT: "Hero Image representing Doctor",
} as const;

export const NAVBAR = {
    LINKS: [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ],
} as const;

export const SIGNUPFORM = {
    TITLE: "Create an Account",
    DESCRIPTION: "Sign up to access all features",
    SUBMIT_BUTTON_TEXT: "Sign Up",
    FOOTER_TEXT: "Already have an account? ",
    FOOTER_LINK_TEXT: "Log in",
    FOOTER_LINK_HREF: "/",
}

export const LOGINFORM = {
    TITLE: "Welcome back",
    DESCRIPTION: "Login to your account",
    SUBMIT_BUTTON_TEXT: "Login",
    FOOTER_TEXT: "New to our platform? ",
    FOOTER_LINK_TEXT: "Sign up",
    FOOTER_LINK_HREF: "/signup",
} as const;


export const ADMINLOGINFORM = {
    TITLE: "Welcome back",
    DESCRIPTION: "Login to your admin account",
    SUBMIT_BUTTON_TEXT: "Login as admin",
} as const;

export const ADMIN_DASH_SIDEBAR_BUTTONS = [
    {
        BUTTON_TEXT: "Departments", 
        ON_CLICK: () => {}
    },
    {
        BUTTON_TEXT: "Doctors", 
        ON_CLICK: () => {}
    }
]