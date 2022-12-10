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

const AddVideo = () => {
    // const [url, setUrl] = useState("https://id.wikipedia.org/wiki/");
    const [url, setUrl] = useState(
        "https://www.youtube.com/results?search_query="
    );
    const [alt, setAlt] = useState("");
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleUrl = (e) => {
        setUrl(e.target.value);
    };

    const forFunc = async (res, alt) => {
        //console.log(res.data)
        let urlVideo = res.split(" ");
        for (let i = 0; i < urlVideo.length; i++) {
            // const videoInDb = await axios.get("http://localhost:5000/video")
            // JSON.stringify(videoInDb).includes(urlVideo[i]) === false &&
            urlVideo[i] !== "" &&
                (await axios.post("http://localhost:5000/video", {
                    url: urlVideo[i],
                    alt: alt,
                }));
            //console.log(res.setAlt)
        }
    };
    
    const insertToDb = () => {
        console.log(result);
        result.map(async (res) => {
            await forFunc(res);
        });
    };

    const getVid = async () => {
        setResult([])
        for (let i = 13; i < 14; i++) {
            let letter = (i + 10).toString(36);
            const getKata = await axios.get(`http://localhost:5000/kata`);
            const dataKata = getKata.data;
            let k = 0;
            //console.log(dataKata[0].kata[0])
            for (let j = 0; j < dataKata.length; j++) {
                if (dataKata[j].kata[0].toLowerCase() === letter) {
                    const getKalimat = await axios.get('http://localhost:5000/kalimat');
                    const dataKalimat = getKalimat.data
                    let n = 0;
                    for (let l = 0; l < dataKalimat.length; l++) {
                        let kalimat = dataKalimat[l].kalimat.split(" ")
                        if(kalimat[0].toLowerCase() === dataKata[j].kata.toLowerCase() && k > 10) {
                            let crawl = "";

                            do {
                                await axios.post(
                                    `http://localhost:5000/yt-scraping`,
                                    {
                                        query: `${dataKalimat[
                                            l
                                        ].kalimat.toLowerCase()}`,
                                    }
                                );
                                crawl = await axios.get(
                                    "http://localhost:5000/yt-scraping"
                                );
                            } while (crawl.data === "");
                            
        
                            // setResult((prevResult) => [
                            //     ...prevResult,
                            //     {
                            //         data: crawl.data,
                            //         alt: dataKalimat[l].kalimat.toLowerCase(),
                            //     },
                            // ]);

                            await forFunc(crawl.data, dataKalimat[l].kalimat.toLowerCase())

                            console.log("Kata: ",k);
                            console.log("Kalimat: ",n);
                            console.log(dataKalimat[l].kalimat.toLowerCase())
                            n++;
                            if (n === 10) {
                                break;
                            }
                        }
                    }
                    k++;
                    if (k === 15) {
                        break;
                    }
                }
            }
            //console.log(result)
            //console.log(letter);
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
                        <Flex gap='20px' flexDirection='column'>
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
                            <InputGroup>
                                <InputLeftAddon children='ALT' />
                                <Input
                                    type='search'
                                    onChange={(e) => setAlt(e.target.value)}
                                    value={alt}
                                    placeholder='Masukkan alt'
                                    autoCapitalize='off'
                                    autoComplete='off'
                                    autoCorrect='off'
                                    spellCheck='false'
                                />
                            </InputGroup>
                            <Button
                                colorScheme='blue'
                                padding='10px 30px'
                                onClick={getVid}
                                isDisabled={url.length === 0 ? true : false}
                                isLoading={isLoading}
                            >
                                Search
                            </Button>
                            <Button
                                colorScheme='blue'
                                onClick={insertToDb}
                                //isDisabled={result.length === 0 ? true : false}
                                isLoading={isLoading}
                            >
                                ADD URL
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
                        <Box
                            border='1px solid #ffffff20'
                            minHeight='10px'
                            padding='20px'
                        >
                            {/* {result[0].data} */}
                        </Box>
                    </Box>
                    <Flex gap='20px'>
                        <Button
                            colorScheme='red'
                            onClick={() => setResult("")}
                            //isDisabled={result.length === 0 ? true : false}
                            isLoading={isLoading}
                        >
                            CLEAR RESULT
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </Layout>
    );
};

export default AddVideo;
