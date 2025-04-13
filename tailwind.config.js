// tailwind.config.js
// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate que escanee tus archivos fuente
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de ejemplo (¡Elige tus propios colores!)
        primary: {
          light: '#60a5fa', // Azul claro
          DEFAULT: '#3b82f6', // Azul principal
          dark: '#2563eb',  // Azul oscuro
        },
        secondary: {
          light: '#a78bfa', // Violeta claro
          DEFAULT: '#8b5cf6', // Violeta principal
          dark: '#7c3aed',  // Violeta oscuro
        },
        accent: {
          light: '#fde047', // Amarillo claro
          DEFAULT: '#facc15', // Amarillo principal
          dark: '#eab308',  // Amarillo oscuro
        },
        neutral: {
          lightest: '#f9fafb', // Gris muy claro (casi blanco)
          lighter: '#f3f4f6', // Gris claro
          light: '#e5e7eb',   // Gris
          DEFAULT: '#6b7280', // Gris medio
          dark: '#374151',    // Gris oscuro
          darker: '#1f2937',   // Gris muy oscuro
          darkest: '#111827',  // Casi negro
        },
        danger: {
          light: '#fda4af', // Rojo claro
          DEFAULT: '#f43f5e', // Rojo principal
          dark: '#be123c',  // Rojo oscuro
        },
        success: {
          light: '#86efac', // Verde claro
          DEFAULT: '#22c55e', // Verde principal
          dark: '#15803d',  // Verde oscuro
        },
        warning: {
          light: '#fcd34d', // Ámbar claro
          DEFAULT: '#fbbf24', // Ámbar principal
          dark: '#d97706',  // Ámbar oscuro
        },
        // Renombra colores base si quieres más control
        gray: { // Sobrescribe el gris por defecto si usas 'neutral' extensivamente
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        // Opcional: Define fuentes personalizadas (instálalas o impórtalas)
        // sans: ['Inter', 'sans-serif'], // Ejemplo con Inter
        // serif: ['Merriweather', 'serif'],
      },
      // Puedes extender otras cosas como borderRadius, spacing, etc.
      borderRadius: {
        'lg': '0.5rem', // Ejemplo de ajuste
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [
    // Plugin útil para estilizar formularios más fácilmente
    require('@tailwindcss/forms'),
  ],
}