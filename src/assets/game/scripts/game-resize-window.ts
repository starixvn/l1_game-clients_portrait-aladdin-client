import { _decorator, Component, screen, Size, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("game-resize-window")
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

            const dpr = screen.devicePixelRatio || 1;

            screen.windowSize = new Size(Math.round(newWidth * dpr), Math.round(window.innerHeight * dpr));
        }
    }

    debounce(func: any, wait: number) {
        let timeout: any;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    private resizeWindow() {
        setTimeout(() => {
            this.adjustResolution();
        }, 100);
    }

    private setupResizeListener() {
        const debouncedResizeWindow = this.debounce(this.resizeWindow, 100);
        // Listen for window resize events
        window.addEventListener("resize", debouncedResizeWindow);
    }
}
