import Renderer from '../core/objects/concrete/Renderer';
import GameObject from '../core/objects/concrete/GameObject';
import SceneManager from '../core/managers/SceneManager';
import Logger from './../common/utils/Logger';
import Scene from '../core/objects/concrete/Scene';
import Cube from '../components/concrete/geometries/Cube';
// import BasicMaterial from '../components/concrete/materials/BasicMaterial';
import PerspectiveCamera from '../core/objects/concrete/Camera';
import { ComponentType } from '../core/objects/concrete/GameObject';
import GamepadInputManager from '../core/managers/GamepadInputManager';
// import GamepadInput from '../core/objects/concrete/GamepadInput';
import * as Three from 'three';
import LambertMaterial from '../components/concrete/materials/LambertMaterial';
import Rigidbody from '../components/concrete/physics/Rigidbody';

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

        let tiles = [];
        tiles.push(new GameObject());
        tiles.push(new GameObject());
        tiles.push(new GameObject());
        tiles.push(new GameObject());
        tiles.push(new GameObject());

        tiles[0].addComponent(ComponentType.Geometry, new Cube(.5, 8, 100));
        tiles[0].addComponent(ComponentType.Material, new LambertMaterial({ color: 0x242628 }));
        tiles[0].position(-5, 0, 15);

        tiles[1].addComponent(ComponentType.Geometry, new Cube(.5, 8, 100));
        tiles[1].addComponent(ComponentType.Material, new LambertMaterial({ color: 0x242628 }));
        tiles[1].position(5, 0, 15);

        tiles[4].addComponent(ComponentType.Geometry, new Cube(8, 9, .5));
        tiles[4].addComponent(ComponentType.Material, new LambertMaterial({ color: 0x242628 }));
        tiles[4].position(0, 0, 5);

        tiles[2].addComponent(ComponentType.Geometry, new Cube(2, 3, 2));
        tiles[2].addComponent(ComponentType.Material, new LambertMaterial({ color: 0x242628 }));
        tiles[2].position(-3, 0, 15);

        tiles[3].addComponent(ComponentType.Geometry, new Cube(2, 1, 2));
        tiles[3].addComponent(ComponentType.Material, new LambertMaterial({ color: 0x242628 }));
        tiles[3].position(0, 3, 10);

        for (let i = 0; i < tiles.length; i++) {
            scene.add('.tile', tiles[i]);
        }

        floor.addComponent(ComponentType.Geometry, new Cube(70, .3, 70));
        floor.addComponent(ComponentType.Material, new LambertMaterial({ color: 0x4a4e54 }));

        player.addComponent(ComponentType.Geometry, new Cube(1, 1.5, 1));
        player.addComponent(ComponentType.Material, new LambertMaterial({ color: 0x0b1c72 }));
        player.addComponent(ComponentType.Physics, new Rigidbody());

        let camera = new PerspectiveCamera(75, width / height, .1, 1000);

        camera.position(0, 5, 5);

        camera.WebGLCamera.lookAt(new Three.Vector3(player.X, player.Y, player.Z));
        let renderer = new Renderer('game', width, height);

        scene.WebGLScene.add(player.getRenderObject());
        player.position(0, 1, 20);
        floor.position(0, 0, 0);

        player.CollisionDetectionActive = true;

        scene.compile();

        for (let i = 0; i < 7; i++) {
            let p = new Three.PointLight(0xffffff, .8, 15);
            p.position.set(0, 5, i * 10);
            p.lookAt(new Three.Vector3(0, 0, i));
            scene.WebGLScene.add(p);
        }

        scene.WebGLScene.add(new Three.AmbientLight(0xffffff));
        // scene.WebGLScene.add(light);

        inputs.showDevices();
        
        random(0, 1);

        // const millis = 1000 / 60;
        // let lastFrame = 16; 

        let animate = function(frameAt: number) {
            // let delta = frameAt - lastFrame;
            // lastFrame = frameAt;
            inputs.update();
            scene.update();
            if (inputs.player(0) !== undefined) {
                if (Math.abs(inputs.player(0).LeftAxis.X) > .2) {
                    player.VelX = inputs.player(0).LeftAxis.X / 10;
                } else {
                    player.VelX = 0;
                }
                if (Math.abs(inputs.player(0).LeftAxis.Y) > .2) {
                    player.VelZ = inputs.player(0).LeftAxis.Y / 10;
                } else {
                    player.VelZ = 0;
                }

                if (inputs.player(0).A.pressed) {
                    player.VelY = .05;
                }
                // light.position.set(player.X, player.Y, player.Z - .5);
                // light.lookAt(scene.WebGLScene.position);
                // light.setRotationFromAxisAngle(new Three.Vector3(player.X, player.Y, player.Z), 40);
            }

            camera.position(player.X, player.Y + 5, player.Z + 5);

            // Logger.log('delta', 1000 / delta);

            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            
        };

        animate(16);
    }
}