/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp'

export const tailwindcss = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            "primary": "#050263",
            "secondary": "#ce000e",
            "success": "#146302",
            "warning": "#FA7B32",
            "danger": "#ce000e",
            "black": "#000",
            "white": "#fff",
            "default": "#ddd",
            "body-background": "#F3F3F3",
            "navbar": "#4541B8",
            "gray-dark": "#273444",
            "gray": "#555",
            "gray-light": '#d3dce6',
            "link": "#3292FA"
        },
        extend: {

        },
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [
        lineClamp,
    ]
}

