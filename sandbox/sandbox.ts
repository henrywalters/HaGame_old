import GameObject from '../core/objects/concrete/GameObject';
import SceneManager from '../core/managers/SceneManager';
import Logger from './../common/utils/Logger';
import Scene from '../core/objects/concrete/Scene';

export default class Sandbox {
    constructor() {
        new Logger();
        // Create our first scene
        let sceneManager = new SceneManager();
        sceneManager.addScene('sandbox_scene', new Scene());
        let scene = sceneManager.Current;

        let player = new GameObject();
        
        scene.add('player', player);

        Logger.log('player', 'Initialized');
    }
}