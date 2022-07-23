import * as d3 from "d3";
import {useEffect, useRef, useState} from "react";
import {getMaxValueInNodes} from "../../util";


const BubbleChart = ({year}) => {

    let svg
    let graph;
    let node;
    let simulation;
    let colorScale

    let linkElements;

    let width = 800
    let height = 600

    const test_data = {
        nodes: [
            {
                id: "data mining",
                "value": 57,
                "year": "2022"
            },
            {
                id: "disaster information management",
                "value": 2,
                "year": "2023"
            },
            {
                id: "application",
                "value": 3,
                "year": "2022"
            },
            {
                id: "application",
                "value": 3,
                "year": "2021"
            }
        ],
        links: [
            {
                "source": "data mining",
                "target": "application",
                "value": 5,
                "year": "2022"
            },
            {
                "source": "application",
                "target": "disaster information management",
                "value": 1,
                "year": "2022"
            },
            {
                "source": "data mining",
                "target": "application",
                "value": 10,
                "year": "2022"
            },
        ]
    };

    const links = useRef([])

    function tick() {
        node
            .attr("cx", d => {
                return d.x
            })
            .attr("cy", d => {
                return d.y
            })
    }

    function handleMouseOver(event, node) {
        console.log("mouseover")
        d3.select(this).style("fill", function (d) {
            return colorScale(node.value * -1 * 2)
        })

        links.current = [
            {
                source: graph.nodes[node.index],
                target: graph.nodes[3]
            }, {
                source: graph.nodes[node.index],
                target: graph.nodes[3]
            }]

        linkElements = svg.selectAll("line")
            .data(links.current)
            .enter()
            .append("line")
            .attr("stroke-width", d => 2)
            .attr("class", "relation-line")
            .style("stroke", "black")
            .attr("x1",l => l.source.x)
            .attr("y1",l => l.source.y)
            .attr("x2",l => l.target.x)
            .attr("y2",l => l.target.y)


        svg.append("text")
            .attr("id", 'tooltip')
            .attr('font-size', 15)
            .attr("dx", node.x)
            .attr("dy", node.y)
            .text(`${node.id}: ${node.value}`)
    }

    function handleMouseOut(d, i) {
        d3.select(this).style("fill", function (d) {
            return colorScale(d.value)
        })
        d3.select('#tooltip').remove()
        d3.selectAll('.relation-line').remove()
        links.current = []
    }

    d3.select(window).on("resize", function () {
        console.log(svg.node().getBoundingClientRect().width + " " +
            svg.node().getBoundingClientRect().height
        )
        width = +svg.node().getBoundingClientRect().width;
        height = +svg.node().getBoundingClientRect().height;
    });

    function calc_radius(d) {
        const n = 0.2 * d.value + 6
        return Math.max(5, Math.min(n, 75));
    }

    function updateSimulation(nextYear, previousYear) {
        simulation = d3.forceSimulation(graph.nodes)
        // https://www.d3indepth.com/force-layout/ forces documentation
        simulation
            .force("charge", d3.forceManyBody().strength(5))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(function (d) {
                return calc_radius(d)
            }))
            .force('x', d3.forceX().x(function (d) {
                if (d.year === year) {
                    return width / 2;
                } else if (d.year === nextYear) {
                    return width / 2 + width / 4;
                } else if (d.year === previousYear) {
                    return width / 4;
                }

            }))
            .force("link", d3.forceLink(links)
                .id(d => d.id)
                .strength(0)
                .links(links))

        simulation.on("tick", tick)
    }

    useEffect(() => {
        svg = d3.select("svg");
        svg.selectAll('*').remove();

        width = +svg.node().getBoundingClientRect().width;
        height = +svg.node().getBoundingClientRect().height;

        // load the data
        d3.json("data.json").then(_graph => {
            graph = test_data;

            const previousYear = (parseInt(year) - 1).toString()
            const nextYear = (parseInt(year) + 1).toString()

            graph.nodes = graph.nodes.filter(n => {
                return ((n.year === year) || (n.year === previousYear) || (n.year === nextYear)) && n.value > 1
            })

            const max = getMaxValueInNodes(graph.nodes)

            // Build color scale
            colorScale = d3.scaleSequential()
                .interpolator(d3.interpolateSinebow) // https://github.com/d3/d3-scale-chromatic#sequential-multi-hue
                .domain([1, max]);


            updateSimulation(nextYear, previousYear);

            node = svg.selectAll("cirlce")
                .data(graph.nodes)
                .enter()
                .append("circle")
                .style("fill", function (d) {
                    return colorScale(d.value)
                })
                .attr("r", d => calc_radius(d))
                .attr("data", d => d.id)
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);


            linkElements = svg.selectAll("line")
                .data(links.current)
                .enter()
                .append("line")
                .attr("stroke-width", d => 1)
                .attr("class", "relation-line")
                .style("stroke", "black")

        }).catch(e => console.error(e))
    }, [year, links]);


    return (<>
            <svg id={"my-svg"} className={"bg-amber-100 w-full"} height={height + "px"}>
                <g className="links"></g>
            </svg>
        </>
    )

}


export default BubbleChart