module.exports = {
    purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                "21": "6.25rem",
                "22": "6.5rem",
                "9/10": "90%",
                "5/12": "41.666666%",
                "9/20": "45%",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
