function getMaxValueInNodes(nodes) {
    return Math.max(...nodes.map(o => o.value))
}

function findById(source, id) {
    const f = source.filter(function (obj) {
        // coerce both obj.id and id to numbers
        // for val & type comparison
        return obj.id === id;
    })[0];
    return f != null;
}

function findAllIndexesById(source, id){
    const indexes = [];

    for (let index = 0; index < source.length; index++) {
        if (source[index].id === id) {
            indexes.push(index);
        }
    }
    return indexes
}

/*
guarantees that there is a corresponding target and source node for the link.
 */
function isLinkInNodes(nodes, link) {
    let s = findById(nodes, link.source)
    let t = findById(nodes, link.target)

    return s && t
}

export {getMaxValueInNodes, isLinkInNodes, findAllIndexesById, findById}