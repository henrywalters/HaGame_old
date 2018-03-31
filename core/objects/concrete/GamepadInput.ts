import { IButton, IAxis } from '../interface/IInput';
import IInput from '../interface/IInput';
export default class GamepadInput implements IInput {
    Start: IButton;
    Select: IButton;
    Home: IButton;

    A: IButton;
    B: IButton;
    X: IButton;
    Y: IButton;

    RTrigger: IButton;
    RBumper: IButton;
    LTrigger: IButton;
    LBumper: IButton;
    L3: IButton;
    R3: IButton;

    LVertical: IButton;
    LHorizontal: IButton;
    RVertical: IButton;
    RHorization: IButton;

    Up: IButton;
    Down: IButton;
    Left: IButton;
    Right: IButton;

    LeftAxis: IAxis;
    RightAxis: IAxis;

    RawGamepad: Gamepad;

    constructor(gamepad: Gamepad) {
        this.mapGamepad(gamepad);
        this.RawGamepad = gamepad;
    }

    mapGamepad(gamepad: Gamepad) {
        // save myself 16 characters each line lol :p
        let b = gamepad.buttons;
        let a = gamepad.axes;

        this.A = this.mapButton(b[0]);
        this.B = this.mapButton(b[1]);
        this.X = this.mapButton(b[2]);
        this.Y = this.mapButton(b[3]);

        this.LBumper = this.mapButton(b[4]);
        this.RBumper = this.mapButton(b[5]);
        this.LTrigger = this.mapButton(b[6]);
        this.RTrigger = this.mapButton(b[7]);

        this.Start = this.mapButton(b[8]);
        this.Select = this.mapButton(b[9]);

        this.L3 = this.mapButton(b[10]);
        this.R3 = this.mapButton(b[11]);

        this.Up = this.mapButton(b[12]);
        this.Down = this.mapButton(b[13]);
        this.Left = this.mapButton(b[14]);
        this.Right = this.mapButton(b[15]);
        
        this.Home = this.mapButton(b[16]);

        this.LeftAxis = {
            X: a[0],
            Y: a[1]
        };

        this.RightAxis = {
            X: a[2],
            Y: a[3]
        };
    }

    mapButton(button: GamepadButton): IButton {
        return {
            value: button.value,
            pressed: button.pressed
        };
    }
}