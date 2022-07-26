
import { mergeTheme, defaultTheme, classicTheme } from 'evergreen-ui'

import { createTheme } from '@mui/material/styles';

// export let theme = createTheme({
//     palette: {
//         primary: {
//             main: '#3366FF',
//         },
//         secondary: {
//             main: '#262626',
//         },
//     },
//     typography:{
//         fontFamily:['Poppins', 'sans-serif'].join(",")
//     }
// });

// theme = createTheme(theme, {
//     palette: {
//         info: {
//             main: theme.palette.secondary.main,
//         },
//     },
// });

export let theme = mergeTheme(defaultTheme, {
    components: {
        Button: {
            baseStyle: {
                color: 'white',
                paddingX: 12,
                paddingY: 8,
                borderRadius: 5,
                backgroundColor: 'indianred',
                _hover: {
                    backgroundColor: 'firebrick',
                },
                _active: {
                    backgroundColor: 'darkred',
                },
                _focus: {
                    boxShadow: '0 0 0 2px lightcoral',
                },
            },
        },
    },
    // fontFamilies: {
    //     display: 'Poppins, sans-serif',
    //     ui: 'Poppins, sans-serif'
    // },
    // fontWeights: 500
})