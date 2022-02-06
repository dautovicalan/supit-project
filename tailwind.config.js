module.exports = {
  content: ["./*.{html, js}", "./*/*.{html, js}"],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "15px",
    },
    extend: {
      fontFamily: {
        "custom-font": ['"Supermercado One"', "cursive"],
      },
      backgroundImage: {
        "kako-do-nas":
          "url('../VUA_SUPIT_projektni_zadatak_materials/img/kakoDoNas.jpg')",
      },
      animation: {
        flyIn: "flyIn 2s ease-in-out",
        flyInAbove: "flyInAbove 1s ease-in-out",
      },
      keyframes: {
        flyIn: {
          "0%": { transform: "translateX(-200%)" },
          "100%": { transform: "translateX(0)" },
        },
        flyInAbove: {
          "0%": { transform: "translateY(-200%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
