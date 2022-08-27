import * as d3 from "d3";
import {useEffect, useState} from "react";


const BarChart = ({rawData, year, threshold}) => {

    let svg = d3.select("#my-svg");

    let [chartData, setChartData] = useState(rawData.nodes)
    let [size, setSize] = useState({width: 0, height: 600})

    // Set the dimensions of the canvas / graph
    let margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;


    const resizeHandler = () => {

        const boundingRect = d3.select("#my-svg").node().getBoundingClientRect()
        console.log("resize")
        setSize({
            width: boundingRect.width,
            height: boundingRect.height,
        })
        console.log(boundingRect)

        x.range([0, boundingRect.width])
        y.range([boundingRect.height, 0]);
    };

    useEffect(() => {
        // set inital width and height
        const boundingRect = d3.select("#my-svg").node().getBoundingClientRect()
        setSize({
            width: boundingRect.width,
            height: boundingRect.height,
        })
        console.log(boundingRect)
        window.addEventListener('resize', resizeHandler);
    }, [])

    useEffect(() => {
        if (chartData) {
            chartData = chartData.filter(d => {
                    return d.year === year && d.value > threshold
                }
            )
            update()
        }
    }, [year, threshold])

    useEffect(() => {

    }, [])

    let x = d3.scaleBand()
        .domain(chartData.map(d => d.id))
        .range([0, size.width])
        .padding(0.2);

    let xAxis = svg.append("g")
        .attr("transform", "translate(0," + size.height + ")")

// Initialize the Y axis
    let y = d3.scaleLinear()
        .range([size.height, 0]);

    let yAxis = svg.append("g")
        .attr("class", "myYaxis")

    // A function that create / update the plot for a given variable:
    function update() {

        console.log("updating!")
        console.log(chartData)

        // Update the X axis
        x.domain(chartData.map(function (d) {
            return d.id;
        }))
        xAxis.call(d3.axisBottom(x))

        // Update the Y axis
        y.domain([0, d3.max(chartData, function (d) {
            return d.value
        })]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));

        // Create the u variable
        var u = svg.selectAll("rect")
            .data(chartData)

        u
            .enter()
            .append("rect") // Add a new rect for each new elements
            .merge(u) // get the already existing elements as well
            .transition() // and apply changes to all of them
            .duration(1000)
            .attr("x", function (d) {
                return x(d.id);
            })
            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                return size.height - y(d.value);
            })
            .attr("fill", "#69b3a2")

        // If less group in the new dataset, I delete the ones not in use anymore
        u
            .exit()
            .remove()
    }

    // TODO 48px sind die Jahresauswahlleiste das sollte irgendwie generischer gehen
    return (
        <>
            {chartData ?
                <svg id={"my-svg"} className={"bg-gray-300 w-full"}/>
                : null}
        </>
    );
}

export default BarChart