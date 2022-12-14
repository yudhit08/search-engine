import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Text,
    Flex,
    Image,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import Layout from "../Layout/Layout";

const Search = () => {
    const [char, setChar] = useState("");
    const [words, setWords] = useState([]);
    const [sentence, setSentence] = useState([]);
    const [informasi, setInformasi] = useState([]);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedWord, setSelectedWord] = useState("");
    const [selectedSentence, setSelectedSentence] = useState("");

    const handleChange = (e) => {
        setChar(e);
    };

    const handleClick = async () => {
        setWords("");
        setSelectedWord("");
        setSelectedSentence("");
        setSentence([]);
        setInformasi([]);
        setVideos([]);
        const kata = await axios.get(`http://localhost:5000/kata`);
        getWord(kata.data);
    };

    const getWord = (data) => {
        let j = 0;
        for (let i = 0; i < data.length; i++) {
            let kata = data[i].kata.toUpperCase();
            if (kata[0] === char) {
                setWords((prevWord) => [
                    ...prevWord,
                    {
                        label: kata.trim(),
                        value: kata.trim(),
                    },
                ]);
                j++;
                if (j === 15) {
                    break;
                }
            }
        }
    };

    useEffect(() => {
        getSentence();
    }, [selectedWord]);

    useEffect(() => {
        getInformasi();
    }, [selectedSentence]);

    const getSentence = async () => {
        setSentence([]);
        setInformasi([]);
        setImages([]);
        setVideos([]);
        const kalimat = await axios.get(`http://localhost:5000/kalimat`, {
            params: {
                kata: selectedWord
            }
        });
        const data = kalimat.data;
        let j = 0;
        for (let i = 0; i < data.length; i++) {
            let kalimat = data[i].kalimat.toUpperCase();
            let kalimatToArray = data[i].kalimat.split(" ");
            if (kalimatToArray[0].toUpperCase() === selectedWord) {
                setSentence((prevSentence) => [
                    ...prevSentence,
                    {
                        label: kalimat.trim(),
                        value: kalimat.trim(),
                    },
                ]);
                j++;
                if (j === 10) {
                    break;
                }
            }
        }
    };

    const getInformasi = async () => {
        setInformasi([]);
        setImages([]);
        setVideos([]);
        const informasi = await axios.get(`http://localhost:5000/kalimat`, {
            params: {
                kata: selectedWord
            }
        });
        const dataInformasi = informasi.data;
        for (let i = dataInformasi.length - 1; i > 0; i--) {
            const k = Math.floor(Math.random() * (i + 1));
            [dataInformasi[i], dataInformasi[k]] = [
                dataInformasi[k],
                dataInformasi[i],
            ];
        }
        let k = 0;
        for (let i = 0; i < dataInformasi.length; i++) {
            let kalimat = dataInformasi[i].kalimat.split(" ");
            for (let j = 0; j < kalimat.length; j++) {
                if ((kalimat[j].toUpperCase() === selectedWord) && selectedWord !== "") {
                    setInformasi((prevInformasi) => [...prevInformasi, dataInformasi[i].kalimat.toUpperCase()]);
                    k++;
                    break;
                }
            }
            if (k === 5) {
                break;
            }
        }

        const image = await axios.get("http://localhost:5000/image", {
            params: {
                alt: selectedSentence
            }
        });
        const dataImage = image.data;
        //console.log(dataImage);
        // let k = 0;

        for (let i = dataImage.length - 1; i > 0; i--) {
            const k = Math.floor(Math.random() * (i + 1));
            [dataImage[i], dataImage[k]] = [dataImage[k], dataImage[i]];
        }
        for (let i = 0; i < dataImage.length; i++) {
            if (dataImage[i].alt.toUpperCase() === selectedSentence) {
                setImages((prevImage) => [...prevImage, dataImage[i]]);
            }
        }

        const video = await axios.get("http://localhost:5000/video", {
            params: {
                alt: selectedSentence
            }
        });
        const dataVideo = video.data;
        //console.log(dataVideo)

        let l = 0;
        k = 0;
        for (let i = 0; i < dataVideo.length; i++) {
            if (
                dataVideo[i].alt.toLowerCase() ===
                selectedSentence.toLowerCase()
            ) {
                k++;
                if (k < 5) continue
                setVideos((prevVideos) => [...prevVideos, dataVideo[i]]);
                if (l === 5) {
                    break;
                }
                l++;
            }
        }
        // console.log(videos)
    };

    return (
        <Layout handleChange={handleChange} search={handleClick} value={char}>
            <Box
                padding='20px'
                overflow='hidden'
                maxWidth='100vw'
                minHeight='calc(100vh - 7rem)'
            >
                <Flex gap='20px' justify='space-between'>
                    <Box>
                        <Box width='50vw' borderRadius='10px' marginTop='20px'>
                            <Text>Kata</Text>
                            <Select
                                border='1px solid #00000020'
                                borderRadius='10px'
                                placeholder='Pilih Kata'
                                options={words}
                                size='xl'
                                onChange={(e) => setSelectedWord(e.value)}
                            />
                        </Box>
                        <Box width='50vw' borderRadius='10px' marginTop='20px'>
                            <Text>Kalimat</Text>
                            <Select
                                placeholder='Pilih Kalimat'
                                border='1px solid #00000020'
                                borderRadius='10px'
                                options={sentence}
                                size='xl'
                                onChange={(e) => setSelectedSentence(e.value)}
                            />
                        </Box>
                        <Box width='50vw' borderRadius='10px' marginTop='20px'>
                            <Text>Informasi</Text>
                            <Flex
                                flexWrap='wrap'
                                gap='10px'
                                padding='20px'
                                border='1px solid #00000020'
                                borderRadius='10px'
                                align='left'
                                justify='left'
                            >
                                {selectedSentence !== "" &&
                                    informasi.map((info) => {
                                        return (
                                            <Box key={info} textAlign='left'>
                                                {info}
                                            </Box>
                                        );
                                    })}
                            </Flex>
                        </Box>
                    </Box>

                    <Box width='45%' padding='10px'>
                        <Tabs variant='enclosed'>
                            <TabList>
                                <Tab>Images</Tab>
                                <Tab>Videos</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Flex
                                        flexWrap='wrap'
                                        gap='10px'
                                        marginBottom='20px'
                                    >
                                        {selectedSentence !== "" &&
                                            images.map((image) => {
                                                return (
                                                    <Image
                                                        key={image.id}
                                                        src={image.url}
                                                        width='170px'
                                                    />
                                                );
                                            })}
                                    </Flex>
                                </TabPanel>
                                <TabPanel>
                                    <Flex
                                        flexDirection='column'
                                        gap='10px'
                                    >
                                        {selectedSentence !== "" &&
                                            videos.map((video, i) => {
                                                //console.log(video.url)
                                                return (
                                                    <Box key={i}>
                                                        <iframe
                                                            width='100%'
                                                            height='300'
                                                            src={`https://www.youtube.com/embed/${video.url}`}
                                                            frameBorder='0'
                                                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                            allowFullScreen
                                                            title='informasi video'
                                                        />
                                                    </Box>
                                                );
                                            })}
                                    </Flex>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Flex>
            </Box>
        </Layout>
    );
};

export default Search;
