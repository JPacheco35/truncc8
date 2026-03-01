import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {MantineProvider, ColorSchemeScript, createTheme} from '@mantine/core'
import '@mantine/core/styles.css'
import './main.css'

import App from './Components/App/App'

const theme = createTheme({
    colors: {
        // Add your color
        deepBlue: [
            '#eef3ff',
            '#dce4f5',
            '#b9c7e2',
            '#94a8d0',
            '#748dc1',
            '#5f7cb8',
            '#5474b4',
            '#44639f',
            '#39588f',
            '#2d4b81',
        ],
        // or replace default theme color
        blue: [
            '#eef3ff',
            '#dee2f2',
            '#bdc2de',
            '#98a0ca',
            '#7a84ba',
            '#6672b0',
            '#5c68ac',
            '#4c5897',
            '#424e88',
            '#364379',
        ],
        white: [
            '#ffffff',
            '#f5f5f5',
            '#e0e0e0',
            '#d3d3d3',
            '#c0c0c0',
            '#a9a9a9',
            '#808080',
            '#696969',
            '#4d4d4d',
            '#333333',
        ]
    },

    shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    },
});


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ColorSchemeScript defaultColorScheme="dark"/>
        <MantineProvider
            defaultColorScheme="dark"
            theme={theme}
            cssVariablesResolver={() => ({
                variables: {},
                light: {
                    '--mantine-color-body': '#ededed', // ✅ Light mode background
                },
                dark: {},
            })}
        >
            <App />
        </MantineProvider>
    </StrictMode>
)