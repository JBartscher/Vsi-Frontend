import * as d3 from "d3"
import {useEffect, useState} from "react";
import {isInNodes} from "../../util";

const BasicForceDirectedGraph = () => {

    let width = 400;
    let height = 400;

    let graph;

    let simulation;

    var test_data = {
        nodes: [
            {
                id: "data mining",
                "value": 57,
                "year": "2022"
            },
            {
                id: "disaster information management",
                "value": 2,
                "year": "2022"
            },
            {
                id: "application",
                "value": 3,
                "year": "2022"
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

    let node
    let link


    function ticked() {
        link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    }

    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    const [year, setYear] = useState("2017")

    useEffect(() => {
        let svg = d3.select("svg");

        //	d3 color scales
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        console.log("selecting ...")

        // load the data
        d3.json("data.json").then(_graph => {
            graph = _graph

            graph.nodes = graph.nodes.filter(n => {
                return n.year === year && n.value > 10
            })

            graph.links = graph.links.filter(l => {
                return l.year === year && isInNodes(graph.nodes, l) && l.value > 1
            })

            simulation = d3.forceSimulation(graph.nodes)

            simulation.force("link", d3.forceLink(graph.links).id(d => d.id).links(graph.links))

            simulation.force("charge", d3.forceManyBody().strength(-30))
            simulation.force("center", d3.forceCenter(width / 2, height / 2))
                .on("tick", ticked);


            node = svg.append("g")
                .selectAll("circle")
                .data(graph.nodes)
                // .filter(function (d) {
                //     return d.year === "2017"
                // })
                .join(
                    enter => enter.append("circle").attr("class", "new"),
                    update => update.attr("class", "updated"),
                    exit => exit.remove()
                )
                // .filter(function (d) {
                //     return d.year !== ""
                // })
                .attr("r", d => (0.1 * d.value)+5 )
                .attr("cx", d => d.value * 2)
                .attr("cy", d => d.value * 2)
                .attr("stroke", "red")
                .attr("stroke-width", "1")
                .attr("fill", "red")
                .call(drag(simulation));

            link = svg.append("g").selectAll("line").data(graph.links).join(
                enter => enter.append("line").attr("class", "new"),
                update => update.attr("class", "updated"),
                exit => exit.remove()
            )
                // .filter(function (d) {
                //     return d.year !== ""
                // })
                .attr("stroke-width", d => d.value).style("stroke", "blue")

        }).catch(e => console.error(e))
    }, []);


    return (
        <svg id={"my-svg"} width={"800px"} height={"600px"}></svg>
    )
}

export default BasicForceDirectedGraph