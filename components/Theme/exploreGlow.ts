export const getThemeGlowFilter = (glowColor: string, blurRadius: number): string => {
  return `drop-shadow(0 0 ${blurRadius}px ${glowColor})`;
};
