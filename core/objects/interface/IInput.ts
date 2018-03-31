export interface IButton {
    pressed: boolean;
    value: number;
}

export interface IAxis {
    X: number;
    Y: number;
}

export default interface IInput {
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
}