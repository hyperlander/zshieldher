/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        shield: {
          deep:   '#1a4a3a',
          mid:    '#2d7a5f',
          light:  '#e8f4f0',
          xlight: '#f0f8f5',
        },
        sand: {
          DEFAULT: '#f5f0e8',
          dark:    '#ede5d8',
        },
        amber: {
          sh:     '#c87941',
          light:  '#fdf3e9',
        },
        escape: '#c0392b',
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
          '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"',
          'Consolas', 'monospace',
        ],
      },
      borderRadius: {
        'xl':  '16px',
        '2xl': '24px',
      },
      typography: ({ theme }) => ({
        shield: {
          css: {
            '--tw-prose-body':        theme('colors.zinc[700]'),
            '--tw-prose-headings':    theme('colors.shield.deep'),
            '--tw-prose-links':       theme('colors.shield.mid'),
            '--tw-prose-bold':        theme('colors.shield.deep'),
            '--tw-prose-bullets':     theme('colors.shield.mid'),
            '--tw-prose-counters':    theme('colors.shield.mid'),
            '--tw-prose-hr':          theme('colors.shield.light'),
            '--tw-prose-quote-borders': theme('colors.shield.mid'),
            'h2, h3, h4': { letterSpacing: '-0.02em' },
            'a': { textDecoration: 'underline' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
