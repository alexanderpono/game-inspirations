import { UFO } from '@src/components/GameFieldUI/Game.types';
import { Point2D } from './GameField';

export interface SimObjectActions {
    rocketXY: (xy: Point2D) => void;
    rocketOut: () => void;
}
export interface SimObjectSelectors {
    rocketXY: () => Point2D;
    ufo: (id: number) => UFO;
    rocketAlive: () => boolean;
}

export interface SimObjectEvents {
    ufoRocketCollide: (ufoId: number) => void;
}

export class SIMObject {
    type: string;

    onAdd = (simTime: number, data) => {};
    onStart = (simTime: number, actions: SimObjectActions, selectors: SimObjectSelectors) => {};
    onSIMTimer = (
        simTime: number,
        actions: SimObjectActions,
        selectors: SimObjectSelectors,
        events: SimObjectEvents
    ) => {
        return false;
    };
}
