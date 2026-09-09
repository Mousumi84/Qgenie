const SideBody = ({ selectedQuestionType, questions, remainTime, quesClk, setQuesClk }) => {

    const timerFun = (ms) => {
        if (ms <= 0) {
            return {
                hours: "00",
                minutes: "00",
                seconds: "00",
            };
        }

        const hours = Math.floor(ms / (60 * 60 * 1000));
        ms %= 60 * 60 * 1000;

        const minutes = Math.floor(ms / (60 * 1000));
        ms %= 60 * 1000;

        const seconds = Math.floor(ms / 1000);

        return {
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
        };
    };

    const time = timerFun(remainTime);

    return (
        <>
            <div className="flex flex-col items-center border-b-3 border-blue-50 m-2 p-2 gap-2">
                <div className="text-xl">Time Left</div>
                <div className="flex flex-row justify-between w-19/20 p-2">
                    <div>
                        <strong>{time.hours}</strong>
                        <div>Hours</div>
                    </div>
                    <div>:</div>
                    <div>
                        <strong>{time.minutes}</strong>
                        <div>Minutes</div>
                    </div>
                    <div>:</div>
                    <div>
                        <strong>{time.seconds}</strong>
                        <div>Seconds</div>
                    </div>
                </div>
            </div>

            {selectedQuestionType && (
                <div className="p-3 h-90">
                    <div className="h-full border rounded-md border-gray-300 p-4 flex flex-row gap-2 flex-wrap content-start">
                        {questions?.filter((item) => item.questionType === selectedQuestionType).map((item, index) => {
                                const isActive = quesClk?.item?._id === item?._id;
                                
                            return (
                                <div key={item?._id} className={`border border-gray-400 rounded-3xl w-10 h-10 content-center text-center bg-gray-100 ${isActive ? "bg-red-500 text-white" : "bg-gray-100"}`} onClick={() => setQuesClk({item, index})}>{index + 1}</div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    )
};

export default SideBody;