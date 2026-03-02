import './URLInput.css'
import { useState, type SetStateAction} from "react";
import {Button, Paper, ActionIcon, Group, Stack, Text, TextInput} from '@mantine/core';
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { Transition, useMantineColorScheme } from "@mantine/core";

function URLInput() {

    // current textbox content
    const [url, setUrl] = useState("");

    // shortcode for submitted url
    const [shortURL, setShortURL] = useState("");

    // copied state
    const [copied,setCopied] = useState(false);

    const theme = useMantineColorScheme();

    // Determine Paper background based on color scheme
    const paperBackground =
      theme.colorScheme === 'dark'
        ? 'linear-gradient(135deg, #1b1028, #1a1f4d 40%, #2a1a5e 75%)' // dark mode
        : 'linear-gradient(135deg, #f0d6ff, #c4d1ff 40%, #a8baff 75%)'; // light mode

    // on copy click, copy shortened url
    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortURL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // on text input change, update url
    const handleURLChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUrl(e.target.value);
        // console.log(e.target.value); // DEBUG: show current state content
    };

    // on submit, send request to backend --> get shortcode
    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log("submit button clicked!");
        console.log(url);
        console.log(validateURL(url));
        if (validateURL(url)){
            try {
                const response = await fetch("https://truncc8.vercel.app/api/shorten", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: url })
                });
                const data = await response.json();
                // console.log(data.shortCode);
                setShortURL('https:/truncc8.vercel.app/api/' + data.shortCode);

            }
            catch (err) {
                console.error("Error:",err);
            }
        }
    }

    // URL format validation
    const validateURL = (url: string) => {
        const regex = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        // console.log(regex.test(url);
        return regex.test(url);
    }

    return (
        <Stack>
            <Group gap={5} grow={false}>
                <TextInput
                    size="lg"
                    radius="lg"
                    placeholder="enter your URL..."

                    style={{
                        flex: 5,
                        fontSize: "160px",
                    }}
                    onChange={handleURLChange}
                />
                <Button
                    size="xl"
                    radius="lg"
                    style={{
                        flex: 1,
                        fontSize: 16
                    }}
                    variant={"light"}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Group>

            <Text

            >
                <Transition
                  mounted={!!shortURL}
                  transition="fade-up"
                  duration={400}
                  timingFunction="ease"
                >
                    {(styles) => (
                      <Group
                        justify="center"
                        mt="0rem"
                      >
                          <Paper
                            radius="lg"
                            px="md"
                            py="sm"
                            my={0}
                            withBorder
                            style={{
                                display: "inline-block",
                                background: paperBackground,
                                border: "1px solid #334155",
                            }}
                          >
                              <a
                                href={shortURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    // color: "#38bdf8",
                                    color: theme.colorScheme === 'dark' ? '#2279ff' : '#3b2dd6', // neon pink on dark, strong blue on light,
                                    textDecoration: "none",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    wordBreak: "break-all",
                                }}
                              >
                                  {shortURL}
                              </a>

                              <ActionIcon
                                variant="subtle"
                                color={copied ? "green" : "blue"}
                                onClick={handleCopy}
                              >
                                  {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                              </ActionIcon>

                          </Paper>
                      </Group>
                    )}
                </Transition>
            </Text>
        </Stack>

    );
}
export default URLInput;