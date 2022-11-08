import React, { useEffect, useState } from "react";
import {
    ChakraProvider,
    Box,
    Text,
    Textarea,
    Flex,
    Button,
    InputGroup,
    InputLeftAddon,
    Input,
    theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const App = () => {
    const [char, setChar] = useState("");
    const [words, setWords] = useState("");

    const handleChange = (e) => {
        setChar(e.target.value);
    };

    const handleWord = (data) => {
        let words = "";
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            if (data[i - 1] === " " && data[i] === char) {
                for (let j = i; j < data.length; j++) {
                    if (
                        data[j] === " " ||
                        /^[a-zA-Z]+$/.test(data[j]) === false
                    ) {
                        break;
                    } else {
                        words += data[j];
                    }
                }
                words += " ";
            }
        }
        setWords(words);
    };

    const handleClick = async () => {
        const words = await fetch(`http://localhost:8000`);
        const data = await words.json();
        handleWord(data.result);
    };

    return (
        <ChakraProvider theme={theme}>
            <Box padding='20px'>
                <Flex
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                >
                    <ColorModeSwitcher
                        position='fixed'
                        top='20px'
                        right='20px'
                    />
                    <Box width='30rem' marginTop='10vh'>
                        <Flex gap='20px'>
                            <InputGroup>
                                <InputLeftAddon children='Karakter' />
                                <Input
                                    type='search'
                                    onChange={handleChange}
                                    value={char}
                                    maxLength={1}
                                    placeholder='Masukkan karakter'
                                />
                            </InputGroup>
                            <Button
                                colorScheme='blue'
                                padding='10px 30px'
                                onClick={handleClick}
                            >
                                Search
                            </Button>
                        </Flex>
                    </Box>
                    <Box
                        width='40rem'
                        marginTop='3rem'
                        border='1px solid #00000020'
                        padding='20px'
                        borderRadius='5px'
                    >
                        <Text fontSize='1.2rem'>Kata</Text>
                        <Textarea
                            resize='vertical'
                            rows='5'
                            placeholder='Daftar kata'
                            value={words}
                            readOnly
                        ></Textarea>
                    </Box>
                </Flex>
            </Box>
        </ChakraProvider>
    );
};

export default App;
