export const SPRITE_WIDTH = 40;
export const SPRITE_HEIGHT = 40;
export interface Sprite {
    x: number;
    y: number;
    w: number;
    h: number;
}
export const wall: Sprite = {
    x: 40,
    y: 120,
    w: SPRITE_WIDTH,
    h: SPRITE_HEIGHT
};
export const space: Sprite = {
    x: 0,
    y: 120,
    w: SPRITE_WIDTH,
    h: SPRITE_HEIGHT
};
export const select: Sprite = {
    x: 0,
    y: 40,
    w: SPRITE_WIDTH,
    h: SPRITE_HEIGHT
};
export const ufo: Sprite = {
    x: 40,
    y: 40,
    w: SPRITE_WIDTH * 2,
    h: SPRITE_HEIGHT
};
export const protector: Sprite = {
    x: 120,
    y: 40,
    w: SPRITE_WIDTH * 2,
    h: SPRITE_HEIGHT
};
export const rocket: Sprite = {
    x: 200,
    y: 40,
    w: SPRITE_WIDTH * 1,
    h: SPRITE_HEIGHT
};
