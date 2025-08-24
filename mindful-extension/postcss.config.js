const tailwindcss = require('@tailwindcss/postcss');

module.exports = {
  plugins: [
    tailwindcss({
      // Explicitly point to your Tailwind config file
      config: './tailwind.config.js',
    }),
    require('autoprefixer'),
  ],
}
