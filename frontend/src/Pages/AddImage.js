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

const AddImage = () => {
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

    const forFunc = async (res, alt) => {
        let urlPics = "";
        //console.log(res.length)
        for (let i = 0; i < res.length; i++) {
            if (
                res[i + 1] === "h" &&
                res[i - 1] === "=" &&
                res[i - 2] === "c"
            ) {
                for (let j = i + 1; j < res.length; j++) {
                    if (res[j] === ">") {
                        break;
                    } else {
                        urlPics += res[j];
                    }
                }
                //console.log(urlPics);
                await axios.post("http://localhost:5000/image", {
                        url: urlPics,
                        alt: alt,
                });
                //console.log(res.setAlt)
                urlPics = "";
            }
        }
    };
    
    const insertToDb = () => {
        console.log(result);
        result.map(async (res) => {
            await forFunc(res);
        });
    };

    const getImg = async () => {
        setResult([])
        for (let i = 13; i < 14; i++) {
            let letter = (i + 10).toString(36);
            const getKata = await axios.get(`http://localhost:5000/kata`);
            const dataKata = getKata.data;
            let k = 0;
            //console.log(dataKata[0].kata[0])
            for (let j = 0; j < dataKata.length; j++) {
                if (dataKata[j].kata[0].toLowerCase() === letter) {
                    const getKalimat = await axios.get(
                        "http://localhost:5000/kalimat", {
                            params: {
                                kata: dataKata[j].kata
                            }
                        }
                    );
                    const dataKalimat = getKalimat.data;
                    let n = 0;
                    for (let l = 0; l < dataKalimat.length; l++) {
                        let kalimat = dataKalimat[l].kalimat.split(" ");
                        if (kalimat[0].toLowerCase() === dataKata[j].kata.toLowerCase()) {
                            let crawl= "";

                            do {
                                //console.log(crawl.data)
                                await axios.post(
                                    `http://localhost:5000/scraping`,
                                    {
                                        url: `https://www.google.com/search?q=${encodeURI(dataKalimat[
                                            l
                                        ].kalimat.toLowerCase())}&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjPj6DR87v7AhXhWqQEHVNrBGEQ_AUoAXoECAEQAw&cshid=1668917951732625&biw=1366&bih=693&dpr=1`,
                                    }
                                );
                                crawl = await axios.get("http://localhost:5000/scraping")
                            } while (crawl.data === "" || crawl.data === undefined);
                            do {
                                //console.log(crawl.data)
                                await axios.post(
                                    `http://localhost:5000/scraping`,
                                    {
                                        url: `https://www.google.com/search?q=${encodeURI(dataKalimat[
                                            l
                                        ].kalimat.toLowerCase())}&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjPj6DR87v7AhXhWqQEHVNrBGEQ_AUoAXoECAEQAw&cshid=1668917951732625&biw=1366&bih=693&dpr=1`,
                                    }
                                );
                                crawl = await axios.get("http://localhost:5000/scraping")
                            } while (crawl.data === "" || crawl.data === undefined);
                            do {
                                //console.log(crawl.data)
                                await axios.post(
                                    `http://localhost:5000/scraping`,
                                    {
                                        url: `https://www.google.com/search?q=${encodeURI(dataKalimat[
                                            l
                                        ].kalimat.toLowerCase())}&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjPj6DR87v7AhXhWqQEHVNrBGEQ_AUoAXoECAEQAw&cshid=1668917951732625&biw=1366&bih=693&dpr=1`,
                                    }
                                );
                                crawl = await axios.get("http://localhost:5000/scraping")
                            } while (crawl.data === "" || crawl.data === undefined);
                            // setResult((prevResult) => [
                            //     ...prevResult,
                            //     {
                            //         data: crawl.data,
                            //         alt: dataKalimat[l].kalimat.toLowerCase(),
                            //     },
                            // ]);

                            //await forFunc(crawl.data, dataKalimat[l].kalimat.toLowerCase())

                            console.log("Kata: ",dataKata[j].kata);
                            console.log("Kalimat: ",dataKalimat[l].kalimat);
                            console.log(crawl.data)
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
        }
    };

    return (
        <>
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
                                onClick={getImg}
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
        </>
    );
};

export default AddImage;
