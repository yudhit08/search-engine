import { Box } from "@chakra-ui/react";
import Header from "../components/Header";

const Layout = ({children, handleChange, search, value}) => {
    return (
        <Box>
            <Header handleChange={handleChange} search={search} value={value}/>
            <Box marginTop="7rem" minHeight="calc(100vh - 7rem)">{children}</Box>
        </Box>
    );
};

export default Layout;
