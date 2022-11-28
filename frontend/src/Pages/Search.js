import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from 'react-youtube'
import {
    Box,
    Text,
    Flex,
    Button,
    InputGroup,
    InputLeftAddon,
    Input,
    Image,
} from "@chakra-ui/react";
import Layout from "../Layout/Layout";

const Search = () => {
    const [char, setChar] = useState("");
    const [words, setWords] = useState([]);
    const [sentence, setSentence] = useState([]);
    const [informasi, setInformasi] = useState([]);
    const [images, setImages] = useState([])
    const [selectedWord, setSelectedWord] = useState("");
    const [selectedSentence, setSelectedSentence] = useState("");

    const handleChange = (e) => {
        setChar(e.target.value.toUpperCase());
    };

    const handleClick = async () => {
        setWords("");
        setSelectedWord("");
        setSelectedSentence("")
        setSentence([]);
        setInformasi([]);
        const kata = await axios.get(`http://localhost:5000/kata`);
        getWord(kata.data);
    };

    useEffect(() => {
        getSentence();
    }, [selectedWord]);

    useEffect(() => {
        getInformasi();
    }, [selectedSentence]);

    const getWord = (data) => {
        let j = 0;
        for (let i = 0; i < data.length; i++) {
            let kata = data[i].kata.toUpperCase();
            if (kata[0] === char) {
                setWords((prevWord) => [...prevWord, kata]);
                j++;
                if (j === 15) {
                    break;
                }
            }
        }
    };

    const getSentence = async () => {
        setSentence([]);
        setInformasi([])
        setImages([])
        const kalimat = await axios.get(`http://localhost:5000/kalimat`);
        const data = kalimat.data;
        let j = 0;
        for (let i = 0; i < data.length; i++) {
            let kalimat = data[i].kalimat.toUpperCase();
            let kalimatToArray = data[i].kalimat.split(" ");
            if (kalimatToArray[0].toUpperCase() === selectedWord) {
                setSentence((prevSentence) => [...prevSentence, kalimat]);
                j++;
                if (j === 10) {
                    break;
                }
            }
            // if (kalimat.includes(selectedWord) && selectedWord !== "") {
            //     setSentence((prevSentence) => [...prevSentence, kalimat]);
            //     j++;
            //     if (j === 10) {
            //         break;
            //     }
            // }
        }
    };

    const getInformasi = async () => {
        setInformasi([]);
        setImages([])
        const informasi = await axios.get(`http://localhost:5000/kalimat`);
        const dataInformasi = informasi.data;
        let j = 0;
        for (let i = dataInformasi.length - 1; i > 0; i--) {
            const k = Math.floor(Math.random() * (i + 1));
            [dataInformasi[i], dataInformasi[k]] = [dataInformasi[k], dataInformasi[i]];
        }
        for (let i = 0; i < dataInformasi.length; i++) {
            let kalimat = dataInformasi[i].kalimat.toUpperCase();
            if (kalimat.includes(selectedWord) && selectedWord !== "") {
                setInformasi((prevInformasi) => [...prevInformasi, kalimat]);
                j++;
                if (j === 5) {
                    break;
                }
            }
        }     

        const image = await axios.get('http://localhost:5000/image') 
        const dataImage = image.data
        console.log(dataImage)
        let k = 0

        for (let i = dataImage.length - 1; i > 0; i--) {
            const k = Math.floor(Math.random() * (i + 1));
            [dataImage[i], dataImage[k]] = [dataImage[k], dataImage[i]];
        }
        for (let i = 0; i < dataImage.length; i++) {
            if(dataImage[i].alt.toUpperCase() === selectedWord) {
                setImages(prevImage => [...prevImage, dataImage[i]])
                    if (k === 5) {
                        break;
                    }
                k++
            }
        }    
    };

    return (
        <Layout>
            <Box padding='20px'>
                <Flex
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                >
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
                        borderRadius='10px'
                    >
                        <Text fontSize='1.2rem'>Kata</Text>
                        <Flex
                            flexWrap='wrap'
                            gap='10px'
                            padding='20px'
                            border='1px solid #00000020'
                            borderRadius='10px'
                        >
                            {words &&
                                words.map((word) => {
                                    return (
                                        <Box
                                            key={word}
                                            cursor='pointer'
                                            onClick={() =>
                                                setSelectedWord(word)
                                            }
                                            sx={{
                                                "&:hover": {
                                                    color: "blue.300",
                                                },
                                            }}
                                        >
                                            {word}
                                        </Box>
                                    );
                                })}
                        </Flex>
                        <Text fontSize='1rem' opacity='.5' fontStyle='italic'>
                            Jumlah: {words.length} kata
                        </Text>
                    </Box>
                    <Box
                        width='40rem'
                        marginTop='3rem'
                        border='1px solid #00000020'
                        padding='20px'
                        borderRadius='10px'
                    >
                        <Text fontSize='1.2rem'>Kalimat</Text>
                        <Flex
                            flexWrap='wrap'
                            gap='10px'
                            padding='20px'
                            border='1px solid #00000020'
                            borderRadius='10px'
                        >
                            {sentence.map((kalimat) => {
                                return (
                                    <Box
                                        key={kalimat}
                                        cursor='pointer'
                                        sx={{
                                            "&:hover": {
                                                color: "blue.300",
                                            },
                                        }}
                                        onClick={() =>
                                            setSelectedSentence(kalimat)
                                        }
                                    >
                                        {kalimat}
                                    </Box>
                                );
                            })}
                        </Flex>
                        <Text fontSize='1rem' opacity='.5' fontStyle='italic'>
                            Jumlah: {sentence.length} kalimat
                        </Text>
                    </Box>
                    <Box
                        width='40rem'
                        marginTop='3rem'
                        border='1px solid #00000020'
                        padding='20px'
                        borderRadius='10px'
                    >
                        <Text fontSize='1.2rem'>Informasi</Text>
                        <Flex
                            flexWrap='wrap'
                            gap='10px'
                            padding='20px'
                            border='1px solid #00000020'
                            borderRadius='10px'
                            align="left"
                            justify="center"
                            //flexDirection="column"
                        >
                            {/* <YouTube videoId="qPj50i3gkAo"/> */}
                            {selectedSentence !== "" && images.map((image) => {
                                return (
                                    <Image
                                        key={image.id}
                                        src={image.url}
                                        width="150px"
                                    />
                                );
                            })}
                            {selectedSentence !== "" && informasi.map((info) => {
                                return (
                                    <Box
                                        key={info}
                                    >
                                        {info}
                                    </Box>
                                );
                            })}
                        </Flex>
                        <Text fontSize='1rem' opacity='.5' fontStyle='italic'>
                            Jumlah: {informasi.length} informasi
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Layout>
    );
};

export default Search;
