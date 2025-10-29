import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'tnt-red': '#E31E24',
        'tnt-silver': '#C0C0C0',
        'tnt-metallic': '#8B8B8B',
        'tnt-black': '#000000',
        'tnt-dark-grey': '#1A1A1A',
        'tnt-light-grey': '#E5E5E5',
        'gnet-purple': '#667eea',
        'gnet-violet': '#764ba2',
        'groundspan-blue': '#2563EB',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
