import { Center, Text } from '@mantine/core'
import './Footer.css'
import ThemeButton from "../ThemeButton/ThemeButton";

function Footer() {
    return (
        <div className="footer">
            <Center
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    // padding: '10px',
                    // backgroundColor: '#f5f5f5',
                    // borderRadius: '5px',
                    // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Text size="sm">
                    2026 - Truncc8
                </Text>
                <ThemeButton />
            </Center>
        </div>
    )
}

export default Footer