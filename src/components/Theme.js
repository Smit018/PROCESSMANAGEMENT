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
});

theme = createTheme(theme, {
    palette: {
        info: {
            main: theme.palette.secondary.main,
        },
    },
});