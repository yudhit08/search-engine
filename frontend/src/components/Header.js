import {
    Box,
    Flex,
    InputGroup,
    Input,
    InputRightElement,
    Text,
} from "@chakra-ui/react";
import { MdMic, MdPhotoCamera, MdSearch } from "react-icons/md";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const Header = ({handleChange, search, value}) => {
    return (
        <Box
            position='fixed'
            top='0'
            height='7rem'
            zIndex='99'
            width='100vw'
            padding='20px'
            backgroundColor='white'
            boxShadow="3px 3px 10px #00000030"
        >
            <Flex
                align='center'
                justify='space-between'
                width='100%'
                height='100%'
            >
                <Flex align='center' gap='20px' width='100%' height='100%'>
                    <Box>
                        <Text fontSize='1.3rem' fontWeight='600' letterSpacing="1px">
                            Y_Search
                        </Text>
                    </Box>
                    <InputGroup width='max-content'>
                        <Input
                            backgroundColor='white'
                            height='3rem'
                            width={{ base: "80vw", md: "50vw", xl: "51vw" }}
                            borderRadius='20px'
                            placeholder='Search something'
                            paddingRight='8rem'
                            onChange={(e) => handleChange(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === "Enter" && search()}
                            value={value}
                            maxLength={1}
                        />

                            <InputRightElement
                                children={<MdMic fontSize='1.5rem' />}
                                height='3rem'
                                cursor='pointer'
                                marginRight='5rem'
                                onClick={() => search()}
                            />
                            <InputRightElement
                                children={<MdPhotoCamera fontSize='1.5rem' />}
                                height='3rem'
                                cursor='pointer'
                                marginRight='2.5rem'
                                onClick={() => search()}
                            />
                            <InputRightElement
                                children={<MdSearch fontSize='1.5rem' />}
                                height='3rem'
                                cursor='pointer'
                                onClick={() => search()}
                            />
                    </InputGroup>
                </Flex>
                <Box>
                {/* <ColorModeSwitcher /> */}
                </Box>
            </Flex>
        </Box>
    );
};

export default Header;
