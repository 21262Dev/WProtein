import React from "react";

import "../../styles/weather-cards.css"

import sunnyDay from '../../icons/Day/sunny-icon.png';
import drizzleDay from "../../icons/Day/drizzle-icon.png";
import overcastDay from "../../icons/Day/cloudy-icon.png";
import halfSunnyDay from "../../icons/Day/cloudy-sunny-icon.png";
import rainyDay from "../../icons/Day/cloudy-rainy-day-icon.png";
import thunderDay from "../../icons/Day/thunderstorm-day-icon.png"

import clearNight from "../../icons/Night/night-moon-icon.png"
import drizzleNight from "../../icons/Night/drizzle-icon.png";
import thunderNight from "../../icons/Night/thunderstorm-night-icon.png"
import rainyNight from "../../icons/Night/cloudy-rainy-night-icon.png";

import foggyDay from "../../icons/fog-icon.png";
import snowyDay from "../../icons/snow-icon.png";
import showersDay from "../../icons/shower-icon.png";
import blizzardDay from "../../icons/blizzard-icon.png";

import windSpeedIcon from "../../icons/wind-speed-icon.png"
import UVIcon from "../../icons/uv-icon.png"
import PPIcon from "../../icons/pp-icon.png"
import cloudcoverIcon from "../../icons/cloud-cover.png"
import cold from "../../icons/cold-temperature.png"
import hot from "../../icons/hot-temperature.png"
import hotClouds from "../../icons/hot-clouds.png"
import coldClouds from "../../icons/cold-clouds.png"

