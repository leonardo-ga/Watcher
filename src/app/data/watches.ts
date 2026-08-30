export type WatchType = 'Chronograph' | 'Diver' | 'Dress' | 'Field' | 'GMT' | 'Integrated sports';
export type Movement = 'Automatic' | 'Manual' | 'Quartz';

export interface Watch {
  brand: string;
  caseSize: string;
  description: string;
  face: string;
  movement: Movement;
  name: string;
  price: number;
  slug: string;
  strap: string;
  tone: string;
  type: WatchType;
}

export const watches: Watch[] = [
  {
    brand: 'Omega',
    caseSize: '42 mm',
    description: 'The lunar chronograph, built for the long view.',
    face: '#f2f0e8',
    movement: 'Manual',
    name: 'Speedmaster Moonwatch',
    price: 8_600,
    slug: 'omega-speedmaster-moonwatch',
    strap: '#272724',
    tone: '#b6b3a7',
    type: 'Chronograph',
  },
  {
    brand: 'Tudor',
    caseSize: '39 mm',
    description: 'A compact diver with serious underwater intent.',
    face: '#232b27',
    movement: 'Automatic',
    name: 'Black Bay 58',
    price: 4_490,
    slug: 'tudor-black-bay-58',
    strap: '#555043',
    tone: '#baa67c',
    type: 'Diver',
  },
  {
    brand: 'Cartier',
    caseSize: '35.1 mm',
    description: 'The square that changed the shape of wristwear.',
    face: '#f5f2e8',
    movement: 'Automatic',
    name: 'Santos de Cartier',
    price: 7_850,
    slug: 'cartier-santos-de-cartier',
    strap: '#a8a69e',
    tone: '#d0cec4',
    type: 'Dress',
  },
  {
    brand: 'Rolex',
    caseSize: '40 mm',
    description: 'A study in function, proportion, and permanence.',
    face: '#1d2523',
    movement: 'Automatic',
    name: 'Explorer',
    price: 7_700,
    slug: 'rolex-explorer',
    strap: '#9c9d99',
    tone: '#c6c7c1',
    type: 'Field',
  },
  {
    brand: 'Grand Seiko',
    caseSize: '40 mm',
    description: 'A blue dial with the texture of early-morning light.',
    face: '#426078',
    movement: 'Automatic',
    name: 'Heritage SBGH273',
    price: 7_200,
    slug: 'grand-seiko-heritage-sbgh273',
    strap: '#343a3d',
    tone: '#bfc0ba',
    type: 'Dress',
  },
  {
    brand: 'Hamilton',
    caseSize: '38 mm',
    description: 'A faithful field watch, pared back to the essential.',
    face: '#d6d2c4',
    movement: 'Manual',
    name: 'Khaki Field Mechanical',
    price: 745,
    slug: 'hamilton-khaki-field-mechanical',
    strap: '#777055',
    tone: '#9d9d8c',
    type: 'Field',
  },
  {
    brand: 'Longines',
    caseSize: '42 mm',
    description: 'A travel companion that puts two time zones in focus.',
    face: '#1e2936',
    movement: 'Automatic',
    name: 'Zulu Time',
    price: 3_150,
    slug: 'longines-spirit-zulu-time',
    strap: '#9a744d',
    tone: '#b7b5ac',
    type: 'GMT',
  },
  {
    brand: 'Tissot',
    caseSize: '40 mm',
    description: 'Seventies attitude with an easy everyday rhythm.',
    face: '#75a996',
    movement: 'Automatic',
    name: 'PRX Powermatic 80',
    price: 775,
    slug: 'tissot-prx-powermatic-80',
    strap: '#aeb4ae',
    tone: '#b5b6ad',
    type: 'Integrated sports',
  },
  {
    brand: 'Seiko',
    caseSize: '40.5 mm',
    description: 'A modern classic with a wave-textured blue dial.',
    face: '#274f6e',
    movement: 'Automatic',
    name: 'Prospex SPB143',
    price: 1_300,
    slug: 'seiko-prospex-spb143',
    strap: '#a9aba8',
    tone: '#b8b8af',
    type: 'Diver',
  },
];
