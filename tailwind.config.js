/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // toggle via class (Future proofing for dark mode)
    content: ["./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                light: "#f6f6f6",     // Ligh Color
                brand: '#95adff',     // Blue Color (logo color)
                brandHover: '#8296d9',   
                primaryColor: '#f75ec3',   // Pink Color  
                primaryColorHover: '#fc86b7',   
                dark: '#1f0d1d',      // Dark pink Color,
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