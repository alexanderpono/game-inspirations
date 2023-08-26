import { SPRITE_HEIGHT, SPRITE_WIDTH, Sprite, rocket } from './GR.types';
import { putSprite_ } from './GR.lib';
import { Point2D } from '@src/game/GameField';

const simXYToScreenXY: Point2D = {
    x: -SPRITE_WIDTH / 2,
    y: -SPRITE_HEIGHT / 2
};

export class GRRocket {
    constructor(
        private context: CanvasRenderingContext2D,
        private xy: Point2D,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        const sprite: Sprite = rocket;
        const screenXY = GRRocket.toScreenXY(this.xy);
        putSprite_(this.context, this.pic, sprite, screenXY.x, screenXY.y);
    };

    static toScreenXY = (xy: Point2D): Point2D => ({
        x: xy.x + simXYToScreenXY.x,
        y: xy.y + simXYToScreenXY.y
    });

    static toXY = (screenXY: Point2D): Point2D => ({
        x: screenXY.x - simXYToScreenXY.x,
        y: screenXY.y - simXYToScreenXY.y
    });

    static create = (
        context: CanvasRenderingContext2D,
        xy: Point2D,
        pic: CanvasImageSource
    ): GRRocket => new GRRocket(context, xy, pic);
}
