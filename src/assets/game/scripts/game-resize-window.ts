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

        if (sys.isMobile) {
            // For mobile devices, use screen size and account for device pixel ratio
            const screenWidth = window.screen.width || window.innerWidth;
            const screenHeight = window.screen.height || window.innerHeight;

            // Use the smaller dimension to maintain aspect ratio
            const ratioScale = Math.min(screenHeight / height, screenWidth / width);
            const newWidth = ratioScale * width;
            const newHeight = ratioScale * height;

            screen.windowSize = new Size(newWidth, newHeight);
        } else {
            // For desktop browsers, use the original logic
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

        // For mobile devices, also listen for orientation changes
        if (sys.isMobile) {
            window.addEventListener("orientationchange", () => {
                setTimeout(() => {
                    this.adjustResolution();
                }, 300); // Longer delay for orientation change
            });
        }
    }
}
