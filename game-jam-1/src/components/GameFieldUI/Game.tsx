import { GameField, Point2D } from '@src/game/GameField';
import React from 'react';
import ImgSprite from './sprite.png';
import { GameFieldUI } from './GameFieldUI';
import { GameFieldController, RenderOptions } from './Game.types';
import { SPRITE_HEIGHT, SPRITE_WIDTH } from '@src/ports/GR.types';

interface GameProps {
    options: RenderOptions;
    id: string;
    title: string;
    canvasW?: number;
    canvasH?: number;
    showControls?: boolean;
    map: string;
}

export const Game: React.FC<GameProps> = ({
    options: startRender,
    id,
    canvasW,
    canvasH,
    showControls,
    map
}) => {
    const [graph, setGraph] = React.useState(null);
    const [gameField, setGameField] = React.useState(GameField.create());
    const [emptyField, setEmptyField] = React.useState(GameField.create());
    const [picLoaded, setPicLoaded] = React.useState(false);

    const [game, setGameState] = React.useState({
        showControls: typeof showControls === 'boolean' ? showControls : true,
        pic: new Image(),
        canvas: null,
        miniCounter: 0,
        showBtMap: false
    });

    React.useEffect(() => {
        const pic = game.pic;
        pic.src = ImgSprite;

        pic.onload = () => {
            setPicLoaded(true);
        };
        setGameState({ ...game, pic });
    }, []);

    const getEmptyMap = (s: string): string => {
        let s2 = s.replace('$', ' ');
        s2 = s2.replace('M', ' ');
        return s2;
    };
    const calcManScreenPos = (
        manFieldXY: Point2D,
        nextManFieldXY: Point2D,
        miniCounter: number
    ) => {
        const deltaX = nextManFieldXY.x - manFieldXY.x;
        const deltaY = nextManFieldXY.y - manFieldXY.y;
        const manScreenXY = {
            x: (manFieldXY.x + (deltaX / 10) * (miniCounter % 10)) * SPRITE_WIDTH,
            y: (manFieldXY.y + (deltaY / 10) * (miniCounter % 10)) * SPRITE_HEIGHT
        };
        return manScreenXY;
    };

    React.useEffect(() => {
        const emptyMap = getEmptyMap(map);
        const field = GameField.create().initFromText(emptyMap);
        setEmptyField(field);

        const gameField = GameField.create().initFromText(map);
        const w = gameField.getWidth();

        setGraph(graph);
        setGameField(gameField);
    }, []);

    const canvasRef = React.createRef<HTMLCanvasElement>();
    const [canvas, setCanvas] = React.useState(null);
    React.useEffect(() => {
        setCanvas(canvasRef.current);
    }, [canvasRef.current]);

    const ctrl: GameFieldController = {};
    const w = typeof canvasW === 'number' ? canvasW : 720;
    const h = typeof canvasH === 'number' ? canvasH : 320;
    return (
        <GameFieldUI
            field={gameField}
            emptyField={emptyField}
            graph={graph}
            id={id}
            canvasW={w}
            canvasH={h}
            ref={canvasRef}
            canvas={canvas}
            ctrl={ctrl}
            gameState={game}
            picLoaded={picLoaded}
        />
    );
};
