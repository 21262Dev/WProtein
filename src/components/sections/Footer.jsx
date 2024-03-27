import React from "react";
import "../../styles/credbar-styles.css"
import flatIcon from "../../icons/flaticon_negative.png"


export default function Credbar() {
    return (
        <>
         <dialog className="easter-egg">
               <span style={{left: 0, top: 0, margin: "0.75em", fontSize: "1.5em"}}className="closebtn material-symbols-outlined" onClick={() => {
                    document.querySelector("dialog.easter-egg").close();
                }}>disabled_by_default</span>
                <div>
                    <h2  style={{textAlign: "center", marginTop: "0.5em"}}>Update Log</h2>
                    <div className="new-update-section">
                        <h4>V1.0.8 -</h4>
                        <ul>
                            <li>Better UI</li>
                            <li>User Geolocating API</li>
                            <li>Average Weather Panel for Today</li>
                            <li>Average Weather Panel for Tommorow</li>
                            <li>Automatically adds user's location in favos</li>
                        </ul>
                    </div>
                    <div className="new-update-section">
                        <h4>V1.0.7 -</h4>
                        <ul>
                            <li>Faster load time</li>
                        </ul>
                    </div>
                    <div className="new-update-section">
                        <h4>V1.0.6 -</h4>
                        <ul>
                            <li>Stability Fixes 2</li>
                        </ul>
                    </div>
                    <div className="new-update-section">
                        <h4>V1.0.5 -</h4>
                        <ul>
                            <li>Stability Fixes 1</li>
                        </ul>
                    </div>
                    <div className="new-update-section">
                        <h4>V1.0.4 -</h4>
                        <ul>
                            <li>Fixed Accuracy of Weather</li>
                            <li>Extra Info Boxes scaled up</li>
                            <li>Added feature to favorite locations</li>
                            <li>Changed Desgin system from Flex to Grid</li>
                        </ul>
                    </div>
                    <div className="new-update-section">
                        <h4>V1.0.3 -</h4>
                        <ul>
                            <li>New Icons for -5°C</li>
                            <li>New Icons for +40°C</li>
                            <li>Minor Design Changes</li>
                            <li>WProtein is now a PWA </li>
                            <li>Fixed Mobile Scrolling Bug</li>
                        </ul>
                    </div>
                    <div className="new-update-section">
                        <h4>V1.0.2 -</h4>
                        <ul>
                            <li>Added Visibility</li>
                            <li>Added Timezone</li>
                            <li>Added Wind Gust</li>
                            <li>Added Rain Chance</li>
                            <li>Fixed Timezone errors</li>
                            <li>Added Soil Temperature</li>
                            <li>Added Searching function</li>
                        </ul>
                    </div>
                    <div className="new-update-section">
                        <h4>V1.0.1 -</h4>
                        <ul>
                            <li>New Design</li>
                            <li>Loading Screen</li>
                            <li>Added More Icons</li>
                        </ul>
                    </div>
                </div>
         </dialog>
         <div className="credits-bar">
            <img className="f" src={flatIcon} onClick={() => {
                window.open("https://www.flaticon.com/")
            }}/>
            <h4 style={{color: "var(--time)"}}>Made by <span style={{color: "var(--selective-yellow2)"}}>21262</span></h4>
            <p className="eater-egg-txt"onClick={() => {
                document.querySelector("dialog.easter-egg").showModal();
            }}>V 1.0.8</p>
         </div>
        </>
    )
}