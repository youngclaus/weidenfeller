export interface Theme {
  mode: 'light' | 'dark' | 'toggled';
  c1: string;  // background color
  c2: string;  // inactive records
  c3: string;  // active records
  c4: string;  // text color
  opacity: string;
  glow: string;
}

export const lightTheme: Theme = {
  mode: 'light',
  c1: '#e0e0e0',
  c2: '#e0e0e0',
  c3: '#F39F5A',
  c4: '#000',
  opacity: '1',
  glow: 'rgba(255, 255, 255, 0.3)',
};

export const darkTheme: Theme = {
  mode: 'dark',
  c1: '#222',
  c2: '#000',
  c3: '#662549',
  c4: '#ccc',
  opacity: '0.6',
  glow: 'rgba(209, 197, 86, 0.5)',
};

export const the1975: Theme = {
  mode: 'toggled',
  c1: '#ffbdc9',
  c2: '#d199a2',
  c3: '#9678b6',
  c4: '#a6389e',
  opacity: '0.7',
  glow: 'rgba(255, 171, 186, 0.8)',
};

export const basement: Theme = {
  mode: 'toggled',
  c1: '#f0b35d', 
  c2: '#a67575',  
  c3: '#a67575', 
  c4: '#905d5d', 
  opacity: '0.8',
  glow: 'rgba(209, 197, 86, 0.5)',
};

export const beck: Theme = {
  mode: 'toggled',
  c1: '#008ef9', 
  c2: '#f9e14e',  
  c3: '#333', 
  c4: '#fff',
  opacity: '0.9',
  glow: 'rgba(0, 142, 249, 0.7)',
}

export const blink: Theme = {
  mode: 'toggled',
  c1: '#000', 
  c2: '#ae403b',  
  c3: '#608b34', 
  c4: '#fdaf4b', 
  opacity: '0.8',
  glow: 'rgba(249, 225, 78, 0.7)',
}

export const borns: Theme = {
  mode: 'toggled',
  c1: '#c1b8a2', 
  c2: '#4d4c5b',  
  c3: '#464354', 
  c4: '#725a4e', 
  opacity: '0.8',
  glow: 'rgba(181, 164, 98, 0.7)',
}

export const catfish: Theme = {
  mode: 'toggled',
  c1: '#000', 
  c2: '#797979',  
  c3: '#333', 
  c4: '#333', 
  opacity: '0.5',
  glow: 'rgba(0, 0, 0, 0.9)',
}

export const coldplay: Theme = {
  mode: 'toggled',
  c1: '#6a6a56', 
  c2: '#a43b2a',  
  c3: '#fff', 
  c4: '#cfbcdf', 
  opacity: '0.8',
  glow: 'rgba(207, 188, 223, 0.9)',
}

export const coldplay2: Theme = {
  mode: 'toggled',
  c1: '#00054', 
  c2: '#81acd8',  
  c3: '#f8f2dc', 
  c4: '#d66853',
  opacity: '0.8',
  glow: 'rgba(0, 0, 0, 0.9)',
}

export const coldplay3: Theme = {
  mode: 'toggled',
  c1: '#fff', 
  c2: '#000054',  
  c3: '#ddd', 
  c4: '#ddd', 
  opacity: '0.8',
  glow: 'rgba(0, 0, 0, 0.9)',
}

export const daft: Theme = {
  mode: 'toggled',
  c1: '#313131', 
  c2: '#000',  
  c3: '#ffb521', 
  c4: '#ffb521', 
  opacity: '0.8',
  glow: 'rgba(255, 215, 0, 0.9)',
}

export const glass: Theme = {
  mode: 'toggled',
  c1: '#99398d', 
  c2: '#99398d',  
  c3: '#678ac2', 
  c4: '#e84d86', 
  opacity: '0.7',
  glow: 'rgba(232, 77, 134, 0.9)',
}

export const imagine: Theme = {
  mode: 'toggled',
  c1: '#3a3249', 
  c2: '#3a3249',  
  c3: '#825b63', 
  c4: '#b6b2a7', 
  opacity: '0.6',
  glow: 'rgba(187, 139, 132, 0.7)',
}

export const mckenna: Theme = {
  mode: 'toggled',
  c1: '#fd9b63', 
  c2: '#fd9b63',  
  c3: '#81A263', 
  c4: '#e7d37f',
  opacity: '0.8',
  glow: 'rgba(129, 162, 99, 0.9)',
}

export const monkeys: Theme = {
  mode: 'toggled',
  c1: '#353535', 
  c2: '#303030',  
  c3: '#fff', 
  c4: '#d2d2d2',
  opacity: '0.8',
  glow: 'rgba(0, 0, 0, 0.9)',
}

export const paramore: Theme = {
  mode: 'toggled',
  c1: 'orange', 
  c2: 'orange',  
  c3: 'white', 
  c4: 'white',
  opacity: '0.8',
  glow: 'rgba(0, 0, 0, 0.9)',
}

export const xx: Theme = {
  mode: 'toggled',
  c1: 'black', 
  c2: 'gray',  
  c3: 'white', 
  c4: 'white',
  opacity: '0.8',
  glow: 'rgba(0, 0, 0, 0.9)',
}
