const ThresholdSlider = ({onChange, threshold, maximum}) => {
    return (
        <div className={"flex flex-row w-1/2"}>
            <h3 className={"text-xl font-bold text-center text-gray-700 h-full mt-1.5 mr-1"}>Threshold</h3>
            <div className="w-full">
                <input type="range" min="0" max={maximum} value={threshold} className={"range w-full grow mt-2"} step={"5"}
                       onChange={onChange}/>
                <div className="w-full flex justify-between text-xs px-2">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
            </div>
            <h3 className={"text-xl font-bold text-center text-gray-700 h-full mt-1.5 ml-1"}>{threshold}</h3>
        </div>
    )
}

export default ThresholdSlider