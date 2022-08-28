import {useEffect} from "react";
import * as d3 from "d3";
import cloud from "d3-cloud"

const WordCloud1 = ({width, height, data}) => {

    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 30, left: 30},
        innerWidth = width - margin.left - margin.right,
        innerHeight = height - margin.top - margin.bottom;


    const myWords = [{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "100"},{id: "Running Far Away", value: "25"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},{id: "Running", value: "10"},
        {id: "Surfing", value: "20"}, {id: "Climbing", value: "50"}, {id: "Kiting", value: "30"}, {id: "Sailing", value: "20"}, {id: "Snowboarding", value: "60"} ]


    const layout = cloud()
        .size([innerWidth, innerHeight])
        .words(myWords.map(function (d) {
            return {id: d.id, value: d.value};
        }))
        .padding(5)
        .rotate(function () {
            return ~~(Math.random() * 2) * 90;
        })
        .font("Impact")
        .fontSize(d=> d.value)
        .on("end", draw);


    function draw(words) {
        const svg = d3.select("#vis-svg")
        svg.selectAll('*').remove()

        console.log(layout.size())
        console.log(innerHeight)
        console.log(innerWidth)

        svg
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", d=> 1.1* d.size)
            .style("font-family", d => d.font)
            .style("fill", "#69b3a2")
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                console.log(d)
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(d => d.id);
    }

    useEffect(() => {
        layout.start();
    }, [data])


    return (<>
        <svg id={"vis-svg"} width={width} height={height}/>
    </>)
}

export default WordCloud1