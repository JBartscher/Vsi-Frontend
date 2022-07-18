/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            // sizes below 640px see https://stackoverflow.com/questions/68458179/how-do-i-get-tailwind-grid-to-work-on-mobile-under-640px
            screens: {
                'sm': {'max': '767px'} // all below 768 is sm screen. >767 => md
            }
        },
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "dark",
        themes: ["light", "dark", "cmyk", "cupcake", "synthwave", "cyberpunk", "dracula", "corporate", "retro", "autumn",  "luxury", "pastel", "emerald"]
    },
}
