// types/css.d.ts (or global.d.ts)
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}