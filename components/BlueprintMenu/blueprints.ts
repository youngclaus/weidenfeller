export interface ObjectData {
  name: string;
  series: string;
  image: string;
  description: string;
  requiredBits: { color: string; quantity: number }[];
}

export interface ObjectWithState extends ObjectData {
  active: boolean;
}

type BitRequirement = readonly [color: string, quantity: number];

const createObject = (
  name: string,
  series: string,
  image: string,
  description: string,
  requiredBits: readonly BitRequirement[],
): ObjectData => ({
  name,
  series,
  image,
  description,
  requiredBits: requiredBits.map(([color, quantity]) => ({ color, quantity })),
});

const OBJECTS: readonly ObjectData[] = [
  createObject('flag', 'my stuff', '/About/flag.png', "I've been a Borussia Dortmund fan since 2012", [['yellow', 5], ['black', 5]]),
  createObject('stereo', 'my stuff', '/About/stereo.png', "I can't live without music", [['brown', 2], ['gray', 4], ['brown', 5]]),
  createObject('ps5', 'my stuff', '/About/ps5.png', 'I was an Xbox kid until high school', [['white', 5], ['black', 5]]),
  createObject('records', 'my stuff', '/About/records.png', 'Use the hanging vinyls to change the theme', [['pink', 5], ['yellow', 5]]),
  createObject('window', 'my stuff', '/About/window_day.png', 'I had a balcony with a view of Hoboken in college', [['blue', 5], ['gray', 3]]),
  createObject('dog', 'my stuff', '/About/whitedog.png', 'I have always wanted a Husky', [['white', 2], ['gray', 7]]),
  createObject('jersey', 'my stuff', '/About/jersey.png', 'Sigma Nu', [['yellow', 5], ['black', 3]]),
  createObject('the1975', 'vinyl collection', '/About/records/1975.png', 'ILIWYSFYASBYSU - The 1975', [['white', 5], ['pink', 3]]),
  createObject('beck', 'vinyl collection', '/About/records/beck.png', 'Colors - Beck', [['white', 5], ['blue', 3]]),
  createObject('mckenna', 'vinyl collection', '/About/records/mckenna.png', 'What Do You Think About the Car? - Declan McKenna', [['white', 5], ['green', 3]]),
  createObject('paramore', 'vinyl collection', '/About/records/paramore.png', 'RIOT! - Paramore', [['white', 5], ['orange', 3]]),
  createObject('coldplay1', 'vinyl collection', '/About/records/coldplay3.png', 'A Rush of Blood to the Head - Coldplay', [['white', 5], ['gray', 3]]),
  createObject('basement', 'vinyl collection', '/About/records/basement.png', 'colourmeinkindness - basement', [['orange', 5], ['brown', 3]]),
  createObject('borns', 'vinyl collection', '/About/records/borns.png', 'Dopamine - Borns', [['yellow', 5], ['gray', 3]]),
  createObject('coldplay2', 'vinyl collection', '/About/records/coldplay.png', 'Viva la Vida - Coldplay', [['white', 5], ['blue', 3]]),
  createObject('coldplay3', 'vinyl collection', '/About/records/coldplay2.png', 'X&Y - Coldplay', [['white', 5], ['blue', 3]]),
  createObject('glass', 'vinyl collection', '/About/records/glass.png', 'Dreamland - Glass Animals', [['white', 5], ['blue', 3]]),
  createObject('blink', 'vinyl collection', '/About/records/blink.png', 'Take Off Your Pants and Jacket - blink-182', [['white', 5], ['blue', 3]]),
  createObject('catfish', 'vinyl collection', '/About/records/catfish.png', '', [['white', 5], ['blue', 3]]),
  createObject('daft', 'vinyl collection', '/About/records/daft.png', 'Random Access Memories - Daft Punk', [['white', 5], ['blue', 3]]),
  createObject('monkeys', 'vinyl collection', '/About/records/monkeys.png', 'AM - Arctic Monkeys', [['white', 5], ['blue', 3]]),
  createObject('xx', 'vinyl collection', '/About/records/xx.png', 'xx - The xx', [['white', 5], ['blue', 3]]),
];

const cloneObject = (object: ObjectData): ObjectData => ({
  ...object,
  requiredBits: object.requiredBits.map((bit) => ({ ...bit })),
});

export const getCompletedObjectNames = (): string[] => {
  if (typeof window === 'undefined') return [];
  const names = localStorage.getItem('completedObjects');
  if (!names) return [];

  try {
    const parsed: unknown = JSON.parse(names);
    return Array.isArray(parsed) && parsed.every((name) => typeof name === 'string')
      ? parsed
      : [];
  } catch {
    return [];
  }
};

export const markObjectAsCompleted = (objectName: string): void => {
  if (typeof window === 'undefined') return;
  const completedObjects = getCompletedObjectNames();
  if (!completedObjects.includes(objectName)) {
    localStorage.setItem('completedObjects', JSON.stringify([...completedObjects, objectName]));
  }
};

export const getAllObjects = (): ObjectData[] => OBJECTS.map(cloneObject);

export const getObjectsWithState = (): ObjectWithState[] => {
  const completed = getCompletedObjectNames();
  return getAllObjects().map((object) => ({
    ...object,
    active: completed.includes(object.name),
  }));
};

export const getObjectsByState = (): { blueprints: ObjectData[]; prints: ObjectData[] } => {
  const completed = getCompletedObjectNames();
  const objects = getAllObjects();
  return {
    blueprints: objects.filter((object) => !completed.includes(object.name)),
    prints: objects.filter((object) => completed.includes(object.name)),
  };
};
