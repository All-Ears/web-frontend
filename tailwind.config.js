module.exports = {
    purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                "21": "6.25rem",
                "22": "6.5rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
