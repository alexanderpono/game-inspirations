import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

export default {
    title: 'Game',
    decorators: [withKnobs]
};

const map = `
▓ M              ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

const options = {
    nodes: false,
    lines: false,
    path: true,
    nodesCost: false,
    nodesShortCost: false,
    map: true,
    highlightCells: []
};

export const CalcWrong = () => {
    return <div>CalcWrong</div>;
};
