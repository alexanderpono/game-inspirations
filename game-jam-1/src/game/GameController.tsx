import React from 'react';
import { render } from 'react-dom';
import {
    FieldChar,
    GameState,
    Protector,
    RenderOptions,
    UFO,
    defaultGameState,
    defaultProtector
} from '@src/components/GameFieldUI/Game.types';
import { Cell, GameField, Point2D } from './GameField';
import ImgSprite from '@src/components/GameFieldUI/sprite.png';
import { GameFieldUI } from '@src/components/GameFieldUI/GameFieldUI';
import { AbstractGraph } from './Graph.types';
import { SPRITE_HEIGHT, SPRITE_WIDTH } from '@src/ports/GR.types';
import { SIMRocket } from './SIMRocket';
import { SIMObject } from './SIM.types';
import { SIMUFO } from './SIMUFO';
import { GRProtector } from '@src/ports/GRProtector';
import { GRUFO } from '@src/ports/GRUFO';

export class GameController {
    private gameState: GameState;
    private lastRenderState: GameState = { ...defaultGameState };
    private picLoaded: boolean = false;
    private emptyField: GameField = GameField.create();
    private graph: AbstractGraph = null;
    private gameField: GameField = null;
    private canvasW = 720;
    private canvasH = 520;
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private simObjects: SIMObject[];
    private simRocket: SIMRocket = null;
    private simTime: number = 0;
    private simStartTime: number = 0;

    constructor(private map: string, private target: string, options: RenderOptions) {
        this.gameState = {
            ...defaultGameState,
            pic: new Image(),
            miniCounter: 0
        };
        this.canvasRef = React.createRef<HTMLCanvasElement>();

        this.loadPic().then(() => {
            this.picLoaded = true;

            const getEmptyMap = (s: string): string => {
                let s2 = s.replace('$', ' ');
                s2 = s2.replace('M', ' ');
                return s2;
            };
            const emptyMap = getEmptyMap(this.map);
            const field = GameField.create().initFromText(emptyMap);
            this.emptyField = field;

            const gameField = GameField.create().initFromText(map);
            const ufo = this.getUFOFromText(map);

            const protector = this.getProtectorFromText(map);

            this.gameField = gameField;
            this.gameState = {
                ...this.gameState,
                ufo,
                protector,
                rocket: {
                    alive: true,
                    xy: {
                        x: protector.xy.x,
                        y: 420
                    },
                    collideBoxLU: {
                        x: protector.xy.x,
                        y: 420
                    },
                    collideBoxRD: {
                        x: protector.xy.x,
                        y: 420
                    }
                }
            };

            this.curPathPos = 0;

            this.renderUI();
            this.startSimulation(ufo);
        });
    }
    startSimulation = (ufos: UFO[]) => {
        this.simRocket = new SIMRocket();
        this.simObjects = [this.simRocket, ...ufos.map((ufo: UFO) => new SIMUFO(ufo.id))];
        this.simObjects.forEach((obj: SIMObject) => {
            if (obj.type === 'SIMRocket') {
                return obj.onAdd(this.simTime, {
                    startXY: {
                        x: 0,
                        y: 420
                    }
                });
            }
            return obj.onAdd(this.simTime, {});
        });
        this.simStartTime = Date.now();
        this.simObjects.forEach((obj: SIMObject) => {
            obj.onStart(this.simTime, this.actions, this.selectors);
        });
        this.simulationTick();
    };

    renderUI = () => {
        render(this.getUI(), document.getElementById(this.target));
        this.lastRenderState = this.gameState;
    };

    getUI = () => (
        <GameFieldUI
            field={this.gameField}
            emptyField={this.emptyField}
            graph={this.graph}
            id={this.target}
            canvasW={this.canvasW}
            canvasH={this.canvasH}
            ref={this.canvasRef}
            canvas={this.canvasRef.current}
            ctrl={this}
            gameState={this.gameState}
            picLoaded={this.picLoaded}
        />
    );

    loadPic = () => {
        return new Promise((resolve) => {
            this.gameState.pic.src = ImgSprite;
            this.gameState.pic.onload = function () {
                resolve(true);
            };
        });
    };

