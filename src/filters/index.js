const filterDecimal = (val, num = 2) => {
    let n = 0;
    try {
        val = parseFloat(val);
        if (isNaN(val))
            return n.toFixed(num);
        return val.toFixed(num);
    } catch (err) {
        return n.toFixed(num);
    }
};

const filterTest = (val) => {
    return val;
};

export {
    filterDecimal,
    filterTest,
}
