/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp'

export const tailwindcss = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            "primary": "#E4260E",
            "secondary": "#3c3c3c",
            "success": "#B1E30E",
            "danger": "#E3270E",
            "warning": "#FA7B32",
            "black": "#000",
            "white": "#fff",
            "default": "#D9D9D9",
            "body-background": "#F3F3F3",
            "navbar": "#3c3c3c",
            "gray-dark": "#273444",
            "gray": "#555",
            "gray-light": '#d3dce6',
            "link": "#0047D1"
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

