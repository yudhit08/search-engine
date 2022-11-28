import { useEffect, useState } from "react";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";

const News = () => {
    const [news, setNews] = useState([]);

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const url = `https://newsapi.org/v2/top-headlines?q=world%20cup&from=${yyyy}-${mm}-${dd}&sortBy=popularity&pageSize=50&apiKey=cfd6e140ceda447ca638d6fa305e33a5`;

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setNews(data.articles));
    };

    return (
        <Box width='80vw' marginBottom='20rem' marginTop='5rem'>
            <Flex
                flexWrap='wrap'
                gap='20px'
                align='center'
                width='100%'
                justify='center'
            >
                {news.map((data) => {
                    const time = data.publishedAt.substring(11, 16);
                    return (
                        <Box
                            key={data.title}
                            width='20rem'
                            height='20rem'
                            borderRadius='10px'
                            overflow='hidden'
                        >
                            <Link href={data.url} target='_blank'>
                                <Box
                                    zIndex='10'
                                    position='absolute'
                                    padding='20px'
                                    width='20rem'
                                    background='linear-gradient(0deg, rgba(255,255,255,.9) 0%, rgba(255,255,255,.9) 30%, rgba(0,0,0,0) 70%)'
                                    height='20rem'
                                    borderRadius='10px'
                                    sx={{
                                        "&:hover": {
                                            textDecoration: "underline",
                                            background:
                                                "linear-gradient(0deg, rgba(255,255,255,.9) 0%, rgba(255,255,255,.9) 20%, rgba(255,255,255,.2) 100%)",
                                        },
                                    }}
                                >
                                    <Box
                                        position='relative'
                                        bottom='0'
                                        transform='translateY(60%)'
                                        height='100%'
                                    >
                                        <Box marginBottom='10px'>
                                            <Text
                                                fontSize='.8rem'
                                                opacity='.7'
                                                letterSpacing='.8px'
                                            >
                                                {data.source.name} | {time}
                                            </Text>
                                        </Box>
                                        <Text
                                            wordBreak='break-word'
                                            fontWeight='600'
                                            fontSize='1rem'
                                            letterSpacing='.5px'
                                        >
                                            {data.title}
                                        </Text>
                                    </Box>
                                </Box>
                                <Box height='100%'>
                                    <Image
                                        src={data.urlToImage}
                                        height='100%'
                                    />
                                </Box>
                            </Link>
                        </Box>
                    );
                })}
            </Flex>
        </Box>
    );
};

export default News;
