import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors (keep for backward compatibility)
        'txt-light': '#ecf0f1',
        'txt-dark': '#3d3d3d',
        
        // Futuristic theme colors
        'bg-primary': '#020617',      // slate-950
        'bg-secondary': '#0f172a',    // slate-900
        'bg-tertiary': '#1e293b',     // slate-800
        
        'accent-primary': '#f59e0b',  // amber-500
        'accent-secondary': '#d97706', // amber-600
        'accent-light': '#fbbf24',    // amber-400
        
        'text-primary': '#f8fafc',    // slate-50
        'text-secondary': '#cbd5e1',  // slate-300
        'text-muted': '#64748b',      // slate-500
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
export default config
