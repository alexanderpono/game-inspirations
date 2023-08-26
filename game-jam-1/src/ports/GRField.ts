import { Cell, GameField } from '@src/game/GameField';
import { Sprite, space } from '@src/ports/GR.types';
import { putSprite } from '@src/ports/GR.lib';

export class GRField {
    constructor(
        private context: CanvasRenderingContext2D,
        private field: GameField,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        this.field.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) => {
                let sprite: Sprite = space;
                putSprite(this.context, this.pic, sprite, x, y);
            });
        });
    };

    static create = (
        context: CanvasRenderingContext2D,
        field: GameField,
        pic: CanvasImageSource
    ): GRField => new GRField(context, field, pic);
}
