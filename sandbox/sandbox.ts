import Renderer from '../core/objects/concrete/Renderer';
import GameObject from '../core/objects/concrete/GameObject';
import SceneManager from '../core/managers/SceneManager';
import Logger from './../common/utils/Logger';
import Scene from '../core/objects/concrete/Scene';
import Cube from '../components/concrete/geometries/Cube';
import BasicMaterial from '../components/concrete/materials/BasicMaterial';
import PerspectiveCamera from '../core/objects/concrete/Camera';
import { ComponentType } from '../core/objects/concrete/GameObject';

export default class Sandbox {
    constructor() {

        const height = 500;
        const width = 700;
        
        new Logger();
        // Create our first scene
        let sceneManager = new SceneManager();
        sceneManager.addScene('sandbox_scene', new Scene());
        let scene = sceneManager.Current;

        let player = new GameObject();

        Logger.log('player', 'Initialized');

        Logger.log('player', 'Components added');
        
        scene.add('player', player);

        player.addComponent(ComponentType.Geometry, new Cube(2, 1, 1));
        player.addComponent(ComponentType.Material, new BasicMaterial({ color: 0x00ff00 }));

        Logger.log('scene', 'successfully compiled');

        let camera = new PerspectiveCamera(75, width / height, .1, 1000);

        camera.position(4, 3, -5);
        camera.WebGLCamera.lookAt(scene.WebGLScene.position);

        let renderer = new Renderer('game', width, height);

        scene.WebGLScene.add(player.getRenderObject());
        player.position(0, 0, 0);
        scene.compile();

        Logger.log('player pos', player.getRenderObject().position.toArray().toString());

        let animate = function() {
            
            player.rotate(.1, 0, 0);
            player.move(.01, 0, 0);
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
    }
}