const has = (src, path = []) => {
    let _path = Array.isArray(path) ? path.slice() : (path || "").split("."),
        o = src,
        idx = 0;

    if (_path.length === 0) {
        return false;
    }

    for (idx = 0; idx < _path.length; idx++) {
        const key = _path[idx];

        if (o != null && o.hasOwnProperty(key)) {
            o = o[key];
        } else {
            return false;
        }
    }
    return true;
};

const extend = (a, b) => {
    for (var key in b) if (b.hasOwnProperty(key)) a[key] = b[key];
    return a;
};

module.exports = { has, extend };