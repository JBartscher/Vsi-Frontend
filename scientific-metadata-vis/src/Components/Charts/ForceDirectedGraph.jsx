import * as d3 from "d3"
import {useEffect} from "react";


const ForceDirectedGraph = () => {

    // values for all forces
    const forceProperties = {
        center: {
            x: 0.5,
            y: 0.5
        },
        charge: {
            enabled: true,
            strength: -30,
            distanceMin: 1,
            distanceMax: 2000
        },
        collide: {
            enabled: true,
            strength: .7,
            iterations: 1,
            radius: 5
        },
        forceX: {
            enabled: false,
            strength: .1,
            x: .5
        },
        forceY: {
            enabled: false,
            strength: .1,
            y: .5
        },
        link: {
            enabled: true,
            distance: 30,
            iterations: 1
        }
    }

    let svg = d3.select("svg");

    let width = 600; // +svg.node().getBoundingClientRect().width;

    let height = 480;// +svg.node().getBoundingClientRect().height;

    let link, node;

    let graph;

    useEffect(() => {
        // load the data
        d3.json("data.json").then(_graph => {
            graph = _graph;
            initializeDisplay();
            initializeSimulation();
        }).catch(e => console.error(e))
    }, []);


// force simulator
    let simulation = d3.forceSimulation();

    // set up the simulation and event to update locations after each tick
    function initializeSimulation() {
        simulation.nodes(graph.nodes);
        initializeForces();
        simulation.on("tick", ticked);
    }

    // add forces to the simulation
    function initializeForces() {
        // add forces and associate each with a name
        simulation
           // .force("link", d3.forceLink(graph.links).id(d => d.name))
            .force("charge", d3.forceManyBody().strength(-30))
            .force("collide", d3.forceCollide())
            .force("center", d3.forceCenter())
            .force("forceX", d3.forceX())
            .force("forceY", d3.forceY());
        // apply properties to each of the forces
        updateForces();
    }

    // apply new force properties
    function updateForces() {
        // get each force by name and update the properties
        simulation.force("center")
            .x(width * forceProperties.center.x)
            .y(height * forceProperties.center.y);
        simulation.force("charge")
            .strength(forceProperties.charge.strength * forceProperties.charge.enabled)
            .distanceMin(forceProperties.charge.distanceMin)
            .distanceMax(forceProperties.charge.distanceMax);
        simulation.force("collide")
            .strength(forceProperties.collide.strength * forceProperties.collide.enabled)
            .radius(forceProperties.collide.radius)
            .iterations(forceProperties.collide.iterations);
        simulation.force("forceX")
            .strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
            .x(width * forceProperties.forceX.x);
        simulation.force("forceY")
            .strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
            .y(height * forceProperties.forceY.y);

        // simulation.force("link")
        //     .id(function (d) {
        //         return d.id;
        //     })
        //     .distance(forceProperties.link.distance)
        //     .iterations(forceProperties.link.iterations)
        //     .links(forceProperties.link.enabled ? graph.links : []);

        // updates ignored until this is run
        // restarts the simulation (important if simulation has already slowed down)
        simulation.alpha(1).restart();
    }

    //////////// DISPLAY ////////////

// generate the svg objects and force simulation
    function initializeDisplay() {
        // set the data and properties of link lines
        // link = svg.append("g")
        //     .attr("class", "links")
        //     .selectAll("line")
        //     .data(graph.links)
        //     .enter().append("line");

        // set the data and properties of node circles
        node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
        // .call(d3.drag()
        //   .on("start", dragstarted)
        //   .on("drag", dragged)
        //   .on("end", dragended));

        // node tooltip
        node.append("title")
            .text(function (d) {
                return d.id;
            });
        // visualize the graph
        updateDisplay();
    }

// update the display based on the forces (but not positions)
    function updateDisplay() {
        node
            .attr("r", forceProperties.collide.radius)
            .attr("stroke", forceProperties.charge.strength > 0 ? "blue" : "red")
            .attr("stroke-width", forceProperties.charge.enabled == false ? 0 : Math.abs(forceProperties.charge.strength) / 15);

        // link
        //     .attr("stroke-width", forceProperties.link.enabled ? 1 : .5)
        //     .attr("opacity", forceProperties.link.enabled ? 1 : 0);
    }

    // update the display positions after each simulation tick
    function ticked() {
        // link
        //     .attr("x1", function (d) {
        //         return d.source.x;
        //     })
        //     .attr("y1", function (d) {
        //         return d.source.y;
        //     })
        //     .attr("x2", function (d) {
        //         return d.target.x;
        //     })
        //     .attr("y2", function (d) {
        //         return d.target.y;
        //     });

        node
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
        d3.select('#alpha_value').style('flex-basis', (simulation.alpha() * 100) + '%');
    }

    // update size-related forces
    d3.select(window).on("resize", function () {
        width = +svg.node().getBoundingClientRect().width;
        height = +svg.node().getBoundingClientRect().height;
        updateForces();
    });

// convenience function to update everything (run after UI input)
    function updateAll() {
        updateForces();
        updateDisplay();
    }

    return (
        <>Force directed Graph</>
    )

}

export default ForceDirectedGraph
