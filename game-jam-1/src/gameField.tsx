import './app.css';
import { RenderOptions, defaultRenderOptions } from './components/GameFieldUI/Game.types';
import { GameController } from './game/GameController';

console.log('gameField!');

const map1 = `
▓                







    u u u u u


       p
                 ▓
`;
const MAP = { ...defaultRenderOptions, map: true };

renderGameField(map1, 'map1', MAP);

function renderGameField(map: string, target: string, options: RenderOptions) {
    new GameController(map, target, options).renderUI();
}
