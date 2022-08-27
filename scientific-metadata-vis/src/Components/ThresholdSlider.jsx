const ThresholdSlider = ({onChange, threshold, maximum}) => {
    return (
        <input type="range" min="0" max={maximum} value={threshold} className={"range w-1/6"} onChange={onChange}/>
    )
}

export default ThresholdSlider