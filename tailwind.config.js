/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Outfit', 'system-ui', 'sans-serif'],
  		},
  		colors: {
  			'dark-bg': {
  				'50': '#f8f7ff',
  				'100': '#f0edff',
  				'200': '#e6e0ff',
  				'300': '#d1c7ff',
  				'400': '#b8a6ff',
  				'500': '#9f7aff',
  				'600': '#8b5cf6',
  				'700': '#7c3aed',
  				'800': '#6d28d9',
  				'900': '#5b21b6',
  				'950': '#0a0a0f'
  			},
  			'purple-dark': {
  				'50': '#faf5ff',
  				'100': '#f3e8ff',
  				'200': '#e9d5ff',
  				'300': '#d8b4fe',
  				'400': '#c084fc',
  				'500': '#a855f7',
  				'600': '#9333ea',
  				'700': '#7c3aed',
  				'800': '#6b21a8',
  				'900': '#581c87',
  				'950': '#1a0d2e'
  			},
  			'k72-lime': '#d3fd50',
  			'k72-black': '#000000',
  			'k72-white': '#ffffff',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			'elastic-bounce': 'elasticBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  			'elastic-float': 'elasticFloat 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  			'shine': 'shine 5s linear infinite',
  		},
  		keyframes: {
  			elasticBounce: {
  				'0%': { transform: 'translateY(0) scale(1)' },
  				'50%': { transform: 'translateY(-5px) scale(1.02)' },
  				'100%': { transform: 'translateY(0) scale(1)' },
  			},
  			elasticFloat: {
  				'0%, 100%': { transform: 'translateY(0) scale(1) rotate(0deg)' },
  				'50%': { transform: 'translateY(-3px) scale(1.005) rotate(0.5deg)' },
  			},
  			shine: {
  				'0%': { 'background-position': '100%' },
  				'100%': { 'background-position': '-100%' },
  			},
  		},
  		aspectRatio: {
  			'4/3': '4 / 3',
  		},
  		backgroundImage: {
  			'purple-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a0d2e 50%, #2d1b69 100%)',
  			'purple-glow': 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
