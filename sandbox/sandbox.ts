import Renderer from '../core/objects/concrete/Renderer';
import GameObject from '../core/objects/concrete/GameObject';
import SceneManager from '../core/managers/SceneManager';
import Logger from './../common/utils/Logger';
import Scene from '../core/objects/concrete/Scene';
import Cube from '../components/concrete/geometries/Cube';
import BasicMaterial from '../components/concrete/materials/BasicMaterial';
import PerspectiveCamera from '../core/objects/concrete/Camera';
import { ComponentType } from '../core/objects/concrete/GameObject';
import GamepadInputManager from '../core/managers/GamepadInputManager';
// import GamepadInput from '../core/objects/concrete/GamepadInput';

function random(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
}

export default class Sandbox {
    constructor() {

        const height = window.innerHeight;
        const width = window.innerWidth;
        
        new Logger();

        let inputs = new GamepadInputManager();
        inputs.showDevices();
        // Create our first scene
        let sceneManager = new SceneManager();
        sceneManager.addScene('sandbox_scene', new Scene());
        let scene = sceneManager.Current;

        let player = new GameObject();
        let floor = new GameObject();

        scene.add('player', player);
        scene.add('floor', floor);

        floor.addComponent(ComponentType.Geometry, new Cube(10, .1, 4));
        floor.addComponent(ComponentType.Material, new BasicMaterial({ color: 0x4a4e54 }));

        player.addComponent(ComponentType.Geometry, new Cube(1, 1, 1));
        player.addComponent(ComponentType.Material, new BasicMaterial({ color: 'blue' }));

        let camera = new PerspectiveCamera(75, width / height, .1, 1000);

        camera.position(7.5, 7.5, 15);

        let renderer = new Renderer('game', width, height);

        scene.WebGLScene.add(player.getRenderObject());
        player.position(0, 2, 0);
        floor.position(0, 0, 0);

        scene.compile();
        
        random(0, 1);
        let animate = function() {
            inputs.update();
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            
        };

        animate();
    }
}