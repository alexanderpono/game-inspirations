import { Point2D, defaultPoint2D } from './GameField';
import { SIMObject, SimObjectActions, SimObjectSelectors } from './SIM.types';

export enum RocketStateID {
    DEFAULT = '',
    DEAD = 'DEAD',
    ALIVE = 'ALIVE'
}
const collideBoxLU: Point2D = { x: -3, y: -20 };
const collideBoxRD: Point2D = { x: 3, y: 20 };
export class SIMRocket extends SIMObject {
    type = 'SIMRocket';
    state: RocketStateID = RocketStateID.DEFAULT;
    xy: Point2D = { ...defaultPoint2D };
    moveDXDY: Point2D = {
        x: 0,
        y: -30
    };
    moveTimeMS = 1000;
    nextCalcTime = 0;
    calculationStep = 200;
    speed: Point2D = { ...defaultPoint2D };
    lastCalcTime = 0;

    onAdd = (simTime: number, data: SimRocketAdd) => {
        this.xy = { ...data.startXY };
        this.speed = {
            x: this.moveDXDY.x / this.moveTimeMS,
            y: this.moveDXDY.y / this.moveTimeMS
        };
        console.log(
            'SIMRocket:onAdd()',
            simTime,
            this.xy,
            this.speed,
            this.moveDXDY,
            this.moveTimeMS
        );
    };
    onStart = (simTime: number, actions: SimObjectActions, selectors: SimObjectSelectors) => {
        this.onSIMTimer(simTime, actions, selectors);
        this.nextCalcTime = simTime + this.calculationStep;
    };
    onSIMTimer = (
        simTime: number,
        actions: SimObjectActions,
        selectors: SimObjectSelectors
    ): boolean => {
        const rocketAlive = selectors.rocketAlive();
        if (!rocketAlive) {
            return;
        }
        if (simTime > this.nextCalcTime) {
            this.nextCalcTime = simTime + this.calculationStep;
            const xy = selectors.rocketXY();
            const newxy = {
                x: (xy.x += this.speed.x * (simTime - this.lastCalcTime)),
                y: (xy.y += this.speed.y * (simTime - this.lastCalcTime))
            };
            if (newxy.y < 0) {
                actions.rocketOut();
            }
            actions.rocketXY(newxy);

            const curCollideBoxLU: Point2D = {
                x: newxy.x + collideBoxLU.x,
                y: newxy.y + collideBoxLU.y
            };
            const curCollideBoxRD: Point2D = {
                x: newxy.x + collideBoxRD.x,
                y: newxy.y + collideBoxRD.y
            };
            actions.rocketCollideBoxLU(curCollideBoxLU);
            actions.rocketCollideBoxRD(curCollideBoxRD);

            this.lastCalcTime = simTime;
            console.log(
                'SIMRocket:onSIMTimer() time to calculate simTime=',
                simTime,
                xy,
                this.speed.x
            );
            return true;
        }
        return false;
    };
}

export interface SimRocketAdd {
    startXY: Point2D;
}
