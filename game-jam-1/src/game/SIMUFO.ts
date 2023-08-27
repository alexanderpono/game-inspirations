import { Point2D } from './GameField';
import { SIMObject, SimObjectActions, SimObjectEvents, SimObjectSelectors } from './SIM.types';
import { rocket, ufo } from '@src/ports/GR.types';

export enum UFOStateID {
    DEFAULT = '',
    ALIVE = 'ALIVE'
}
const collideBoxLU: Point2D = { x: -25, y: -20 };
const collideBoxRD: Point2D = { x: 25, y: 8 };

export class SIMUFO extends SIMObject {
    type = 'SIMUFO';
    state: UFOStateID = UFOStateID.DEFAULT;
    private w2 = ufo.w / 2;
    private h2 = ufo.h / 2;

    constructor(public UFOID: number) {
        super();
    }

    pointInsideBox = (p: Point2D, boxLU: Point2D, boxRD: Point2D): boolean => {
        return boxLU.x < p.x && p.x < boxRD.x && boxLU.y < p.y && p.y < boxRD.y;
    };
    onSIMTimer = (
        simTime: number,
        actions: SimObjectActions,
        selectors: SimObjectSelectors,
        events: SimObjectEvents
    ): boolean => {
        const rocketAlive = selectors.rocketAlive();
        if (!rocketAlive) {
            return;
        }
        const ufoState = selectors.ufo(this.UFOID);
        if (typeof ufoState === 'undefined') {
            console.log('cannot find at state ufo with id=', this.UFOID);
            return;
        }
        const rocketLU = selectors.rocketCollideBoxLU();
        const rocketRD = selectors.rocketCollideBoxRD();

        const rocketLD: Point2D = {
            x: rocketLU.x,
            y: rocketRD.y
        };
        const rocketRU: Point2D = {
            x: rocketRD.x,
            y: rocketLU.y
        };

        const ufoLU: Point2D = {
            x: ufoState.xy.x + collideBoxLU.x,
            y: ufoState.xy.y + collideBoxLU.y
        };
        const ufoRD: Point2D = {
            x: ufoState.xy.x + collideBoxRD.x,
            y: ufoState.xy.y + collideBoxRD.y
        };

        const hit =
            this.pointInsideBox(rocketLU, ufoLU, ufoRD) ||
            this.pointInsideBox(rocketRU, ufoLU, ufoRD) ||
            this.pointInsideBox(rocketRD, ufoLU, ufoRD) ||
            this.pointInsideBox(rocketLD, ufoLU, ufoRD);
        if (hit) {
            events.ufoRocketCollide(this.UFOID);
        }
        return false;
    };
}

export interface SimRocketAdd {
    startXY: Point2D;
}
