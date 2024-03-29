import * as d3 from "d3";
import {useEffect} from "react";

const MARGIN = {top: 30, right: 30, bottom: 30, left: 30};
// bounds = area inside the graph axis = calculated by substracting the margins


const PieChart = ({width, height, data}) => {

    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    useEffect(() => {
        const svg = d3.select("#vis-svg")
        svg.selectAll('*').remove()

        svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("id", "vis-area")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        let radius = Math.min(width, height) / 2 - MARGIN.top

// Create dummy data
        const my_data = data.nodes

        const groups = my_data.sort((a, b) => b.value - a.value).map((d) => d.id);

        console.log(groups)
        console.log(my_data)

// set the color scale
        const color = d3.scaleOrdinal()
            .domain(groups)
            .range(d3.schemeDark2);

// Compute the position of each group on the pie:
        const pie = d3.pie()
            .sort(null) // Do not sort group by size
            .value(d => d[1].value)
        const data_ready = pie(Object.entries(my_data))

// The arc generator
        const arc = d3.arc()
            .innerRadius(radius * 0.5)         // This is the size of the donut hole
            .outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
        const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg.select('g')
            .selectAll('allSlices')
            .data(data_ready)
            .join('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data[1].id))
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        // Add the polylines between chart and labels:
        svg
            .select('g')
            .selectAll('allPolylines')
            .data(data_ready)
            .join('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', function (d) {
                const posA = arc.centroid(d) // line insertion in the slice
                const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                const posC = outerArc.centroid(d); // Label position = almost the same as posB
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
            })

        // Add the polylines between chart and labels:
        svg
            .select('g')
            .selectAll('allLabels')
            .data(data_ready)
            .join('text')
            .text(d => d.data[1].id)
            .attr('transform', function (d) {
                const pos = outerArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            })
            .style('text-anchor', function (d) {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
    }, [data])


    return (<div>
        <svg id={"vis-svg"} width={width} height={height}>
            <g id={"vis-area"}
               width={boundsWidth}
               height={boundsHeight}
               transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
            >
            </g>
        </svg>
    </div>);
}

export default PieChart;