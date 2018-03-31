import GamepadInput from '../objects/concrete/GamepadInput';
import IHashMap from '../../common/dataStructures/IHashMap';
import Logger from '../../common/utils/Logger';
// import IInput from '../objects/interface/IInput';

export default class GamepadInputManager {

    Gamepads: IHashMap<GamepadInput | null>;

    constructor() {

        if (navigator.getGamepads) {
            let gamepads: Array<Gamepad> = navigator.getGamepads();
            this.Gamepads = {};
            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] !== null) {
                    this.Gamepads[gamepads[i].index] = new GamepadInput(gamepads[i]);
                }
            }
        }

        Logger.log('events', 'waiting for controller connections');

        window.addEventListener('gamepadconnected', this.addgamepad);
        window.addEventListener('gamepaddisconnected', this.removegamepad);
    }

    showDevices(): void {
        Logger.log('controllers', this.Gamepads);
    }

    addgamepad(e: GamepadEvent) {
        this.Gamepads[e.gamepad.index] = new GamepadInput(e.gamepad);
        Logger.log('player ' + e.gamepad.index, 'connected');
    }

    removegamepad(e: GamepadEvent) {
        this.Gamepads[e.gamepad.index] = null;
    }

    playerConnected(index: number): boolean {
        if (this.Gamepads[index] !== null) {
            return true;
        } else {
            return false;
        }
    }

    update(): void {
        if (navigator.getGamepads) {
            let gamepads: Array<Gamepad> = navigator.getGamepads();
            this.Gamepads = {};
            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] !== null) {
                    this.Gamepads[gamepads[i].index] = new GamepadInput(gamepads[i]);
                }
            }
        }
    }

    player(index: number): GamepadInput {
        if (this.Gamepads[index] !== null) {
            return <GamepadInput> this.Gamepads[index];
        } else {
            throw new Error('Player: ' + index + 'not connected');
        }
    }

}