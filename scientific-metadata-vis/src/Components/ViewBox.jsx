import YearSelect from "./YearSelect";
import ThresholdSlider from "./ThresholdSlider";


const ViewBox = ({children, handleOptionChange, handleThresholdChange, threshold, year}) => {

    return (
        <div className={"h-screen"}>
            <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
                    <YearSelect onChange={handleOptionChange} initialYear={year}/>
                </div>
                <div className="divider lg:divider-horizontal"/>
                <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
                    <ThresholdSlider onChange={handleThresholdChange} threshold={threshold} maximum={50}/>
                </div>
            </div>

            {children}
        </div>
    )
}

export default ViewBox