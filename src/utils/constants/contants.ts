import type { AdminSection } from "@/types";

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


export const ADMIN_DASH_SIDEBAR_BUTTONS = [
    { key: "departments" as AdminSection, label: "Departments" },
    { key: "doctors" as AdminSection, label: "Doctors"},
    { key: "patients" as AdminSection, label: "Patients"},
    { key: "appointments" as AdminSection, label: "Appointments"},
    { key: "bills" as AdminSection, label: "Bills"},
    { key: "medical-records" as AdminSection, label: "Medical Records"},
]