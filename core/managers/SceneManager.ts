import IHashMap from '../../common/dataStructures/IHashMap';
import IScene from '../objects/interface/IScene';

export default class SceneManager {
  Scenes: IHashMap<IScene>;
  CurrentScene: IScene | null;

  constructor() {
    this.Scenes = {};
    this.CurrentScene = null;
  }

  addScene(id: string, scene: IScene) {
    this.Scenes[id] = scene;
    if (this.CurrentScene === null) {
      this.CurrentScene = scene;
    }
  }

  setActiveScene(id: string) {
    if (this.Scenes[id] === null) {
      throw new Error('Scene does not exist');
    } else {
      this.CurrentScene = this.Scenes[id];
    }
  }

  getScene(id: string): IScene {
    if (this.Scenes[id] === null) {
      throw new Error('Scene does not exist');
    } else {
      return this.Scenes[id];
    }
  }

  get Current(): IScene {
    if (this.CurrentScene === null) {
      throw new Error('no scenes exist');
    } else {
      return this.CurrentScene;
    }
  }
}