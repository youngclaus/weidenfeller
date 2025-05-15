import { colorDictionary } from './bits';

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

export const getObjectsWithState = (): ObjectWithState[] => {
  const all = getAllObjects();
  const completed = getCompletedObjectNames();
  return all.map(obj => ({
    ...obj,
    active: completed.includes(obj.name),
  }));
};

export const getCompletedObjectNames = (): string[] => {
  if (typeof window === 'undefined') return [];
  const names = localStorage.getItem('completedObjects');
  return names ? JSON.parse(names) : [];
};

export const markObjectAsCompleted = (objectName: string): void => {
  const completedObjects = getCompletedObjectNames();
  if (!completedObjects.includes(objectName)) {
    completedObjects.push(objectName);
    localStorage.setItem('completedObjects', JSON.stringify(completedObjects));
  }
};

export const getObjectsByState = (): { blueprints: ObjectData[]; prints: ObjectData[] } => {
  const allObjects = getAllObjects();
  const completedObjects = getCompletedObjectNames();

  const prints = allObjects.filter(obj => completedObjects.includes(obj.name));
  const blueprints = allObjects.filter(obj => !completedObjects.includes(obj.name));

  return { blueprints, prints };
};

export const getAllObjects = (): ObjectData[] => {
  const objects: ObjectData[] = [
    {
      name: 'flag',
      series: 'my stuff',
      image: '/About/flag.png',
      description: "I've been a Borussia Dortmund fan since 2012",
      requiredBits: [
        { color: 'yellow', quantity: 5 },
        { color: 'black', quantity: 5 },
      ],
    },
    {
      name: 'stereo',
      series: 'my stuff',
      image: '/About/stereo.png',
      description: "I can't live without music",
      requiredBits: [
        { color: 'brown', quantity: 2 },
        { color: 'gray', quantity: 4 },
        { color: 'brown', quantity: 5 },
      ],
    },
    {
      name: 'ps5',
      series: 'my stuff',
      image: '/About/ps5.png',
      description: "I was an Xbox kid until high school",
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'black', quantity: 5 },
      ],
    },
    {
      name: 'records',
      series: 'my stuff',
      image: '/About/records.png',
      description: "Use the hanging vinyls to change the theme",
      requiredBits: [
        { color: 'pink', quantity: 5 },
        { color: 'yellow', quantity: 5 },
      ],
    },
    {
      name: 'window',
      series: 'my stuff',
      image: '/About/window_day.png',
      description: 'I had a balcony with a view of Hoboken in college',
      requiredBits: [
        { color: 'blue', quantity: 5 },
        { color: 'gray', quantity: 3 },
      ],
    },
    {
      name: 'dog',
      series: 'my stuff',
      image: '/About/whitedog.png',
      description: 'I have always wanted a Husky',
      requiredBits: [
        { color: 'white', quantity: 2 },
        { color: 'gray', quantity: 7 },
      ],
    },
    {
      name: 'jersey',
      series: 'my stuff',
      image: '/About/jersey.png',
      description: 'Sigma Nu',
      requiredBits: [
        { color: 'yellow', quantity: 5 },
        { color: 'black', quantity: 3 },
      ],
    },

    /*-------------- Records Section --------------*/
    {
      name: 'the1975',
      series: 'vinyl collection',
      image: '/About/records/1975.png',
      description: 'ILIWYSFYASBYSU - The 1975',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'pink', quantity: 3 },
      ],
    },
    {
      name: 'beck',
      series: 'vinyl collection',
      image: '/About/records/beck.png',
      description: 'Colors - Beck',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'blue', quantity: 3 },
      ],
    },
    {
      name: 'mckenna',
      series: 'vinyl collection',
      image: '/About/records/mckenna.png',
      description: 'What Do You Think About the Car? - Declan McKenna',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'green', quantity: 3 },
      ],
    },
    {
      name: 'paramore',
      series: 'vinyl collection',
      image: '/About/records/paramore.png',
      description: 'RIOT! - Paramore',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'orange', quantity: 3 },
      ],
    },
    {
      name: 'coldplay1',
      series: 'vinyl collection',
      image: '/About/records/coldplay3.png',
      description: 'A Rush of Blood to the Head - Coldplay',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'gray', quantity: 3 },
      ],
    },
    {
      name: 'basement',
      series: 'vinyl collection',
      image: '/About/records/basement.png',
      description: 'colourmeinkindness - basement',
      requiredBits: [
        { color: 'orange', quantity: 5 },
        { color: 'brown', quantity: 3 },
      ],
    },
    {
      name: 'borns',
      series: 'vinyl collection',
      image: '/About/records/borns.png',
      description: 'Dopamine - Borns',
      requiredBits: [
        { color: 'yellow', quantity: 5 },
        { color: 'gray', quantity: 3 },
      ],
    },
    {
      name: 'coldplay2',
      series: 'vinyl collection',
      image: '/About/records/coldplay.png',
      description: 'Viva la Vida - Coldplay',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'blue', quantity: 3 },
      ],
    },
    {
      name: 'coldplay3',
      series: 'vinyl collection',
      image: '/About/records/coldplay2.png',
      description: 'X&Y - Coldplay',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'blue', quantity: 3 },
      ],
    },
    {
      name: 'glass',
      series: 'vinyl collection',
      image: '/About/records/glass.png',
      description: 'Dreamland - Glass Animals',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'blue', quantity: 3 },
      ],
    },
    {
      name: 'blink',
      series: 'vinyl collection',
      image: '/About/records/blink.png',
      description: 'Take Off Your Pants and Jacket - blink-182',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'blue', quantity: 3 },
      ],
    },
    {
      name: 'catfish',
      series: 'vinyl collection',
      image: '/About/records/catfish.png',
      description: '',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'blue', quantity: 3 },
      ],
    },
    {
      name: 'daft',
      series: 'vinyl collection',
      image: '/About/records/daft.png',
      description: 'Random Access Memories - Daft Punk',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'blue', quantity: 3 },
      ],
    },
    {
      name: 'monkeys',
      series: 'vinyl collection',
      image: '/About/records/monkeys.png',
      description: 'AM - Arctic Monkeys',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'blue', quantity: 3 },
      ],
    },
    {
      name: 'xx',
      series: 'vinyl collection',
      image: '/About/records/xx.png',
      description: 'xx - The xx',
      requiredBits: [
        { color: 'white', quantity: 5 },
        { color: 'blue', quantity: 3 },
      ],
    },
  ];
  return objects;
};