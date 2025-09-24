import { _decorator, Component, screen, Size, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("game_resize_window")
export class GameResizeWindow extends Component {
    private readonly portraitResolution = {
        width: 786,
        height: 1398,
    };

    protected onLoad(): void {
        this.adjustResolution();
        this.setupResizeListener();
    }

    protected onDestroy(): void {
        window.removeEventListener("resize", this.resizeWindow);
    }

    adjustResolution() {
        const { width, height } = this.portraitResolution;

        if (!sys.isMobile) {
            const gameContainer = document.getElementById("Cocos3dGameContainer");
            gameContainer.style.position = "relative";
            // For desktop browsers, use the original logic
            const ratioScale = window.innerHeight / height;
            const newWidth = ratioScale * width;

            screen.windowSize = new Size(newWidth, window.innerHeight);
        }
    }

    private resizeWindow() {
        setTimeout(() => {
            if (this.node.isValid) {
                this.adjustResolution();
            }
        }, 100);
    }

    private setupResizeListener() {
        // Listen for window resize events
        window.addEventListener("resize", this.resizeWindow);
    }
}
