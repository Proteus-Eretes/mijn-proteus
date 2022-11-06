const baseTheme = {
  "primary": "#ffffff",
  "secondary": "#f07f3c",
  "accent": "#003d6a",
  "neutral": "#262931",
  "base-100": "#004a95",
  "info": "#207ee9",
  "success": "#58e4d6",
  "warning": "#d18c15",
  "error": "#f77064",

  "--rounded-box": "1rem",
  "--rounded-btn": "0.5rem",
  "--rounded-badge": "1.9rem",
  "--animation-btn": "0.25s",
  "--animation-input": "0.2s",
  "--btn-text-case": "uppercase",
  "--btn-focus-scale": "0.95",
  "--border-btn": "1px",
  "--tab-border": "1px",
  "--tab-radius": "0.5rem",
};

module.exports = {
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        proteus: baseTheme,
      },
    ],
  },
};
