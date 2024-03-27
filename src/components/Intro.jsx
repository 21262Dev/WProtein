import React from "react";
import "../styles/intro-page.css";

import loaded from "../functions/loadAnimation.js";
import loadedAnim from "../functions/loadedAnimation.js";

export default function Intro() {
    React.useEffect(() => {
        loadedAnim();
        loaded();
    }, [])

    return (
        <div id="intro">
            <div id='filter-cover'>
                <div className="circle-loader"></div>
                <h1 className="scrollzer" style={{color: "var(--white)"}}><span className="w">W</span><span className="p">P</span>rotein</h1><br />
                <p className="scrollzer">Made by <span className="p" style={{fontSize: "1em"}}>21262</span></p>
                <p className="version">26/5/2023 - (V 1.0.8)</p>
            </div>
        </div>
    )
}