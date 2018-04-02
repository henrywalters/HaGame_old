import IInput, { IButton, IAxis } from '../interface/IInput';

export default class KeyboardInput implements IInput {
    Start: IButton;
    Select: IButton;
    Home: IButton;

    A: IButton;
    B: IButton;
    X: IButton;
    Y: IButton;

    Up: IButton;
    Down: IButton;
    Left: IButton;
    Right: IButton;

    RTrigger: IButton;
    RBumper: IButton;
    LTrigger: IButton;
    LBumper: IButton;

    LVertical: IButton;
    LHorizontal: IButton;
    RVertical: IButton;
    RHorization: IButton;

    LeftAxis: IAxis;
    RightAxis: IAxis;

    L3: IButton;
    R3: IButton;

    LastMousePos: IAxis;

    constructor() {
        let button = {
            pressed: false,
            value: 0
        };

        let axis = {
            X: 0,
            Y: 0
        };

        this.Start = button;
        this.Select = button;
        this.Home = button;
        this.A = button;
        this.B = button;
        this.X = button;
        this.Y = button;

        this.Up = button;
        this.Down = button;
        this.Left = button;
        this.Right = button;

        this.RTrigger = button;
        this.RBumper = button;
        this.LTrigger = button;
        this.LBumper = button;

        this.LeftAxis = axis;
        this.RightAxis = axis;

        this.LastMousePos = {
            X: 0,
            Y: 0
        };

        document.addEventListener('keydown', (event) => {this.keydown(event); });
        document.addEventListener('keyup', (event) => {this.keyup(event); });
        document.addEventListener('mousemove', (event) => {this.mousemove(event); });
    }

    keydown(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this.LeftAxis.Y = -1;
                break;
            case 's':
                this.LeftAxis.Y = 1;
                break;
            case 'd':
                this.LeftAxis.X = 1;
                break;
            case 'a':
                this.LeftAxis.X = -1;
                break;
            case ' ':
                this.A.pressed = true;
                this.A.value = 1;
                break;
            default:
                break;
        }
    }

    keyup(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this.LeftAxis.Y = 0;
                break;
            case 's':
                this.LeftAxis.Y = 0;
                break;
            case 'd':
                this.LeftAxis.X = 0;
                break;
            case 'a':
                this.LeftAxis.X = 0;
                break;
            case ' ':
                this.A.pressed = false;
                this.A.value = 0;
                break;
            default:
                break;
        }
    }

    mousemove(event: MouseEvent) {
        this.RightAxis.X = (event.pageX - this.LastMousePos.X) / window.innerWidth * 2;
        this.RightAxis.Y = (event.pageY - this.LastMousePos.Y) / window.innerHeight * 2;
        this.LastMousePos = {
            X: event.pageX,
            Y: event.pageY
        };
        // Logger.log('mouse', this.RightAxis);
    }
}
