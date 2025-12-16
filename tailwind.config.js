/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // toggle via class (Future proofing for dark mode)
    content: ["./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                light: "#f6f6f6",     // Ligh Color
                brand: '#098f6d',     // Observatory Color (logo color)
                dark: '#11211C',      // Dark Aztec Green Color
                dark_secondary: "#0c0f12", // Darker Shade for dark mode backgrounds
                light_secondary: "#f3f4f6",
        },
        boxShadow: {
            // pixel: '', 
            soft: '0 2px 6px rgba(0, 0, 0, 0.85)',
        },
    }
},
plugins: [],
    corePlugins: {
    scrollBehavior: true,
    },
}