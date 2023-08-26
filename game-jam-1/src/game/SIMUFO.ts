import { Point2D } from './GameField';
import { SIMObject, SimObjectActions, SimObjectEvents, SimObjectSelectors } from './SIM.types';
import { rocket, ufo } from '@src/ports/GR.types';

export enum UFOStateID {
    DEFAULT = '',
    ALIVE = 'ALIVE'
}
export class SIMUFO extends SIMObject {
    type = 'SIMUFO';
    state: UFOStateID = UFOStateID.DEFAULT;
    private rw2 = rocket.w / 2;
    private rh2 = rocket.h / 2;
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
        const rocketXY = selectors.rocketXY();
        if (typeof ufoState === 'undefined') {
            console.log('cannot find at state ufo with id=', this.UFOID);
            return;
        }
        const rocketMinX = rocketXY.x - this.rw2;
        const rocketMaxX = rocketXY.x + this.rw2;
        const rocketMinY = rocketXY.y - this.rh2;
        const rocketMaxY = rocketXY.y + this.rh2;
        const rocketLU: Point2D = {
            x: rocketMinX,
            y: rocketMinY
        };
        const rocketLD: Point2D = {
            x: rocketMinX,
            y: rocketMaxY
        };
        const rocketRD: Point2D = {
            x: rocketMaxX,
            y: rocketMaxY
        };
        const rocketRU: Point2D = {
            x: rocketMaxX,
            y: rocketMinY
        };

        const ufoLU: Point2D = {
            x: ufoState.screenXY.x - this.w2,
            y: ufoState.screenXY.y - this.h2
        };
        const ufoRD: Point2D = {
            x: ufoState.screenXY.x + this.w2,
            y: ufoState.screenXY.y + this.h2
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
