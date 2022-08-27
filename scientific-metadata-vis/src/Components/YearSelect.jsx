const YearSelect = ({onChange, initialYear}) => {
    return (
        <div className={"flex flex-row"}>
            <h3 className={"text-lg text-center text-gray-700 h-full"}>Year:</h3>
            <select className="grow select w-full max-w-xs" onChange={onChange} value={initialYear}>
                <option value={"2017"}>2017</option>
                <option value={"2018"}>2018</option>
                <option value={"2019"}>2019</option>
                <option value={"2020"}>2020</option>
                <option value={"2021"}>2021</option>
                <option value={"2022"}>2022</option>
            </select>
        </div>
    )
}

export default YearSelect