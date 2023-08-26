import { Point2D } from '@src/game/GameField';

export interface GameFieldController {}
export interface GameState {
    pic: InstanceType<typeof Image>;
    miniCounter: number;
}
export const defaultGameState: GameState = {
    pic: null,
    miniCounter: 0
};

export interface RenderOptions {}
export const defaultRenderOptions: RenderOptions = {};
