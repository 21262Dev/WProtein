import React from "react";

import rainIcon from "../../icons/pp-icon.png"

export default function HourlyWBar({rainChance, futureicons, currenthour, weatther}) {
    let hours = [currenthour + 1, currenthour + 2, currenthour + 3, currenthour + 4, currenthour + 5, currenthour + 6];
    for (let h = 0; h < hours.length; h++) {
        if (hours[h] > 24) {
            hours[h] = hours[h] - 24;
        } else {
            hours[h] = hours[h];
        }
    }

    return  (<div className="status-bar">
                <div>
                    <p className="timing">{hours[0]}:00</p>
                    <img src={futureicons[0]} width={45}/>
                    <p className="absolute-rainP"><img src={rainIcon} style={{width: "20%"}}/>{rainChance[hours[0]]}%</p>
                    <p>{Math.round(weatther[hours[0]])}<sup className="supped yellow-txt">°C</sup></p>
                </div>
                <div>
                    <p className="timing">{hours[1]}:00</p>
                    <img src={futureicons[1]} width={45}/>
                    <p className="absolute-rainP"><img src={rainIcon} style={{width: "20%"}}/>{rainChance[hours[1]]}%</p>
                    <p>{Math.round(weatther[hours[1]])}<sup className="supped yellow-txt">°C</sup></p>
                </div>
                <div>
                    <p className="timing">{hours[2]}:00</p>
                    <img src={futureicons[2]} width={45}/>
                    <p className="absolute-rainP"><img src={rainIcon} style={{width: "20%"}}/>{rainChance[hours[2]]}%</p>
                    <p>{Math.round(weatther[hours[2]])}<sup className="supped yellow-txt">°C</sup></p>
                </div>
                <div>
                    <p className="timing">{hours[3]}:00</p>
                    <img src={futureicons[3]} width={45}/>
                    <p className="absolute-rainP"><img src={rainIcon} style={{width: "20%"}}/>{rainChance[hours[3]]}%</p>
                    <p>{Math.round(weatther[hours[3]])}<sup className="supped yellow-txt">°C</sup></p>
                </div>
                <div>
                    <p className="timing">{hours[4]}:00</p>
                    <img src={futureicons[4]} width={45}/>
                    <p className="absolute-rainP"><img src={rainIcon} style={{width: "20%"}}/>{rainChance[hours[4]]}%</p>
                    <p>{Math.round(weatther[hours[4]])}<sup className="supped yellow-txt">°C</sup></p>
                </div>
                <div>
                    <p className="timing">{hours[5]}:00</p>
                    <img src={futureicons[5]} width={45}/>
                    <p className="absolute-rainP"><img src={rainIcon} style={{width: "20%"}}/>{rainChance[hours[5]]}%</p>
                    <p>{Math.round(weatther[hours[5]])}<sup className="supped yellow-txt">°C</sup></p>
                </div>
            </div>);
}