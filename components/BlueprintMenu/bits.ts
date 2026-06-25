export const colorDictionary: Record<string, string> = {
  '#ffffff': 'white',
  '#d9d9d9': 'gray',
  '#f7e2dd': 'pink',
  '#d4a703': 'yellow',
  '#354079': 'blue',
  '#4c2c24': 'brown',
  '#000000': 'black',
  '#f28c28': 'orange',
  '#81a263': 'green',
};

export interface Bit {
  color: string;
  quantity: number;
}

const isBit = (value: unknown): value is Bit => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<Bit>;
  return typeof candidate.color === 'string'
    && typeof candidate.quantity === 'number'
    && Number.isFinite(candidate.quantity)
    && candidate.quantity >= 0;
};

export const getUserBits = (): Bit[] => {
  if (typeof window === 'undefined') return [];
  const storedBits = localStorage.getItem('userBits');
  if (!storedBits) return [];

  try {
    const parsed: unknown = JSON.parse(storedBits);
    return Array.isArray(parsed) && parsed.every(isBit) ? parsed : [];
  } catch {
    localStorage.removeItem('userBits');
    return [];
  }
};

export const setUserBits = (bits: Bit[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userBits', JSON.stringify(bits));
  }
};

export const addUserBits = (colorName: string, amount: number): void => {
  const userBits = getUserBits();
  const bitIndex = userBits.findIndex((bit) => bit.color.toLowerCase() === colorName.toLowerCase());

  if (bitIndex > -1) {
    userBits[bitIndex].quantity += amount;
  } else {
    userBits.push({ color: colorName, quantity: amount });
  }

  setUserBits(userBits);
};

export const removeUserBits = (requiredBits: { color: string; quantity: number }[]): void => {
  const userBits = getUserBits();

  requiredBits.forEach((requiredBit) => {
    const bitIndex = userBits.findIndex((bit) => bit.color.toLowerCase() === requiredBit.color.toLowerCase());
    if (bitIndex > -1 && userBits[bitIndex].quantity >= requiredBit.quantity) {
      userBits[bitIndex].quantity -= requiredBit.quantity;
      if (userBits[bitIndex].quantity === 0) userBits.splice(bitIndex, 1);
    }
  });

  setUserBits(userBits);
};

export const getHexFromColorName = (colorName: string): string | undefined => (
  Object.keys(colorDictionary).find((key) => colorDictionary[key].toLowerCase() === colorName.toLowerCase())
);
