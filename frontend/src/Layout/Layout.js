import { Box } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const Layout = ({children}) => {
    return (
        <Box>
            <ColorModeSwitcher position='fixed' top='20px' right='20px' zIndex="99" />
            <Box>{children}</Box>
        </Box>
    );
};

export default Layout;
