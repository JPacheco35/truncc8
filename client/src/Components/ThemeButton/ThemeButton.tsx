import {ActionIcon, useMantineColorScheme} from "@mantine/core";
import {IconMoonStars, IconSun} from '@tabler/icons-react';

function ThemeButton() {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon variant="light" aria-label="Theme Button">

            {colorScheme === 'dark'?
                (
                    <IconMoonStars
                        style={{ width: '70%', height: '70%' }}
                        stroke={1.5}
                        onClick={() => toggleColorScheme()}
                    />
                )
                :
                (
                    <IconSun
                        style={{ width: '70%', height: '70%' }}
                        stroke={1.5}
                        onClick={() => toggleColorScheme()}
                    />
                )}

        </ActionIcon>
    );
}

export default ThemeButton