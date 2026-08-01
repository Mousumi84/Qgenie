import { useEffect } from "react";
import { useState } from "react";

const TimeCounter = ({ style, endtime }) => {
    let [remainTime, setRemainTime] = useState(endtime - Date.now());

    const timerFun = (ms) => {
        if (ms <= 0) return "Expired";

        const days = Math.floor(ms / (24 * 60 * 60 * 1000));
        ms %= 24 * 60 * 60 * 1000;

        const hours = Math.floor(ms / (60 * 60 * 1000));
        ms %= 60 * 60 * 1000;

        const minutes = Math.floor(ms / (60 * 1000));
        ms %= 60 * 1000;

        const seconds = Math.floor(ms / 1000);

        return `${String(days).padStart(2, "0")} d : ${String(hours).padStart(2, "0")} h : ${String(minutes).padStart(2, "0")} m : ${String(seconds).padStart(2, "0")} s`; 
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainTime(endtime - Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, [endtime]);

    return (
        <>
            <span className={style}>{timerFun(remainTime)}</span>
        </>
    );
};

export default TimeCounter;
