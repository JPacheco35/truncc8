import './URLInput.css'
import { useState, type SetStateAction} from "react";
import {Button, Group, Stack, Text, TextInput} from '@mantine/core';

function URLInput() {

    // stores current content of the textbox
    const [url, setUrl] = useState("");
    const [shortURL, setShortURL] = useState("");
    // const PORT = "3000";

    // on content change, update the state
    const handleURLChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUrl(e.target.value);
        console.log(e.target.value); // DEBUG: show current state content
    };

    // on submit, send request to backend --> get shortcode
    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log("submit button clicked!");
        console.log(url);
        console.log(validateURL(url));
        if (validateURL(url)){
            try {
                const response = await fetch("https://truncc8.vercel.app/shorten", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: url })
                });
                const data = await response.json();
                // console.log(data.shortCode);
                setShortURL(window.location.protocol + '//' + location.hostname + ':3000/' + data.shortCode);

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
                    size="xl"
                    radius="lg"
                    placeholder="enter your URL..."
                    style={{
                        flex: 5,
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
            <Text>
                <a href={shortURL} target="_blank" rel="noopener noreferrer">
                    {shortURL}
                </a>
            </Text>
        </Stack>

    );
}
export default URLInput;