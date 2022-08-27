const YearSelect = ({onChange, initialYear}) => {
    return (
        <div className={"flex flex-row w-1/2"}>
            <h3 className={"text-xl font-bold text-center text-gray-700 h-full grow mt-2 mr-1"}>Year</h3>
            <select className="grow text-lg select w-full max-w-xs" onChange={onChange} value={initialYear}>
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