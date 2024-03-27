export default function getCities(setting = false, y, x, name) {
    if (!setting) {
        //If there are favo Cities already then
        if (localStorage.getItem("storedCities")) {
            const favCities = localStorage.getItem("storedCities"); // Locally stored favCities variable
            let currentFavCities = favCities.length !== 0 ? favCities : []; //If variables is empty then let it be if not then it shall be
            
            const data = JSON.parse(currentFavCities); //Objectify the data which was compressed as string in localStorage
            return data; //Return the data as an Object (Data of Favorite Cities)
        } else {               
            //If there is no Variable of Name Stored Cities in local storage then...
            async function waiting() {
                let someData = await navigator.geolocation.getCurrentPosition((user_pos) => {
                    someData = [{
                        y: user_pos.coords.latitude,
                        x: user_pos.coords.longitude,
                        name: "HOME",
                    }];
                    
                    localStorage.setItem("storedCities", JSON.stringify(someData));//Create a var in local storage and store the user's location as favorite
                }, () => { //Run the below part if user doesn't give access to location
                    someData = [{
                        y: 35,
                        x: 134,
                        name: "Inaba",
                    }];
                    //By default add Inaba to favorites
                    localStorage.setItem("storedCities", JSON.stringify(someData));
                })
                
                return [];
            } 

            waiting();
        }
    } else  if (setting) { //If user is overwriting the favorite data
        let prevCities = localStorage.getItem("storedCities"); //Obtain the previous string of favs
        let cannotCreate = JSON.parse(prevCities).some((city) => {
            return city.x == x && city.y == y;
        }) //Check if some(even a single one) of the cities is already in the list which user is trying to favorite. True if yes.

        let latestCities = [...JSON.parse(prevCities)]; //Spread and store the older fav list
        if (!cannotCreate) { //If user is not adding already listed location in favos then,
            latestCities.push({
                y: y,
                x: x,
                name: name,
            }); 
        }

        localStorage.setItem("storedCities", JSON.stringify(latestCities)); //Update Local Storage
        return latestCities; //Return the data of favorite cities to render in header
    }
}