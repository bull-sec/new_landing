declare module '*.module.css' {
    const content: Record<string, string>;
    export default content;
}
declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
}