    patchState = (mixin: Partial<GameState>) => (this.gameState = { ...this.gameState, ...mixin });
    actions = {
        rocketXY: (xy: Point2D) =>
            this.patchState({ rocket: { ...this.gameState.rocket, xy: { ...xy } } }),
        rocketOut: () => this.patchState({ rocket: { ...this.gameState.rocket, alive: false } }),
        rocketCollideBoxLU: (xy: Point2D) =>
            this.patchState({ rocket: { ...this.gameState.rocket, collideBoxLU: { ...xy } } }),
        rocketCollideBoxRD: (xy: Point2D) =>
            this.patchState({ rocket: { ...this.gameState.rocket, collideBoxRD: { ...xy } } })
    };
    selectors = {
        rocketXY: (): Point2D => this.gameState.rocket.xy,
        ufo: (id: number): UFO => this.gameState.ufo.find((ufo) => ufo.id === id),
        rocketAlive: () => this.gameState.rocket.alive,
        rocketCollideBoxLU: (): Point2D => this.gameState.rocket.collideBoxLU,
        rocketCollideBoxRD: (): Point2D => this.gameState.rocket.collideBoxRD
    };
    events = {
        ufoRocketCollide: (ufoId: number) => {
            console.error('ufoRocketCollide() ufoId=', ufoId);
            const ufoStateIndex = this.gameState.ufo.findIndex((ufo) => ufo.id === ufoId);
            if (ufoStateIndex === -1) {
                console.error('ufoRocketCollide() cannot find STATE ufo', ufoId);
                return;
            }
            const ufoSimIndex = this.simObjects.findIndex((obj: SIMObject) => {
                if (obj.type !== 'SIMUFO') {
                    return false;
                }
                return (obj as SIMUFO).UFOID === ufoId;
            });
            if (ufoSimIndex === -1) {
                console.error('ufoRocketCollide() cannot find SIM ufo', ufoId);
                return;
            }
            this.simObjects.splice(ufoSimIndex, 1);
            this.patchState({
                rocket: { ...this.gameState.rocket, alive: false },
                ufo: [
                    ...this.gameState.ufo.slice(0, ufoStateIndex),
                    ...this.gameState.ufo.slice(ufoStateIndex + 1)
                ]
            });
        }
    };

    stepNo = 0;
    maxMiniCounter = 9;
    curPathPos = 0;
    manVIndex: number;
    nextManVIndex: number;
    simulationTick = () => {
        const simStep = 100;
        this.simTime = Date.now() - this.simStartTime;
        this.simObjects.forEach((obj: SIMObject) => {
            obj.onSIMTimer(this.simTime, this.actions, this.selectors, this.events);
        });

        const stateChanged = this.gameState !== this.lastRenderState;
        if (stateChanged) {
            console.log('simulationTick() stateChanged its timeto render');
            this.renderUI();
        }

        setTimeout(() => this.simulationTick(), simStep);
    };

    getFieldWidth = (lines: string[]): number => {
        const fieldWidth = lines.reduce(
            (width: number, line) => (line.length < width ? width : line.length),
            0
        );
        return fieldWidth;
    };

    getUFOFromText = (text: string): UFO[] => {
        const lines = text.trim().split('\n');
        const fieldWidth = this.getFieldWidth(lines);

        const ufos: UFO[] = [];
        lines.forEach((line: string, y: number) => {
            const fieldLine = Array(fieldWidth).fill(Cell.space);
            line.split('').forEach((char: string, x: number) => {
                if (char === FieldChar.ufo) {
                    const ufo = new UFO(ufos.length + 1);
                    ufo.xy = GRUFO.toXY({ x: x * SPRITE_WIDTH, y: y * SPRITE_HEIGHT });
                    ufos.push(ufo);
                }
            });
            return fieldLine;
        });
        return ufos;
    };

    getProtectorFromText = (text: string): Protector => {
        const lines = text.trim().split('\n');
        const fieldWidth = this.getFieldWidth(lines);

        const protector = defaultProtector;
        lines.forEach((line: string, y: number) => {
            const fieldLine = Array(fieldWidth).fill(Cell.space);
            line.split('').forEach((char: string, x: number) => {
                if (char === FieldChar.protector) {
                    protector.xy = GRProtector.toXY({ x: x * SPRITE_WIDTH, y: y * SPRITE_HEIGHT });
                }
            });
            return fieldLine;
        });
        return protector;
    };
}
