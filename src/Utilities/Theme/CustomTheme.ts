import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

type ComplementaryColorsType = {
    tertiary: { main: string },
    contrast: string
}

// A custom theme for this app
export const customTheme = createMuiTheme({
    palette: {
        primary: {
            light: "#60646b",
            main: '#393e46',
            dark: "#272b31",
            contrastText: "#ffffff"
        },
        secondary: {
            light: "#ffdb87",
            main: '#ffd369',
            dark: "#b29349",
            contrastText: "#000000",
        },
        error: {
            main: red[900],
        },
        success: {
            main: green[500]
        },
        background: {
            default: '#f1f1f1',
        },
    },
});

export const ComplementaryColors: ComplementaryColorsType = {
    tertiary: {
        main: "#EDEDED"
    },
    contrast: "#00FF7C"
}