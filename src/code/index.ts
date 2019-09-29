import { MainGameView } from "./main/MainGameView";
import { MainGameController } from "./main/MainGameController";
import { MainGameModel } from "./main/MainGameModel";

const renderer = PIXI.autoDetectRenderer(1200, 800);
document.body.appendChild(renderer.view);

//window.addEventListener("DOMContentLoaded", (): void => {
//    alert("How are you doing, mate?");
// });

const view  = new MainGameView();
const controller = new MainGameController();
const model = new MainGameModel();

view.model = model;
view.controller = controller;

controller.model = model;
controller.view = view;

function animate() {
    // render the stage
    renderer.render(view.container);
    view.animate();
    requestAnimationFrame(animate);
}
animate();