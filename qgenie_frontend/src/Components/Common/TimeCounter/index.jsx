import { useEffect } from "react";
import { useState } from "react";

const TimeCounter = ({ endtime }) => {
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

        let result = [];

        if (days) result.push(`${days} d : `);
        if (hours) result.push(`${hours} h : `);
        if (minutes) result.push(`${minutes} m : `);
        if (seconds || result.length === 0) {
            result.push(`${seconds} s`);
        }

        return result.join(" ");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainTime(endtime - Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, [endtime]);

    return (
        <>
            <span>{timerFun(remainTime)}</span>
        </>
    );
};

export default TimeCounter;
