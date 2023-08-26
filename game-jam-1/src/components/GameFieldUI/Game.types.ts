import { Point2D } from '@src/game/GameField';

export interface GameFieldController {}
export interface GameState {
    pic: InstanceType<typeof Image>;
    miniCounter: number;
    ufo: UFO[];
    protector: Protector;
    rocket: Rocket;
}

export const defaultProtector: Protector = {
    screenXY: { x: 0, y: 0 }
};
export const defaultRocket: Rocket = {
    screenXY: { x: 0, y: 0 },
    alive: false
};
export const defaultGameState: GameState = {
    pic: null,
    miniCounter: 0,
    ufo: [],
    protector: defaultProtector,
    rocket: defaultRocket
};

export interface RenderOptions {}
export const defaultRenderOptions: RenderOptions = {};

export class UFO {
    screenXY: Point2D;
}

export enum FieldChar {
    wall = '▓',
    ufo = 'u',
    protector = 'p'
}

export interface Protector {
    screenXY: Point2D;
}
export interface Rocket {
    alive: boolean;
    screenXY: Point2D;
}