import HourlyWBar from "./Hourly";
export default function WeatherMiddle(props) {
    let [weather, setWeather] = React.useState("");
    async function provideData(coordinates) {
        const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.y}&longitude=${coordinates.x}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weathercode,cloudcover,visibility,windspeed_120m,winddirection_120m,windgusts_10m,temperature_180m,soil_temperature_18cm,soil_moisture_9_27cm,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,rain_sum,precipitation_hours,precipitation_probability_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto`);
        
        const weatherData = await data.json();
        setWeather(() => {
            return weatherData;
        });
    }

    React.useEffect(() => {
        provideData(props.cityData); // Fetch data from API by passing the coordinates
    }, [props.cityData]);

    let celciusStlings = {
        fontSize: "0.7em",
        fontWeight: "400",
        color: "var(--selective-yellow)",
    };

    let [nowIcon, setNowIcon] = React.useState([sunnyDay]);
    let [futureIcons, setFutureIcons] = React.useState([]);
    
    const [majorThreeDays, setMajorThreeDays] = React.useState([]);

    const [weatherStatus, setWeatherStatus] = React.useState("");
    let weatherANDIcondata = [
        {
            numbers: [0, 1],
            icon: sunnyDay,
            iconCold: cold,
            iconHot: hot,
            iconNight: clearNight,
            status: ["Sunny", "Clear Night"]
        }, 
        {
            numbers: [2],
            iconHot: hotClouds,
            icon: halfSunnyDay,
            iconCold: coldClouds,
            iconNight: clearNight,
            status: ["Partly Cloudy", "Partly Cloudy"]
        },
        {
            numbers: [3],
            icon: overcastDay,
            iconHot: hotClouds,
            iconCold: coldClouds,
            iconNight: overcastDay,
            status: ["Very Cloudy", "Cloudy Night"]
        },
        {
            numbers: [45, 48],
            icon: foggyDay,
            iconCold: foggyDay,
            iconHot: foggyDay,
            iconNight: foggyDay,
            status: ["Foggy", "Don't Drive"]
        },
        {
            numbers: [51, 53, 55, 56, 57],
            icon: drizzleDay,
            iconHot: drizzleDay,
            iconCold: drizzleDay,
            iconNight: drizzleNight,
            status: ["Drizzly Day", "Drizzly Night"]
        },
        {
            numbers: [61, 63, 65, 66, 67],
            icon: rainyDay,
            iconHot: rainyDay,
            iconCold: rainyDay,
            iconNight: rainyNight,
            status: ["Raining :O", "Rainy Night"]
        },
        {
            numbers: [71, 73, 75, 77],
            icon: snowyDay,
            iconHot: snowyDay,
            iconCold: snowyDay,
            iconNight: snowyDay,
            status: ["Snowy", "Icey"]
        },
        {
            numbers: [80,81,82],
            icon: showersDay,
            iconHot: showersDay,
            iconCold: showersDay,
            iconNight: showersDay,
            status: ["Rain Showers", "Light Rain"]
        },
        {
            numbers: [85, 86],
            icon: blizzardDay,
            iconHot: blizzardDay,
            iconCold: blizzardDay,
            iconNight: blizzardDay,
            status: ["Severe Snowstorm", "Night Snowstorm"]
        },
        {
            numbers: [95, 96, 99],
            icon: thunderDay,
            iconHot: thunderDay,
            iconCold: thunderDay,
            iconNight: thunderNight,
            status: ["Thunderstorm⚡", "Thunderstorm!"]
        }
    ];
    let selectedLocationTimezone = new Date().getUTCHours();

    if (new Date().getUTCHours() <= 12) {
        let seconds = ((new Date().getUTCHours() * 60) * 60) + weather.utc_offset_seconds;
        selectedLocationTimezone = Math.abs(Math.round(((seconds / 60) / 60)));
    } else if (new Date().getUTCHours() > 12 && new Date().getUTCHours() <= 24) {
        let seconds = (((new Date().getUTCHours() - 12) * 60) * 60) + weather.utc_offset_seconds;
        selectedLocationTimezone = Math.abs(Math.round(((seconds / 60) / 60)) + 12); 
    }
 
    function newFunc(wp, i) {
        if (wp.numbers.includes(weather.hourly.weathercode[selectedLocationTimezone + i])) {
            let newestIcon;
           
            if (selectedLocationTimezone > 17 && selectedLocationTimezone < 26) {
                let currentS = selectedLocationTimezone + i;
                currentS =  currentS - 24;                

                if (currentS < 5) {
                    if (weather.hourly.temperature_2m[24 + currentS] <= 5) {
                        newestIcon = wp.iconCold;
                    } else if (weather.hourly.temperature_2m[24 + currentS] >= 40) {
                        newestIcon = wp.iconHot;
                    } else if (weather.hourly.temperature_2m[24 + currentS] < 40 &&
                        weather.hourly.temperature_2m[24 + currentS] > 5){
                        newestIcon = wp.iconNight;
                    }
                } else if (currentS >= 5) {
                    if (weather.hourly.temperature_2m[24 + currentS] <= 5) {
                        newestIcon = wp.iconCold;
                    } else if (weather.hourly.temperature_2m[24 + currentS] >= 40) {
                        newestIcon = wp.iconHot;
                    } else if (weather.hourly.temperature_2m[24 + currentS] < 40 &&
                        weather.hourly.temperature_2m[24 + currentS] > 5){
                        newestIcon = wp.icon;
                    }
                }
            } else {
                if (selectedLocationTimezone + i > 0 && selectedLocationTimezone + i < 5 || 
                    selectedLocationTimezone + i > 17 || selectedLocationTimezone + i === 24) {                          
                        if (weather.hourly.temperature_2m[selectedLocationTimezone + i] <= 5) {
                            newestIcon = wp.iconCold;
                        } else if (weather.hourly.temperature_2m[selectedLocationTimezone + i] >= 40) {
                            newestIcon = wp.iconHot;
                        } else if (weather.hourly.temperature_2m[selectedLocationTimezone + i] < 40 &&
                            weather.hourly.temperature_2m[selectedLocationTimezone + i] > 5){
                            newestIcon = wp.iconNight;
                        }
                } else {
                    if (weather.hourly.temperature_2m[selectedLocationTimezone + i] <= 5 || weather.hourly.temperature_2m[selectedLocationTimezone + i] === 5) {
                        newestIcon = wp.iconCold;
                    } else if (weather.hourly.temperature_2m[selectedLocationTimezone + i] >= 40 || weather.hourly.temperature_2m[selectedLocationTimezone + i] === 40) {
                        newestIcon = wp.iconHot;
                    } else if (weather.hourly.temperature_2m[selectedLocationTimezone + i] < 40 &&
                        weather.hourly.temperature_2m[selectedLocationTimezone + i] > 5) {
                        newestIcon = wp.icon;
                    }
                }
            } 
                        
            setFutureIcons((prev) => {
                return [...prev, newestIcon];
            })        
                
        } 
    }
    
    React.useEffect(() => {
        if (typeof weather === "object") {
            setMajorThreeDays(() => {
                return [futureIcons[3], futureIcons[8]];
            })
        }
    }, [futureIcons]);

    React.useEffect(() => {
        if (typeof weather === "object") {
            weatherANDIcondata.map((wp) => {
                if (wp.numbers.includes(weather.current_weather.weathercode)) {
                    if (weather.current_weather.is_day != 0) {
                        if (weather.current_weather.temperature < 5) {
                            setNowIcon(() => {
                                return wp.iconCold;
                            }) 
                                
                            setWeatherStatus(() => {
                                return wp.status[0];
                            })
                        } else if (weather.current_weather.temperature < 38 && weather.current_weather.temperature > 5) {
                            setNowIcon(() => {
                                return wp.icon;
                            }) 
                            
                            setWeatherStatus(() => {
                                return wp.status[0];
                            })
                        } else if(weather.current_weather.temperature > 38) {
                            setNowIcon(() => {
                                return wp.iconHot;
                            }) 
                                
                            setWeatherStatus(() => {
                                return wp.status[0];
                            })
                        } 
                    } else if (weather.current_weather.is_day == 0){
                        if (weather.current_weather.temperature < 5) {
                            setNowIcon(() => {
                                return wp.iconCold;
                            }) 
                                
                            setWeatherStatus(() => {
                                return wp.status[0];
                            })
                        } else if (weather.current_weather.temperature < 38 && weather.current_weather.temperature > 5) {
                            setNowIcon(() => {
                                return wp.iconNight;
                            }) 
                            
                            setWeatherStatus(() => {
                                return wp.status[1];
                            })
                        } else if(weather.current_weather.temperature > 38) {
                            setNowIcon(() => {
                                return wp.iconHot;
                            }) 
                                
                            setWeatherStatus(() => {
                                return wp.status[0];
                            })
                        } 
                    }
                }                
            })
        }
    }, [weather, props.cityData]);

    React.useEffect(() => {
        if (typeof weather === "object") {
            for (let i = 1; i < 10; i++) {
                weatherANDIcondata.map((wp) => {
                    newFunc(wp, i);  
                });
            }
        }

        return () => {
            setFutureIcons(() => {
                return [];
            })
        }
    }, [weather, props.cityData]);

    return (
        (typeof weather === "object" && 
        <>
            <div className="top-weather-bar">
                <div className="weather-card">
                    <div className="right-side">
                        <img src={nowIcon} width={100 + "%"} style={{maxWidth: "100px"}}/>
                    </div>
                    <div className="left-side">
                        <p>Now</p>
                        <h2 style={{fontSize: "2em"}}>{Math.round(weather.current_weather.temperature)}<span style={celciusStlings}><sup>°C</sup></span></h2>
                        <p style={{fontSize: "0.7em"}}>Feels like <span className="yellow-txt">{weather.hourly.apparent_temperature[selectedLocationTimezone]}</span><sup className="supped">°C</sup><br /></p>
                        <p style={{fontSize: "0.7em", lineHeight: "1.2em"}}>{weatherStatus}</p>
                    </div>
                </div>
                <div className="flex-box-minor-wps">
                    <div className="bar">
                        <div className="bar-flex" style={{filter: "hue-rotate(320deg)"}}>
                            <img src={PPIcon} width={20}/>
                            <p style={{fontSize: "0.7em"}}>{weather.hourly.precipitation_probability[selectedLocationTimezone]}%</p>
                        </div>
                        <div className="bar-flex" style={{filter: "hue-rotate(310deg)"}}>
                            <img src={cloudcoverIcon} width={20}/>
                            <p style={{fontSize: "0.7em"}}>{weather.hourly.cloudcover[selectedLocationTimezone]}%</p>
                        </div>
                        <div className="bar-flex" style={{filter: "hue-rotate(300deg)"}}>
                            <img src={UVIcon} width={20}/>
                            <p style={{fontSize: "0.7em"}}>{weather.hourly.uv_index[selectedLocationTimezone]} / 10</p>
                        </div>
                        <div className="bar-flex" style={{filter: "hue-rotate(290deg)"}}>
                            <img src={windSpeedIcon} width={20}/>
                            <p style={{fontSize: "0.7em"}}>{weather.current_weather.windspeed} kmph</p>
                        </div>
                        
                    </div>
                </div>
                <HourlyWBar rainChance={weather.hourly.precipitation_probability} weatther={weather.hourly.temperature_2m} futureicons={futureIcons} currenthour={selectedLocationTimezone}/>
                <div className="three-day-panel">
                <div id="today-spec" className="a">
                    <h4>Today</h4>
                    <p>(Average)</p>
                    <img src={majorThreeDays[0]} width={60 + "%"}/>
                    <h2>{Math.round((weather.hourly.apparent_temperature.reduce((init, temp, index) => {
                        return index < 25 ? init + temp : init + 0
                    },0)) / 24)}<sup style={{fontSize: "0.7em", color: "var(--selective-yellow)"}}>°C</sup></h2>
                    <div className="chance">
                        <img src={PPIcon} width={20}/>
                        <p>{Math.round((weather.hourly.precipitation_probability.reduce((init, chance, index) => {
                            return index < 25 ? index + chance : init + 0
                        },0)) / 24)}%</p>
                    </div>
                    <br />
                </div>
                <div id="tommorow-spec" className="a">
                    <h4>Tomorrow</h4>
                    <p>(Average)</p>
                    <img src={majorThreeDays[1]} width={60 + "%"}/>
                    <h2>{Math.round((weather.hourly.apparent_temperature.reduce((init, temp, index) => {
                        return index > 24 && index < 49 ? init + temp : init + 0
                    },0)) / 24)}<sup style={{fontSize: "0.7em", color: "var(--selective-yellow)"}}>°C</sup></h2>
                    <div className="chance">
                        <img src={PPIcon} width={20}/>
                        <p>{Math.round((weather.hourly.precipitation_probability.reduce((init, chance, index) => {
                            return index < 25 ? index + chance : init + 0
                        },0)) / 24)}%</p>
                    </div>
                    <br />
                </div>
             </div>
            </div>
            <div className="other-facts">
                <div className="fact" id="time">
                    <div className="cover">
                        <h4 className="ex-font">Timezone</h4>
                        <p>{weather.timezone_abbreviation}</p>
                    </div>
                </div>
                <div className="fact" id="fog">
                    <div className="cover">
                        <h4 className="ex-font">Visibility</h4>
                        <p>{weather.hourly.visibility[selectedLocationTimezone] / 1000}km</p>
                    </div>
                </div>
                <div className="fact" id="soil">
                    <div className="cover">
                        <h4 className="ex-font">Soil Temp..</h4>
                        <p>{weather.hourly.soil_temperature_18cm[selectedLocationTimezone]}<sup>°C</sup></p>
                    </div>
                </div>
                <div className="fact" id="polar">
                    <div className="cover">
                        <h4 className="ex-font">Wind Gusts</h4>
                        <p>{weather.hourly.windgusts_10m[selectedLocationTimezone]}km/hr</p>
                    </div>
                </div>
            </div>
        </>)
    )
}
