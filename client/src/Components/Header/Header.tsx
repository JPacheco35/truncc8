import {Center, Stack, Title} from '@mantine/core'
import './Header.css'

function Header() {

    return (
        <Center>
            <Stack gap="xs">
                <Title
                    className={"gradient-animate"}
                    order={1}
                    size={100}
                    style={{
                        fontFamily: 'Ubuntu, serif',
                    }}
                >
                    Truncc8
                </Title>

                <Title
                    order={3}
                    size={20}
                    style={{
                        fontFamily: 'Ubuntu, serif',
                        fontStyle: 'italic'
                    }}

                >
                    a URL Shortener
                </Title>
            </Stack>
        </Center>
    )
}

export default Header