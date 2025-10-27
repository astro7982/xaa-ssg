import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // NCAA Football theme colors
        'field-green': '#2d5016',
        'field-green-light': '#3a6b1d',
        'yard-line': '#ffffff',
        'scoreboard': '#1a1a1a',
        'scoreboard-orange': '#ff6b35',
        'team-blue': '#003087',
        'team-red': '#c8102e',
        'okta-blue': '#007dc1',
      },
      backgroundImage: {
        'field-pattern': "url('/field-pattern.svg')",
      },
      fontFamily: {
        'scoreboard': ['\'Courier New\'', 'monospace'],
        'athletic': ['\'Impact\'', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
