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

    adjustResolution() {
        const { width, height } = this.portraitResolution;

        if (!sys.isMobile) {
            const ratioScale = window.innerHeight / height;
            const newWidth = ratioScale * width;

            screen.windowSize = new Size(newWidth, window.innerHeight);
        }
    }

    private setupResizeListener() {
        // Listen for window resize events
        window.addEventListener("resize", () => {
            setTimeout(() => {
                this.adjustResolution();
            }, 100);
        });
    }
}
