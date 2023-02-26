export declare enum Frame {
    React = "React",
    Vue = "Vue",
    Vanilla = "Vanilla"
}

export declare const enum Order {
    name = "name",
    frame = "frame",
    typescript = "typescript",
    proxy = "proxy"
}

export declare interface projectInfo {
    name: string;
    frame: Frame;
    typescript: boolean;
    proxy: boolean;
}

export { }
