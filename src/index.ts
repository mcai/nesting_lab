import makerjs from "makerjs";

const circle = {
    type: "circle",
    origin: [0, 0],
    radius: 50,
};

const model = {
    paths: {
        circle: circle,
        v: new makerjs.paths.Line([0, 0], [0, 100]),
        h: new makerjs.paths.Line([0, 0], [100, 0]),
        arc: new makerjs.paths.Arc([0, 0], 100, 0, 90),
    },
};

function nest(model: any) {
    const paths = model.paths;

    for (const key in paths) {
        let path = paths[key];

        if (path.type === "circle") {
            path = {
                ...path,
                origin: makerjs.point.add(path.origin, [10, 20]),
            };
        }

        paths[key] = path;
    }

    model = {
        ...model,
        paths: paths,
    };

    return model;
}

const nestedModel = nest(model);

const svg = makerjs.exporter.toSVG(model);
const nestedSvg = makerjs.exporter.toSVG(nestedModel);

console.log(svg);
console.log(nestedSvg);
