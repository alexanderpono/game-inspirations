// (c) Alexander Ponomarenko brain16383@yandex.ru

window.CSIM_simulation = function()
{
    SIM.newTick();
}

export const INTRO = 'intro';
export const PLAY = 'play';
export const GAME_OVER = 'gameOver';


export var SIM = {
    SIMTime : null,
    SIMBird : null,
    SIMCollide : null,
    SIMBricks : null,
    UI: null,
    state : INTRO,
    m_tickStep : 0.05,

    init : function()
    {
        this.SIMTime.init(this.m_tickStep);
        this.SIMBird.init(this.m_tickStep);
        this.SIMCollide.init();
        this.SIMBricks.init();
    },

    go : function(gameState)
    {
        if (typeof gameState === "undefined") {
            gameState = INTRO;
        }
        this.setState(gameState);
        this.SIMTime.start();
        this.SIMBird.start();
        this.SIMCollide.start();
        this.SIMBricks.start();
        this.tick();
    },

    tick : function()
    {
        this.SIMBird.calc();
        if (
            this.SIMCollide.collisionWithGround() ||
            this.SIMCollide.collisionWithSky() ||
            this.SIMCollide.collisionWithBrick()
        )
        {
            this.setState(GAME_OVER);
        };

        this.UI.draw();
        if(this.playing())
        {
            var timeToSleep = this.SIMTime.getSleepTime();
            setTimeout("CSIM_simulation()", timeToSleep);

        };
        this.SIMBricks.update();
    },

    newTick : function()
    {
        this.SIMTime.newTick();
        this.tick();
    },

    gameIsOver() {
        return (this.state === GAME_OVER);
    },

    playing() {
        return (this.state === PLAY);
    },

    isIntro() {
        return (this.state === INTRO);
    },

    setState(newState) {
        this.state = newState;

        let body = document.getElementById('body');
        body.className = newState;
    },

    getState() {
        return this.state;
    },

    restartGame() {
        this.SIMBricks.init();
        this.go(PLAY);
    },

    setSIMTime(SIMTime) {
        this.SIMTime = SIMTime;
    }
};

