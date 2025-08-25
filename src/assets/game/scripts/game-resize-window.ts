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
            const gameDiv = document.getElementById("GameDiv");
            gameDiv.style.width = "100% !important";
            gameDiv.style.height = "100% !important";
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
