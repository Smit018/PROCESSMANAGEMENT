import { createTheme } from '@mui/material/styles';

export let theme = createTheme({
    palette: {
        primary: {
            main: '#3366FF',
        },
        secondary: {
            main: '#262626',
        },
    },
    typography:{
        fontFamily:['Poppins', 'sans-serif'].join(",")
    }
});

theme = createTheme(theme, {
    palette: {
        info: {
            main: theme.palette.secondary.main,
        },
    },
});