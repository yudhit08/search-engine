import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Text,
    Flex,
    Button,
    InputGroup,
    InputLeftAddon,
    Input,
} from "@chakra-ui/react";
import Layout from "../Layout/Layout";

const Crawling = () => {
    // const [url, setUrl] = useState("https://id.wikipedia.org/wiki/");
    const [url, setUrl] = useState("https://id.wikipedia.org/wiki/");
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    let crawl = "";

    const handleUrl = (e) => {
        setUrl(e.target.value);
    };

    const addKata = async () => {
        let result = "";
        let kata = "";
        let data = crawl.data;
        for (let i = 0; i < data.length; i++) {
            if (data[i - 1] === " ") {
                for (let j = i; j < data.length; j++) {
                    if (
                        data[j] === " " ||
                        /^[a-zA-Z]+$/.test(data[j]) === false
                    ) {
                        break;
                    } else {
                        result += data[j];
                    }
                }
                kata = result;
                console.log(kata);
                const kataInDb = await axios.get("http://localhost:5000/kata");
                JSON.stringify(kataInDb).includes(kata) === false &&
                    (await axios.post("http://localhost:5000/kata", {
                        kata,
                    }));
                result = "";
                setIsLoading(true);
            }
        }
        setIsLoading(false)
    };

    // const addKata = async () => {
    //     const kalimat = crawl.data;
    //     for (let i = 0; i < kalimat.data[i].length; i++) {
    //         //let kalimat = data[i].data;
    //         console.log(kalimat)
    //         let kalimatToArray = kalimat.data[i].split(" ")
    //         const kataInDb = await axios.get(
    //             "http://localhost:5000/kata"
    //         );
    //         let kata = kalimatToArray[0]
    //         JSON.stringify(kataInDb).includes(kata) === false &&
    //             (await axios.post("http://localhost:5000/kata", {
    //                 kata,
    //             }));
    //         setIsLoading(true);
    //     }
    //     setIsLoading(false)
    // }

    const addKalimat = async () => {
        const sentenceArray = result
            .replace(/([.?!])\s*(?=[a-zA-Z()])/g, "$1|")
            .split("|");
        //console.log(crawl.data)
        for (let i = 0; i < sentenceArray.length; i++) {
            let kalimat = sentenceArray[i];
            const kalimatInDb = await axios.get(
                "http://localhost:5000/kalimat"
            );
            //console.log(kalimatInDb);
            JSON.stringify(kalimatInDb).includes(kalimat) === false &&
                (await axios.post("http://localhost:5000/kalimat", {
                    kalimat,
                }));
            setIsLoading(true);
        }
        setIsLoading(false);
    };

    const handleClick = async () => {
        for (let i = 6; i < 26; i++) {
            let letter = (i + 10).toString(36);
            const getKata = await axios.get(`http://localhost:5000/kata`);
            const dataKata = getKata.data;
            let k = 0;
            //console.log(dataKata[0].kata[0])
            for (let j = 0; j < dataKata.length; j++) {
                let crawl = "";
                if(dataKata[j].kata[0].toLowerCase() === letter) {
                    console.log(dataKata[j].kata.toLowerCase())
                    setUrl(`https://id.wikipedia.org/wiki/${dataKata[j].kata.toLowerCase()}`)
                    for(let k = 0; k < 5; k++) {
                        await axios.post(`http://localhost:5000/crawling`, {
                            url : `https://id.wikipedia.org/wiki/${dataKata[j].kata.toLowerCase()}`,
                        });
                    }
                    for(let k = 0; k < 5; k++) {
                        crawl = await axios.get("http://localhost:5000/crawling");
                    }
                    setResult(prevResult => prevResult + crawl.data);
                    k++;
                    if (k === 15) {
                        break;
                    }
                }
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
                    <Box width='40rem' marginTop='10vh'>
                        <Flex gap='20px'>
                            <InputGroup>
                                <InputLeftAddon children='URL' />
                                <Input
                                    type='search'
                                    onChange={handleUrl}
                                    value={url}
                                    placeholder='Masukkan alamat'
                                    autoCapitalize='off'
                                    autoComplete='off'
                                    autoCorrect='off'
                                    spellCheck='false'
                                />
                            </InputGroup>
                            <Button
                                colorScheme='blue'
                                padding='10px 30px'
                                onClick={handleClick}
                                isDisabled={url.length === 0 ? true : false}
                                isLoading={isLoading}
                            >
                                CRAWL
                            </Button>
                        </Flex>
                        <Flex gap="20px" marginTop="20px" justifyContent="center">
                        <Button
                            colorScheme='red'
                            onClick={() => setResult("")}
                            isDisabled={result.length === 0 ? true : false}
                            isLoading={isLoading}
                        >
                            CLEAR RESULT
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={addKata}
                            isDisabled={result.length === 0 ? true : false}
                            isLoading={isLoading}
                        >
                            Tambah Kata
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={addKalimat}
                            isDisabled={result.length === 0 ? true : false}
                            isLoading={isLoading}
                        >
                            Tambah Kalimat
                        </Button>
                    </Flex>
                    </Box>
                    <Box
                        width='50rem'
                        marginTop='3rem'
                        padding='20px'
                        borderRadius='5px'
                    >
                        <Text fontSize='1.2rem'>Result : </Text>
                        <Box border="1px solid #ffffff20" minHeight='10px' padding="20px">{result}</Box>
                    </Box>
                    
                </Flex>
            </Box>
        </Layout>
    );
};

export default Crawling;
