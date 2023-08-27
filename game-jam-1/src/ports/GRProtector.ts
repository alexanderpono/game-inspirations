import { SPRITE_HEIGHT, SPRITE_WIDTH, Sprite, protector } from './GR.types';
import { putSprite_ } from './GR.lib';
import { Point2D } from '@src/game/GameField';

const simXYToScreenXY: Point2D = {
    x: -SPRITE_WIDTH,
    y: -SPRITE_HEIGHT / 2
};

export class GRProtector {
    constructor(
        private context: CanvasRenderingContext2D,
        private xy: Point2D,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        const sprite: Sprite = protector;
        const screenXY = GRProtector.toScreenXY(this.xy);
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
    ): GRProtector => new GRProtector(context, xy, pic);
}
