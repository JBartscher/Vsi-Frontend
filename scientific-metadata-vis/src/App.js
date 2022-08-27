import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import ViewBox from "./Components/ViewBox";
import Navbar from "./Components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import BarChart from "./Components/Charts/Basic/BarChart";
import {useEffect, useState} from "react";
import {json as loadJSONData, max} from "d3";
import BarPlot from "./Components/Charts/Basic/BarPlot";
import React from "react";
import LoadingSpinner from "./Components/LoadingSpinner";

function App() {

    const [rawData, setRawData] = useState(null)
    const [displayData, setDisplayData] = useState(null)

    useEffect(() => {
        loadJSONData("data.json").then(data => {
            setRawData(data);
            filterData()
        });
    }, [filterData])

    const handleOptionChange = (event) => {
        console.log(event.target.value)
        setYear(event.target.value)
        filterData()
        event.preventDefault()
    }

    const handleThresholdChange = (event) => {
        console.log(event.target.value)
        setThreshold(event.target.value)
        filterData()
        event.preventDefault()
    }

    function filterData() {
        if (rawData) {
            setDisplayData({
                nodes: rawData.nodes.filter(d => {
                    return d.id !== 'none' && d.year === year && d.value > threshold
                }),
                links: rawData.links.filter(d => {
                    return d.id !== 'none' && d.year === year && d.value > threshold
                })
            })
        }
    }

    const [year, setYear] = useState("2022")
    const [threshold, setThreshold] = useState(5)

    if (!displayData) {
        return (
            <React.StrictMode>
                <Router>
                    <div className="App grid grid-cols-12 bg-gray-200">
                        <Navbar/>
                        <main className="lg:col-span-10 md:col-span-8 sm:col-span-6 bg-gray-200">
                            <LoadingSpinner title={"Loading data..."}/>
                        </main>
                    </div>
                </Router>
            </React.StrictMode>
        )
    }

    return (
        <>
            <React.StrictMode>
                <Router>
                    <div className="App grid grid-cols-12 bg-gray-200">
                        <Navbar/>
                        <main className="lg:col-span-10 md:col-span-8 sm:col-span-6 bg-gray-200">
                            <Routes>
                                <Route path="/" element={<ViewBox threshold={threshold}
                                                                  handleThresholdChange={handleThresholdChange}
                                                                  handleOptionChange={handleOptionChange}
                                                                  year={year}>
                                    <BarPlot height={800} width={1400} data={displayData}/>
                                </ViewBox>}/>
                                <Route path="/barchart"
                                       element={<ViewBox> <BarChart rawData={rawData} threshold={threshold}
                                                                    year={year}/> </ViewBox>}/>
                                <Route path="/piechart"
                                       element={<ViewBox> <BarChart rawData={rawData}/> </ViewBox>}/>
                            </Routes>
                        </main>
                    </div>
                </Router>
            </React.StrictMode>
        </>
    );
}

export default App;
