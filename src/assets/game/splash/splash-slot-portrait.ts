import { _decorator, ProgressBar } from "cc";
import Splash from "db://shared-components/splash/scripts/components/splash";
const { ccclass, property } = _decorator;

@ccclass
export class SplashSlotPortrait extends Splash {
    handleProgressIndex(progress: number) {
        super.handleProgressIndex(progress);
        if (progress > 0) {
            const progressBar = this.containerCustomize.children[0]?.getComponent(ProgressBar);
            progressBar && (progressBar.progress = progress);
        }
    }
}
