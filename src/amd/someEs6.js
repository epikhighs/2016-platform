export let addAll = function () {
    return Array.from(arguments).reduce((a, b) => a + b);
};

export let tpl = function (frag) {
    return `hello ${frag}`;
};
