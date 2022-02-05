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
    },
  },
  plugins: [],
};
