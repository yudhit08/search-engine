import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

const Location = () => {
    const [weather, setWeather] = useState([]);

    const url =
        "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=3LP72HGFKcCx75E0fmN88Z8DuFNo3Rrm&q=pekanbaru";

    const getLocation = () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setWeather(data));
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <Box position='fixed' zIndex='10' top='30px' right='30px'>
            {weather.map((data) => {
                return (
                    <Box color='white'>
                        {data.LocalizedName},{" "}
                        {data.AdministrativeArea.LocalizedName}
                    </Box>
                );
            })}
        </Box>
    );
};

export default Location;
