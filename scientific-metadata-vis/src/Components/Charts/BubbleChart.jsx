import * as d3 from "d3";
import {useEffect, useState} from "react";
import {getMaxValueInNodes} from "../../util";


const BubbleChart = ({year}) => {

    let svg
    let graph;
    let node;
    let simulation;
    let tooltip

    let links = [];
    let link;

    const width = 800
    const height = 600


    function tick() {
        node
            .attr("cx", d => {
                return d.x
            })
            .attr("cy", d => {
                return d.y
            })

        if (link != null) {
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
        }
    }

    function calc_radius(d) {
        const n = 0.2 * d.value + 6
        return Math.max(5, Math.min(n, 75));
    }

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    const mousemove = function (event, d) {
        tooltip
            .html(d.id + ": " + d.value + " " + d.year)
            .style("left", (event.x) + "px")
            .style("top", (event.y) + "px")

        const sameKeywordNodes = svg.selectAll("." + d.id)
        if (sameKeywordNodes != null) {
            sameKeywordNodes.each(function (p, j) {
                if (sameKeywordNodes.length > 1 && links.length < 1) {
                    links.push(
                        d3.linkHorizontal()({
                            source: d,
                            target: p
                        })
                    );
                    console.log(links)
                }

            })
            //         if(d != p){
            //             links.push(
            //                 d3.linkHorizontal()({
            //                     source: d.id,
            //                     target: p.id
            //                 })
            //             );
            //         }
            //     })
        }
        // if(links.length > 0){
        //     console.log(links)
        // }

    }
    const mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 1)
        //  links = []
    }


    useEffect(() => {
        svg = d3.select("svg");
        svg.selectAll('*').remove();
        // load the data
        d3.json("data.json").then(_graph => {
            graph = _graph;

            const previousYear = (parseInt(year) - 1).toString()
            const nextYear = (parseInt(year) + 1).toString()

            console.log(previousYear)
            console.log(nextYear)

            graph.nodes = graph.nodes.filter(n => {
                return ((n.year === year) || (n.year === previousYear) || (n.year === nextYear)) && n.value > 10
            })

            console.log("maxy value in dataset: " + getMaxValueInNodes(graph.nodes))
            const max = getMaxValueInNodes(graph.nodes)

            // Build color scale
            var myColor = d3.scaleSequential()
                .interpolator(d3.interpolateSinebow) // https://github.com/d3/d3-scale-chromatic#sequential-multi-hue
                .domain([1, max])


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
            simulation.on("tick", tick)

            // var force = d3.layout.force().nodes(graph.nodes).size([width, height]).on("tick", tick)
            // force.start();

            node = svg.selectAll("cirlce")
                .data(graph.nodes)
                .enter()
                .append("circle")
                .style("fill", function (d) {
                    return myColor(d.value)
                })
                .attr("r", d => calc_radius(d))
                .attr("class", d => d.id)

                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)

            // simulation.alpha(1).restart();
            // create a tooltip
            tooltip = d3.select("#tooltip")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")

        }).catch(e => console.error(e))
    }, [year]);


    return (<>
            <div id="tooltip"></div>
            <svg id={"my-svg"} width={width + "px"} height={height + "px"}/>
        </>
    )
}

export default BubbleChart