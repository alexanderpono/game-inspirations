export const SPRITE_WIDTH = 40;
export const SPRITE_HEIGHT = 40;
export interface Sprite {
    x: number;
    y: number;
    w: number;
}
export const wall: Sprite = {
    x: 40,
    y: 120,
    w: SPRITE_WIDTH
};
export const space: Sprite = {
    x: 0,
    y: 120,
    w: SPRITE_WIDTH
};
export const select: Sprite = {
    x: 0,
    y: 40,
    w: SPRITE_WIDTH
};
export const ufo: Sprite = {
    x: 40,
    y: 40,
    w: SPRITE_WIDTH * 2
};
export const protector: Sprite = {
    x: 120,
    y: 40,
    w: SPRITE_WIDTH * 2
};
export const rocket: Sprite = {
    x: 200,
    y: 40,
    w: SPRITE_WIDTH * 1
};
