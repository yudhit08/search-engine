import { Link, Navigate } from "react-router-dom";
import {
    Box,
    Flex,
    Image,
    Input,
    InputRightElement,
    InputGroup,
    Text,
} from "@chakra-ui/react";
import { MdSearch, MdPhotoCamera, MdMic } from "react-icons/md";
import News from "../components/News";
import Weather from "../components/Weather";
import Location from "../components/Location";

const Home = () => {
    return (
        <Box width='100vw'>
            <Weather />
            <Location />
            <Flex
                width='100%'
                align='center'
                position='absolute'
                zIndex='20'
                flexDirection='column'
                gap='3rem'
                marginTop='5rem'
                height='100%'
            >
                <Flex flexDirection='column' align='center' gap="20px">
                    <Box
                        width='8rem'
                        height='8rem'
                        borderRadius='50%'
                        overflow='hidden'
                    >
                        <Image src='profile.jpeg' height="100%" />
                    </Box>
                    <Text color='white' fontSize='2rem' fontWeight='bold'>
                        Yudhitya M. Renandra
                    </Text>
                </Flex>
                <InputGroup width='max-content'>
                    <Input
                        type='search'
                        backgroundColor='white'
                        height='3rem'
                        width={{ base: "80vw", md: "50vw", xl: "45vw" }}
                        borderRadius='10px'
                        placeholder='Search something'
                        paddingRight='8rem'
                    />
                    <Link to='/search' target="_blank">
                        <InputRightElement
                            children={<MdMic fontSize='1.5rem' />}
                            height='3rem'
                            cursor='pointer'
                            marginRight='5rem'
                        />
                        <InputRightElement
                            children={<MdPhotoCamera fontSize='1.5rem' />}
                            height='3rem'
                            cursor='pointer'
                            marginRight='2.5rem'
                        />
                        <InputRightElement
                            children={<MdSearch fontSize='1.5rem' />}
                            height='3rem'
                            cursor='pointer'
                        />
                    </Link>
                </InputGroup>
                <Box>
                    <News />
                </Box>
            </Flex>
            <Box
                //width='100vw'
                height='100vh'
                position='fixed'
                top='0'
            >
                <Image src='/background.jpg' height='100%' width='100vw' />
            </Box>
        </Box>
    );
};

export default Home;
