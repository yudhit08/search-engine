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
        "https://www.google.com/search?q=al+quran&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjPj6DR87v7AhXhWqQEHVNrBGEQ_AUoAXoECAEQAw&cshid=1668917951732625&biw=1366&bih=693&dpr=1"
    );
    const [alt, setAlt] = useState("");
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleUrl = (e) => {
        setUrl(e.target.value);
    };

    const forFunc = async (res) => {
        let urlVideo = "";
        //console.log(res.length)
        for (let i = 0; i < res.data.length; i++) {
            if (
                res.data[i + 1] === "h" &&
                res.data[i - 1] === "=" &&
                res.data[i - 2] === "c"
            ) {
                for (let j = i + 1; j < res.data.length; j++) {
                    if (res.data[j] === ">") {
                        break;
                    } else {
                        urlVideo += res.data[j];
                    }
                }
                //console.log(urlVideo);
                const imageInDb = await axios.get(
                    "http://localhost:5000/video"
                );
                console.log(res.alt);
                JSON.stringify(imageInDb).includes(urlVideo) === false &&
                    (await axios.post("http://localhost:5000/video", {
                        url: urlVideo,
                        alt: res.alt,
                    }));
                //console.log(res.setAlt)
                urlVideo = "";
                setIsLoading(true);
            }
            setIsLoading(false);
        }
    };

    const insertToDb = () => {
        console.log(result);
        result.map(async (res) => {
            await forFunc(res);
        });
    };

    const getVid = async () => {
        for (let i = 0; i < 26; i++) {
            let letter = (i + 10).toString(36);
            const getKata = await axios.get(`http://localhost:5000/kata`);
            const dataKata = getKata.data;
            let k = 0;
            //console.log(dataKata[0].kata[0])
            for (let j = 0; j < dataKata.length; j++) {
                if (dataKata[j].kata[0].toLowerCase() === letter) {
                    let crawl = "";
                    for (let l = 0; l < 10; l++) {
                        await axios.post(`http://localhost:5000/crawling`, {
                            url: `https://www.google.com/search?q=${dataKata[
                                j
                            ].kata.toLowerCase()}&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjPj6DR87v7AhXhWqQEHVNrBGEQ_AUoAXoECAEQAw&cshid=1668917951732625&biw=1366&bih=693&dpr=1`,
                        });
                    }

                    for (let l = 0; l < 10; l++) {
                        crawl = await axios.get(
                            "http://localhost:5000/crawling"
                        );
                    }
                    //console.log(crawl.data)

                    setResult((prevResult) => [
                        ...prevResult,
                        {
                            data: crawl.data,
                            alt: dataKata[j].kata.toLowerCase(),
                        },
                    ]);
                    console.log(dataKata[j].kata.toLowerCase());
                    k++;
                    if (k === 15) {
                        break;
                    }
                    console.log(k);
                }
            }
            //console.log(result)
            console.log(letter);
        }
        console.log(result.length);
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
                            {result.data}
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
