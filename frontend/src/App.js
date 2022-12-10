import React from "react";
import {Routes, Route} from 'react-router-dom'
import { ChakraProvider, theme } from "@chakra-ui/react";
import Home from "./Pages/Home";
import Scraping from "./Pages/Scraping";
import Search from "./Pages/Search";
import AddData from "./Pages/AddData";
import AddImage from "./Pages/AddImage";
import AddVideo from "./Pages/AddVideo";

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scraping" element={<Scraping />} />
                <Route path="/search" element={<Search />} />
                <Route path="/add-data" element={<AddData />} />
                <Route path="/add-image" element={<AddImage />} />
                <Route path="/add-video" element={<AddVideo />} />
            </Routes>
        </ChakraProvider>
    );
};

export default App;
