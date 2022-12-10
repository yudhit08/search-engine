import { useState, useEffect } from "react";
import { Box, Link } from "@chakra-ui/react";

const Weather = () => {
    const [weather, setWeather] = useState([]);

    const url =
        "http://dataservice.accuweather.com/currentconditions/v1/205619?apikey=3LP72HGFKcCx75E0fmN88Z8DuFNo3Rrm";

    const getWeather = () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setWeather(data));
    };

    useEffect(() => {
        getWeather();
        console.log(weather);
    }, []);

    return (
        <Box position='fixed' zIndex='99' top='30px' left='30px'>
            {weather.map((data) => {
                return (
                    <Link color='white' href={data.Link} target="_blank">
                        {data.WeatherText}, {data.Temperature.Metric.Value}{" "}
                        &deg;C
                    </Link>
                );
            })}
        </Box>
    );
};

export default Weather;
