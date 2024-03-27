import React from "react";
import ReactDOM from "react-dom/client";

import Intro from "./components/Intro";
import WPWeather from "./components/WPapp";

import openApp from "./functions/openApp";

function App() {
    React.useEffect(() => {
        openApp();
    }, []);

    return (
        <div id="app">
            <Intro />
            <WPWeather />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);