export type HEX = `#${string}`;
export type RGB = `rgb(${number},${"" | " "}${number},${"" | " "}${number})`;
export type RGBA = `rgba(${number},${"" | " "}${number},${"" | " "}${number},${"" | " "}${number})`;
export type HSL = `hsl(${number},${"" | " "}${number}%,${"" | " "}${number}%)`;
export type HSLA = `hsla(${number},${"" | " "}${number}%,${"" | " "}${number}%,${"" | " "}${number})`;
export type Color = HEX | RGB | RGBA | HSL | HSLA;
