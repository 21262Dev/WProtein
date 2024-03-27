import React from "react";

import "../../styles/weather-app.css";

import getCities from "../../functions/favoCities.js";

export default function Header(props) {
    const [loc, doc_oc] = React.useState("Set Location"); //Location Name, Set Location Name
    const months = [
        {name: "Jan"},
        {name:"Feb"},
        {name:"March"},
        {name:"April"},
        {name:"May"},
        {name:"June"},
        {name:"July"},
        {name:"Aug"},
        {name:"Sept"},
        {name:"Nov"},
        {name:"Oct"},
        {name:"Dec"}
    ];
    
    for (let i = 0; i < months.length; i++) {
        months[i].index = i; //Running a loop and set Index of Months to detect them
    }

    //Present Dates and Month
    const getADate = new Date();
    const currentMonth = getADate.getMonth();
    //State of time displayed in Top Right
    let [time, changeTime] = React.useState(getADate.getHours() + ":" + getADate.getMinutes());    
    
    //Change Time every 60 seconds
    React.useEffect(() => {
        window.setTimeout(() => {
            document.getElementById("time-elem--react").style.animation = "timeAnim 0.45s cubic-bezier(0,0.6,0.99,0.1)";
            window.setTimeout(() => {
                document.getElementById("time-elem--react").style.animation = "";
            }, 1000);

            changeTime(() => {
                return new Date().getHours() + ":" + new Date().getMinutes();
            })
        }, 60000);
    },[time]);

    let [favCities, updateCities] = React.useState(getCities()); //Set the array of objects [FavoriteCities] equal to data transmitted by the getCities function
    //Refer to favoCities.js in functions

    //Set Month name by finding Month index in Date API
    const monthName = months.find((monolith) => {
        if (monolith.index === parseInt(currentMonth)) {
            return monolith;
        }
    })

    
    function chooseLocation(event) {
        const {target} = event;
        
        target.style.animation = "choosingLocation 0.35s linear";
        target.style.animationFillMode = "forwards";
       
        document.querySelector(".set-location-div").style.display = "block";

        target.style.animation = "none";
        target.style.animation = "opacer 0.35s linear";
        setTimeout(() => {
            target.style.animation = "none";
        }, 300)
    }

    let searchingForCity;
    let [cityResults, setResults] = React.useState("Error");

    const searchForCities = (event) => {
        const searchBTN = document.getElementById("search-start-btn");
        searchingForCity = event.target.value;

        if (searchingForCity.length > 2) {
            searchBTN.onclick = () => {
                fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchingForCity}&count=10&language=en&format=json`)
                .then((res) => res.json()).then((data) => {
                    if (data.results.length > 0) {
                        setResults(() => {
                            return data;
                        });
                    } else {
                        setResults(() => {
                            return "Error";
                        });
                    }
                })
            };
        }
    };

    let SearchResultsComponent = () => {
        return (cityResults.results.map((city) => {
            return (<div key={city.id} className="city-result" onClick={() => {
                doc_oc(() => city.name); //Set City name if Clicked
                props.getCity({y: city.latitude, x: city.longitude});
            }}>
                <h3>{city.name}</h3>
                <p>- {city.country}, {city.admin1}</p>
                <span className="material-symbols-outlined ease-bar-icons" style={{marginLeft: "auto"}} onClick={(event) => {                  
                  updateCities(() => {
                        return getCities(true, city.latitude, city.longitude, city.name);
                   });
                }}>favorite</span>
            </div>)
        }));
    };
    return (
        <>
            <div className="top-grid">
                <div className="left-section">
                    <p className="middle-weight">{`${getADate.getDate()} ${monthName.name} ${getADate.getFullYear()}`}</p>
                    <h4 className="middle-weight" id="location-text" onClick={chooseLocation}><span className="material-symbols-outlined">location_on</span>{loc}</h4>
                </div>
                <div className="right-section">
                    <p style={{fontSize: "1.5em", color: "var(--white)", fontWeight: "600"}} id="time-elem--react">{time}</p>
                </div> 
            </div>
            <div className="middle-grid">
                <span className="material-symbols-outlined ease-bar-icons" id="fav-btn" onClick={() => {
                    localStorage.clear();
                }}>favorite</span>
                <p style={{marginLeft: "0.2em"}}>-</p>
                {
                    favCities.map((city) => {
                        return <div key={Math.random() * city.x} onClick={() => {
                            doc_oc(() => city.name);
                            props.getCity({y: city.y, x: city.x});
                        }}className="favorite-city">
                            <p>{city.name}</p>
                        </div>
                    })
                }
            </div>
            <div>
                <div className="set-location-div">
                    <div className="top-section">
                        <input type="text" placeholder="Search for city"id="search-bar" value={searchingForCity} onInput={searchForCities}/>
                        <span className="material-symbols-outlined" id="search-start-btn">search</span>
                    </div>
                    <h3><span className="closebtn material-symbols-outlined" onClick={() => {
                        document.querySelector(".set-location-div").style.display = "none";
                    }}>disabled_by_default</span></h3>
                    <div className="bottom-section">
                        {
                            cityResults !== "Error"
                            &&
                            <SearchResultsComponent />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
