import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Text,
    Flex,
    Button,
    InputGroup,
    InputLeftAddon,
    Input,
    InputLeftElement,
    Textarea,
} from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import Layout from "../Layout/Layout";

const AddData = () => {
    const [char, setChar] = useState("");
    const [words, setWords] = useState([]);
    const [newKal, setNewKal] = useState("")
    const [selectedWord, setSelectedWord] = useState("");
    const [sentence, setSentence] = useState([]);

    const handleChange = (e) => {
        setChar(e);
    };

    const handleClick = async () => {
        setWords("");
        setSelectedWord("");
        setSentence([]);
        const kata = await axios.get(`http://localhost:5000/kata`);
        getWord(kata.data);
    };

    const getWord = async (data) => {
        setWords("");
        setSentence([]);
        setSelectedWord("");
        let j = 0;
        for (let i = 0; i < data.length; i++) {
            //console.log(data[i])
            let kata = data[i].kata.toUpperCase();
            let id = data[i].id;
            if (kata[0] === char) {
                setWords((prevWord) => [...prevWord, { kata, id }]);
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

    const getSentence = async () => {
        setSentence([]);
        const kalimat = await axios.get(`http://localhost:5000/kalimat`);
        const data = kalimat.data;
        let j = 0;
        for (let i = 0; i < data.length; i++) {
            let kalimat = data[i].kalimat.toUpperCase();
            let kalimatToArray = data[i].kalimat.split(" ");
            //console.log(kalimatToArray[0].toUpperCase())
            if (kalimatToArray[0].toUpperCase() === selectedWord) {
                setSentence((prevSentence) => [...prevSentence, kalimat]);
                j++;
                if (j === 10) {
                    break;
                }
            }
            // if (kalimat.includes(selectedWord)) {
            //     setSentence((prevSentence) => [...prevSentence, kalimat]);
            //     j++;
            //     if (j === 10) {
            //         break;
            //     }
            // }
        }
    };

    const deleteKata = async (id, kata) => {
        Swal.fire({
            title: `Apakah anda yakin ingin menghapus ${kata}?`,
            text: "Anda tidak akan bisa mengembalikannya!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5000/kata/${id}`);
                Swal.fire(
                    "Berhasil!",
                    `Kata ${kata} telah dihapus`,
                    "success"
                ).then((result) => {
                    if (result.isConfirmed) {
                        getWord();
                    }
                });
            }
        });
    };

    const updateKata = async (id, word) => {
        Swal.fire({
            title: "Masukkan kata baru",
            text: `Kata awal: ${word}`,
            input: "text",
            inputPlaceholder: "Kata baru",
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Ganti",
            cancelButtonText: "Batal",
            showLoaderOnConfirm: true,
            preConfirm: async (kata) => {
                try {
                    await axios.patch(
                        `http://localhost:5000/kata/${id}`, {
                            kata
                        }
                    );
                } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Kata ${word} berhasil diganti`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        getWord();
                    }
                });
            }
        });
    };

    const addKalimat = async () => {
        try {
            await axios.post(
                `http://localhost:5000/kalimat`, {
                    kalimat: newKal
                }
            );
            Swal.fire({
                title: `Kalimat berhasil ditambah`,
            })
        } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
        }
    }

    return (
        <Layout handleChange={handleChange} search={handleClick} value={char}>
            <Flex
                //flexDirection='column'
                //alignItems='center'
                justifyContent='center'
            >
                <Box width='40rem' marginTop='3rem' borderRadius='10px'>
                    <Text fontSize='1.2rem'>Kata</Text>
                    <Flex
                        // flexWrap='wrap'
                        gap='10px'
                        flexDirection='column'
                        padding='20px'
                        border='1px solid #ffffff20'
                        borderRadius='10px'
                    >
                        {words.length > 0 &&
                            words.map((word) => {
                                return (
                                    <Flex
                                        justifyContent='space-between'
                                        border='1px solid #ffffff30'
                                        padding='10px'
                                        alignItems='center'
                                        borderRadius='10px'
                                    >
                                        <Box
                                            key={word.id}
                                            cursor='pointer'
                                            onClick={() =>
                                                setSelectedWord(word.kata)
                                            }
                                            sx={{
                                                "&:hover": {
                                                    color: "blue.300",
                                                },
                                            }}
                                        >
                                            {word.kata}
                                        </Box>
                                        <Flex gap='20px'>
                                            <Box
                                                cursor='pointer'
                                                sx={{
                                                    "&:hover": {
                                                        color: "blue.600",
                                                    },
                                                }}
                                                onClick={() =>
                                                    updateKata(
                                                        word.id,
                                                        word.kata
                                                    )
                                                }
                                                color='blue.400'
                                                fontSize='20px'
                                            >
                                                <AiFillEdit />
                                            </Box>
                                            <Box
                                                cursor='pointer'
                                                sx={{
                                                    "&:hover": {
                                                        color: "red.600",
                                                    },
                                                }}
                                                onClick={() =>
                                                    deleteKata(
                                                        word.id,
                                                        word.kata
                                                    )
                                                }
                                                color='red.400'
                                                fontSize='20px'
                                            >
                                                <AiFillDelete />
                                            </Box>
                                        </Flex>
                                    </Flex>
                                );
                            })}
                    </Flex>
                    <Text fontSize='1rem' opacity='.5' fontStyle='italic'>
                        Jumlah: {words.length} kata
                    </Text>
                </Box>
                <Box width='40rem' marginTop='3rem' borderRadius='10px'>
                    <Box marginBottom='20px'>
                        <Text>Tambah Kalimat</Text>
                        <Textarea
                            onChange={(e) => setNewKal(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addKalimat()}
                            rows='10'
                        />
                    </Box>
                    <Text fontSize='1.2rem'>Kalimat</Text>
                    <Text fontSize='1rem' opacity='.5' fontStyle='italic'>
                        Jumlah: {sentence.length} kalimat
                    </Text>
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
                                >
                                    {kalimat}
                                </Box>
                            );
                        })}
                    </Flex>
                </Box>
            </Flex>
        </Layout>
    );
};

export default AddData;
