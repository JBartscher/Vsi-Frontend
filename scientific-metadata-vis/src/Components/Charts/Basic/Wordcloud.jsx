import {useEffect} from "React";
import * as d3 from "d3";

const Wordcloud = () => {
    let svg
    let width = 800
    let height = 600
    let graph
    let layout

    function draw(words) {
        svg
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) {
                return d.size;
            })
            .style("fill", "#69b3a2")
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
                return d.text;
            });
    }

    useEffect(() => {
        svg = d3.select("svg");
        svg.selectAll('*').remove();

        width = +svg.node().getBoundingClientRect().width;
        height = +svg.node().getBoundingClientRect().height;

        d3.json("data.json").then(_graph => {
            graph = _graph;
        });

        layout = d3.layout.cloud()
            .size([width, height])
            .words(graph.map(function (d) {
                return {text: d.keyword, size: d.value};
            }))
            .padding(10)
            .fontSize(60)
            .on("end", draw);
        layout.start();


    }, [])
}

export default Wordcloud