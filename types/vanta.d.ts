declare module 'vanta/dist/vanta.cells.min' {
  interface VantaEffect {
    destroy: () => void;
    resize?: () => void;
  }

  interface VantaOptions {
    el: HTMLElement | null;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    color1?: number;
    color2?: number;
    size?: number;
    speed?: number;
  }

  export default function CELLS(options: VantaOptions): VantaEffect;
}
