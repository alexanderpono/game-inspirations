import React from 'react';
import { render } from 'react-dom';
import { GameState, RenderOptions, defaultGameState } from '@src/components/GameFieldUI/Game.types';
import { GameField } from './GameField';
import ImgSprite from '@src/components/GameFieldUI/sprite.png';
import { GameFieldUI } from '@src/components/GameFieldUI/GameFieldUI';
import { AbstractGraph } from './Graph.types';

export class GameController {
    private gameState: GameState;
    private picLoaded: boolean = false;
    private emptyField: GameField = GameField.create();
    private graph: AbstractGraph = null;
    private gameField: GameField = null;
    private canvasW = 720;
    private canvasH = 720;
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

            this.gameField = gameField;
            this.gameState = { ...this.gameState };

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
}
