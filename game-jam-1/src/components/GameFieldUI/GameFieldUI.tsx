import { GameField } from '@src/game/GameField';
import React from 'react';
import { GRField } from '@src/ports/GRField';
import { AbstractGraph } from '@src/game/Graph.types';
import { GameFieldController, GameState, RenderOptions, UFO } from './Game.types';
import { GRUFO } from '@src/ports/GRUFO';
import { GRProtector } from '@src/ports/GRProtector';
import { GRRocket } from '@src/ports/GRRocket';

interface GameFieldUIProps {
    field: GameField;
    emptyField: GameField;
    graph: AbstractGraph;
    id: string;
    canvasW?: number;
    canvasH?: number;
    canvas: HTMLCanvasElement;
    ctrl: GameFieldController;
    gameState: GameState;
    picLoaded: boolean;
}

export const GameFieldUI = React.forwardRef<HTMLCanvasElement, GameFieldUIProps>(
    ({ canvasW, canvasH, canvas, gameState, emptyField, picLoaded }, canvasRef) => {
        React.useEffect(() => {
            if (!picLoaded) {
                return;
            }

            if (canvas === null) {
                return;
            }
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            context.fillStyle = 'orange';
            context.strokeStyle = '#FF0000';
            context.lineWidth = 3;
            context.strokeRect(0, 0, canvas.width, canvas.height);

            if (canvas === null || context === null) {
                return;
            }

            const options: RenderOptions = {};

            GRField.create(context, emptyField, gameState.pic).draw();
            gameState.ufo.forEach((ufo: UFO) => {
                GRUFO.create(context, ufo.screenXY, gameState.pic).draw();
            });
            GRProtector.create(context, gameState.protector.screenXY, gameState.pic).draw();
            if (gameState.rocket.alive) {
                GRRocket.create(context, gameState.rocket.screenXY, gameState.pic).draw();
            }
        }, [gameState, canvas, picLoaded]);

        return (
            <div style={{ width: '720px' }}>
                <canvas height={canvasH} width={canvasW} id="GraphUI" ref={canvasRef}></canvas>
            </div>
        );
    }
);
