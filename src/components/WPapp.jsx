import React from "react";
import "../styles/weather-app.css";

import Header from "./sections/Header.jsx";
import Now from "./sections/Now.jsx";
import Footer from "./sections/Footer.jsx"

export default function WPWeather() {
    //Default Coordinates for a location prestored
    const [selectedCoordinates, setXY] = React.useState({
        y: "35",
        x: "134",
    });
    
    //Runs this only after Rendering the App [Header, Now, Footer] (useEffect)
    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setXY(() => {
                return {
                    y: pos.coords.latitude,
                    x: pos.coords.longitude,
                }
            })
        })
    }, [])
        
    return (
        <div id="WPComponent">
            <Header getCity={setXY}/>
            <Now cityData={selectedCoordinates}/>
            <Footer />
        </div>
    )
}