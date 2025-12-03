import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import "@mui/material/Button";

declare module "@mui/material/styles" {
  interface Palette {
    status: {
      open: string;
      inProgress: string;
      review: string;
      done: string;
    };

    border: {
      main: string;
    };
  }
  interface PaletteOptions {
    status?: {
      open?: string;
      inProgress?: string;
      review?: string;
      done?: string;
    };
    border?: {
      main: string;
    };
  }
  interface TypeText {
    contrast: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    create: true;
  }
}

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "1.3rem",
      fontWeight: 700,
      color: "white",
    },
    //   h2: {
    //     fontSize: "2rem",
    //     fontWeight: 600,
    //     lineHeight: 1.3,
    //   },
  },
  palette: {
    mode: "light",

    primary: {
      main: "#0164C9",
      light: "#2F8EE2",
      dark: "#004A96",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#262E3A",
      light: "#3A4452",
      dark: "#13171D",
      contrastText: "#ffffff",
    },

    status: {
      open: "#E2420C",
      inProgress: "#3452C0",
      review: "#FFB502",
      done: "#76CC00",
    },

    action: {
      disabled: "#AEA9B1",
    },

    background: {
      default: "#ECF1F5", // Seiten-Hintergrund (blauGrau)
      paper: "#FFFFFF",
    },

    border: {
      main: "#becad5ad",
    },

    text: {
      primary: "#111827",
      secondary: "#4B5563",
      disabled: "#818181",
      contrast: "#ffffff",
    },

    success: {
      main: green[500],
      light: green[300],
      dark: green[700],
      contrastText: "#ffffff",
    },
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "create" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.success.dark,
            },
          }),
        },
      ],
    },
  },
});

export default theme;
