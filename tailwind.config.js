/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F3',
          100: '#F7F4EB', // Main reference background
          200: '#EFE9DC',
          300: '#E3D7C1',
          400: '#D2C2A3',
          card: '#EDE6D6',
          cardHover: '#E5DDCB',
        },
        forest: {
          950: '#0B1A12',
          900: '#11281D',
          850: '#153324',
          800: '#1A3B2B', // Reference hero forest green
          700: '#234D38',
          600: '#2F644A',
          muted: '#284638',
        },
        coffee: {
          950: '#1E120B',
          900: '#2A1A10',
          800: '#3D2719',
          700: '#5A3824',
          600: '#754B30',
          amber: '#8B5A2B',
          gold: '#C58F49',
          foam: '#EAE1D2',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        handwriting: ['"Caveat"', '"Playpen Sans"', 'cursive'],
      },
      transitionTimingFunction: {
        'emil-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'emil-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'apple-spring': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      boxShadow: {
        'soft-card': '0 10px 30px -10px rgba(42, 26, 16, 0.07)',
        'hover-card': '0 20px 40px -15px rgba(42, 26, 16, 0.14)',
        'polaroid': '0 12px 35px -8px rgba(17, 40, 29, 0.22)',
      }
    },
  },
  plugins: [],
}
