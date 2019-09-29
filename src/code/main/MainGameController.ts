import { MainGameView } from "./MainGameView";
import { MainGameModel } from "./MainGameModel";

export class MainGameController {
  view: MainGameView;
  model: MainGameModel;

  onButtonPressed() {
    this.changeState();
    setTimeout(this.changeState.bind(this), 2000);
  }

  changeState() {
    if (this.model.state === "idle") {
      this.model.state = "accelerated";
    } else {
      this.model.state = "idle"
    }
  }
}