import {positions} from "./Positions"
import { MainGameController } from "./MainGameController";
import { MainGameModel } from "./MainGameModel";

const SYMBOLS_PATHS = [
  "assets/SYM1.png",
  "assets/SYM3.png",
  "assets/SYM4.png",
  "assets/SYM5.png",
  "assets/SYM6.png",
  "assets/SYM7.png"
]

export class MainGameView {
  controller: MainGameController;
  model: MainGameModel;
  container: PIXI.Container;
  symbols: { symbol: PIXI.Sprite, phase: number }[] = [];
  textures: any; //button
  speed: any;

  constructor() {
    this.textures = {
      active: PIXI.Texture.fromImage("assets/btn-active.png"),
      inactive: PIXI.Texture.fromImage("assets/btn-inactive.png"),
    }
    this.speed = {
      idle: 0.001,
      accelerated: 0.004
    }
    this.initAnimations();

  }

  createSymbols() {
    SYMBOLS_PATHS.forEach((path: string, index) => {
      const symbol = this.createSymbol(path, index);
      this.symbols.push({
        symbol,
        phase: 0
      });
      this.container.addChild(symbol);
    });
    const symCount = SYMBOLS_PATHS.length;
    this.symbols.forEach((symbol, index) => {
      symbol.phase = index/symCount;
    });
  }

  createSymbol(path: string, index: number) {
    const symbol = new PIXI.Sprite(PIXI.Texture.fromImage(path));
    symbol.anchor.set(0.5); 
    return symbol;
  }

  initAnimations() {
    this.container = new PIXI.Container;
    this.setBackground();
    const button = this.createButton();
    this.container.addChild(button);
    this.createSymbols();
  }

  setBackground() {
    const bg = PIXI.Sprite.fromImage("assets/background.jpg");
    bg.width = 1200;
    bg.height = 800;
    this.container.addChild(bg);
  }

  createButton() {
    const button = new PIXI.Sprite(this.textures.active);
    button.buttonMode = true;
    button.anchor.set(positions.button.anchor.x, positions.button.anchor.y);
    button.position.set(positions.button.position.x, positions.button.position.y);
    button.interactive = true;
    button.name = "mainButton";
    
    button.on("mousedown", this.onButtonPressed.bind(this));
    return button;
  }

  onButtonPressed() {
    this.controller.onButtonPressed();
    this.refresh();   
  }

  animate() {
    this.symbols.forEach((symbol) => {
      const speed = this.model.state === "idle" ? this.speed.idle : this.speed.accelerated;
      symbol.phase += speed;
      this.calculatePosition(symbol);
    });
    this.refresh();
  }
  
  refresh() {
    const button = this.container.getChildByName("mainButton") as PIXI.Sprite;
    switch (this.model.state) {
      case "idle":
        button.texture = this.textures.active;
        break;
      case "accelerated": 
        button.texture = this.textures.inactive;
        break;
    }
  }

  calculatePosition({symbol, phase}: { symbol: PIXI.Sprite, phase: number }) {
    const radius = 250;
    const center = positions.button.position;
    const x = center.x + radius * Math.cos(2 * Math.PI * phase);
    const y = center.y + radius * Math.sin(2 * Math.PI * phase);
    symbol.position.set(x, y);
  }
}