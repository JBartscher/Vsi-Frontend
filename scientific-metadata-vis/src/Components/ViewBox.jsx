import YearSelect from "./YearSelect";
import BubbleChart from "./Charts/BubbleChart";
import {useEffect, useState} from "react";


const ViewBox = () => {

    const handleOptionChange = (event) => {
        console.log(event.target.value)
        setYear(event.target.value)
        event.preventDefault()
    }

    const [year, setYear] = useState("2019")

    return (
        <div>
            <YearSelect onChange={handleOptionChange} initialYear={year}/>
            <BubbleChart year={year}/>
        </div>
    )
}

export default ViewBox