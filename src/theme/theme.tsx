import { createTheme } from "@mui/material/styles";

import { Theme as MuiTheme } from "@mui/material/styles";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}
// Augment the palette to include a salmon color
declare module "@mui/material/styles" {
  interface Palette {
    positiveColor: Palette["primary"];
    negativeColor: Palette["primary"];
    textColor: Palette["primary"];
    stockColor: Palette["primary"];
    fiatColor: Palette["primary"];
    cryptoColor: Palette["primary"];
    conversionColor: Palette["primary"];
  }

  interface PaletteOptions {
    positiveColor?: PaletteOptions["primary"];
    negativeColor?: PaletteOptions["primary"];
    textColor?: PaletteOptions["primary"];
    stockColor?: PaletteOptions["primary"];
    fiatColor?: PaletteOptions["primary"];
    cryptoColor?: PaletteOptions["primary"];
    conversionColor?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include a salmon option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    positiveColor: true;
    negativeColor: true;
    textColor: true;
    stockColor: true;
    fiatColor: true;
    cryptoColor: true;
    conversionColor: true;
  }
}

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    positiveColor: theme.palette.augmentColor({
      color: {
        main: "#4CAF50",
      },
      name: "positiveColor",
    }),
    negativeColor: theme.palette.augmentColor({
      color: {
        main: "#FF3D00",
      },
      name: "negativeColor",
    }),
    textColor: theme.palette.augmentColor({
      color: {
        main: "#FFFFFF",
      },
      name: "textColor",
    }),
    stockColor: theme.palette.augmentColor({
      color: {
        main: "#536dfe", // Deep Purple 700
      },
      name: "stockColor",
    }),
    fiatColor: theme.palette.augmentColor({
      color: {
        main: "#69f0ae", // Green A400
      },
      name: "fiatColor",
    }),
    cryptoColor: theme.palette.augmentColor({
      color: {
        main: "#ffd740", // Amber A400
      },
      name: "cryptoColor",
    }),
    conversionColor: theme.palette.augmentColor({
      color: {
        main: "#42a5f5", // Blue 700
      },
      name: "conversionColor",
    }),
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    positiveColor: theme.palette.augmentColor({
      color: {
        main: "#4CAF50", // Green 500
      },
      name: "positiveColor",
    }),
    negativeColor: theme.palette.augmentColor({
      color: {
        main: "#FF3D00", // Deep Orange 500
      },
      name: "negativeColor",
    }),
    textColor: theme.palette.augmentColor({
      color: {
        main: "#364b54", // Grey 800
      },
      name: "textColor",
    }),
    stockColor: theme.palette.augmentColor({
      color: {
        main: "#536dfe", // Deep Purple 700
      },
      name: "stockColor",
    }),
    fiatColor: theme.palette.augmentColor({
      color: {
        main: "#53bd89",
      },
      name: "fiatColor",
    }),
    cryptoColor: theme.palette.augmentColor({
      color: {
        main: "#cf8104", // Amber A400
      },
      name: "cryptoColor",
    }),
    conversionColor: theme.palette.augmentColor({
      color: {
        main: "#0068ad", // Blue 700
      },
      name: "conversionColor",
    }),
  },
});
