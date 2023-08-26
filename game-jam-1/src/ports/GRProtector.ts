import { Sprite, protector } from './GR.types';
import { putSprite_ } from './GR.lib';
import { Point2D } from '@src/game/GameField';

export class GRProtector {
    constructor(
        private context: CanvasRenderingContext2D,
        private xy: Point2D,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        const sprite: Sprite = protector;
        putSprite_(this.context, this.pic, sprite, this.xy.x, this.xy.y);
    };

    static create = (
        context: CanvasRenderingContext2D,
        xy: Point2D,
        pic: CanvasImageSource
    ): GRProtector => new GRProtector(context, xy, pic);
}
