/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
      screens: {
        xs: "480px",
  
        sm: "640px",
  
        md: "768px",
  
        lg: "1024px",
  
        xl: "1280px",
  
        "2xl": "1536px",
  
        "3xl": "1920px",
      },
      fontSize: {
        xxs: ".625rem",
        xs: "0.7rem",
        sm: "0.8rem",
        base: "1rem",
        lg: "1.1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
        "6xl": "6.104rem",
        "7xl": "8.000rem",
        cta: "7rem",
      },
      extend: {
        colors: {
        },
        fontFamily: {
          inter: ["Inter", "sans-serif"],
        },
        fontSize: {
          body: ["16px", "22.4px"],
        },
        fontWeight: {
          light: "300",
          med: "400",
          sub: "600",
        },
      },
    },
    plugins: [],
    darkMode: 'class',
  };
  