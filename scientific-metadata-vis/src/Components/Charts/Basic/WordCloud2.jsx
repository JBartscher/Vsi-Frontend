import WordCloud from "react-d3-cloud";

const WordCloud2 = ({width, height, data}) => {

    const fontSize = (word) => word.value / 20;
    const rotate = (word) => (word.value % 90) - 45;

    const newData = data.nodes.map((d) => ({
        text: d.id,
        value: d.value
    }));

    return (
        <WordCloud
            width={width}
            height={height}
            data={newData}
            fontSize={fontSize}
            rotate={rotate}
            padding={2}
        />
    );
}

export default WordCloud2