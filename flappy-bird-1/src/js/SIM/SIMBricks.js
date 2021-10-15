export var SIMBricks = {
    m_instanceName : 'SIM.SIMBricks',
    m_data : [],
    UIViewPort: null,
    UIBricks: null,
    SIMBird: null,

    init() {
        this.build();
    },

    start() {
    },

    build() {
        this.m_data = [[5,0,5], [10,0,4],[15,15,5], [20,0,3], [25,0,8], [30,0,5], [30,10,10]];
        //x,y,h
    },

    getData() {
        return this.m_data;
    },

    update() {
        const distance   = this.SIMBird.getDistance();
        const VPModelW   = this.UIViewPort.getVPModelW();
        const brickSimW  = this.UIBricks.getBrickSimW();
        let bricksCount = this.m_data.length;
        let availableBricks = this.getAvailableBricks();
        for (let i=0; i<this.m_data.length; i++)
        {
            let brickAr = this.m_data[i];

            if (!this.isBrickVisible(brickAr))
            {
                let retries = 20;
                for (let j=0; j<retries; j++) {
                    var newBrick = this.createBrick(bricksCount);
                    const ok = this.isNewBrickOk(newBrick, availableBricks);
                    if (ok) {
                        break;
                    }
                    else {
                    };
                };
                this.m_data[i] = newBrick;
                availableBricks = this.getAvailableBricks();
                bricksCount++;
            };
        };

    },

    getAvailableBricks() {
        let visibleBricks = [];
        for (let i=0; i<this.m_data.length; i++) {
            let brickAr = this.m_data[i];
            if (this.isBrickVisible(brickAr)) {
                visibleBricks[i] = brickAr;
            };
        };
        return visibleBricks;
    },

    isBrickVisible(brickAr) {
        const distance   = this.SIMBird.getDistance();
        const brickSimW  = this.UIBricks.getBrickSimW();
        const simX = brickAr[0];
        const brickIsVisible = !((simX + brickSimW) < distance);
        return brickIsVisible;
    },

    isNewBrickOk(newBrick, availableBricks) {
        let ok = true;
        let [x, y, h] = newBrick;
        var VPModelH   = this.UIViewPort.getVPModelH();
        availableBricks.forEach((brick) => {
            let [brickX, brickY, brickH] = brick;
            let testX = (Math.abs(x - brickX) <= 1);

            const dx = Math.abs(x - brickX);
            const dy = VPModelH - brickH - h;

            if (
                (dx <= 1) ||
                (dx*dy < 6)
            ) {
                ok = false;
            };

        });

        return ok;
    },

    createBrick(bricksCount) {
        let rndTopBottom  = Math.random();
        let simH          = Math.round(Math.random() * 10);
        let top = false;
        if (rndTopBottom < 0.5) {
            top = true;
        };

        const simX = Math.round(this.SIMBird.getDistance() +
            this.UIViewPort.getVPModelW() + Math.random() * bricksCount);

        let simY = 0;

        if (top) {
            simY = this.UIViewPort.getVPModelH() - simH;
        };

        return [simX, simY, simH];
    }


};
