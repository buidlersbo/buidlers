const config = {
  plugins: {
    "@tailwindcss/postcss": {
      plugins: ["./hero.ts"],
    },
  },
};

export default config;
