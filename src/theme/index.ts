import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import "@mui/material/Button";

declare module "@mui/material/styles" {
  interface StatusColor {
    main: string;
    contrastText: string;
    background: string;
    border: string;
  }
  interface Palette {
    status: Record<"open" | "inProgress" | "review" | "done", StatusColor>;

    border: {
      main: string;
    };
  }
  interface PaletteOptions {
    status?: Partial<
      Record<"open" | "inProgress" | "review" | "done", Partial<StatusColor>>
    >;

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
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
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
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#262E3A",
      light: "#3A4452",
      dark: "#13171D",
      contrastText: "#FFFFFF",
    },

    status: {
      open: {
        main: "#E2420C",
        contrastText: "#FFFFFF",
        background: "#FFFFFF2E",
        border: "#FFFFFF59",
      },

      inProgress: {
        main: "#3452C0",
        contrastText: "#FFFFFF",
        background: "#FFFFFF2E",
        border: "#FFFFFF59",
      },

      review: {
        main: "#FFB502",
        contrastText: "#262E3A",
        background: "#FFFFFFCC",
        border: "#00000014",
      },

      done: {
        main: "#ECF1F5",
        contrastText: "#262E3A",
        background: "#FFFFFFCC",
        border: "#00000014",
      },
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
      contrast: "#FFFFFF",
    },

    success: {
      main: green[500],
      light: green[300],
      dark: green[700],
      contrastText: "#FFFFFF",
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
