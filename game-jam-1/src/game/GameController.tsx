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
import { Cell, GameField } from './GameField';
import ImgSprite from '@src/components/GameFieldUI/sprite.png';
import { GameFieldUI } from '@src/components/GameFieldUI/GameFieldUI';
import { AbstractGraph } from './Graph.types';
import { SPRITE_HEIGHT, SPRITE_WIDTH } from '@src/ports/GR.types';

export class GameController {
    private gameState: GameState;
    private picLoaded: boolean = false;
    private emptyField: GameField = GameField.create();
    private graph: AbstractGraph = null;
    private gameField: GameField = null;
    private canvasW = 720;
    private canvasH = 520;
    private canvasRef: React.RefObject<HTMLCanvasElement>;

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
                    screenXY: {
                        x: 307,
                        y: 420
                    }
                }
            };

            this.curPathPos = 0;

            this.renderUI();
        });
    }

    renderUI = (): Promise<boolean> => {
        return new Promise((resolve) => {
            render(this.getUI(), document.getElementById(this.target));
        });
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

    stepNo = 0;
    maxMiniCounter = 9;
    curPathPos = 0;
    manVIndex: number;
    nextManVIndex: number;
    tick = () => {
        if ((this.gameState.miniCounter + 1) % 10 === 0) {
            if (this.curPathPos < this.graph.cheapestPath.length) {
                this.curPathPos++;
                this.stepNo++;
            }
            this.manVIndex = this.nextManVIndex;
            this.renderUI();
        } else {
            this.renderUI();
        }
        if (this.stepNo < this.graph.cheapestPath.length) {
            setTimeout(() => this.tick(), 25);
        } else {
            this.renderUI();
        }
    };

    getFieldWidth = (lines: string[]): number => {
        // const lines = text.trim().split('\n');
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
                    const ufo = new UFO();
                    ufo.screenXY = { x: x * SPRITE_WIDTH, y: y * SPRITE_HEIGHT };
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
                    // const protecto = new UFO();
                    protector.screenXY = { x: x * SPRITE_WIDTH, y: y * SPRITE_HEIGHT };
                    // ufos.push(ufo);
                }
            });
            return fieldLine;
        });
        return protector;
    };
}
