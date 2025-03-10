import { version } from '../package.json'

export default {
  name: 'plugintest',
  version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'accessories',
  type: 'pattern',
  difficulty: 1,
  optionGroups: {
    tests: [
      'plugin',
    ],
    banner: [
      'bannerDy',
      'bannerSpaces',
      'bannerRepeat',
    ],
    bartack: [
      'bartackLength',
      'bartackAngle',
      'bartackDensity',
      'bartackWidth',
      'bartackStart',
      'bartackEnd',
    ],
    buttons: [ 'buttonsScale', 'buttonsRotate' ],
    cutonfold: [
      'cutonfoldMargin',
      'cutonfoldOffset',
      'cutonfoldGrainline',
    ],
    dimension: [
      'dimensionCustomText',
      'dimensionD',
      'dimensionEndMarker',
      'dimensionStartMarker',
    ],
    flip: [ 'flipAxis' ],
    gore: [ 'goreRadius', 'goreGoreNumber', 'goreExtraLength' ],
    logo: [ 'logoScale', 'logoRotate' ],
    mirror: [ 'mirrorLine', 'mirrorClone' ],
    round: [ 'roundRadius', 'roundRender' ],
    scalebox: [ 'scaleboxType' ],
    sprinkle: [ 'sprinkleScale', 'sprinkleRotate', 'sprinkleSnippet' ],
    title: [
      'titleNr',
      'titleTitle',
      'titleMeta',
      'titleScale',
      'titleRotate'
    ],
  },
  measurements: [],
  parts: [
    'banner',
    'bartack',
    'buttons',
    'cutonfold',
    'dimension',
    'flip',
    'gore',
    'grainline',
    'i18n',
    'logo',
    'measurements',
    'mirror',
    'notches',
    'round',
    'scalebox',
    'sprinkle',
    'title',
  ],
  options: {
    plugin: {
      dflt: 'all',
      list: [
        'all',
        'banner',
        'bartack',
        'buttons',
        'cutonfold',
        'dimension',
        'flip',
        'gore',
        'grainline',
        'i18n',
        'logo',
        'measurements',
        'mirror',
        'notches',
        'round',
        'scalebox',
        'sprinkle',
        'theme',
        'title',
        'validate',
        'versionfreeSvg',
      ]
    },
    // Banner options
    bannerDy: { count: -1, min: -15, max: 15 },
    bannerSpaces: { count: 10, min: 0, max: 20 },
    bannerRepeat: { count: 10, min: 1, max: 20 },
    // Bartack options
    bartackLength: {count: 15, min: 2, max: 100 },
    bartackAngle: {count: 0, min: -360, max: 360 },
    bartackDensity: {count: 3, min: 1, max: 5 },
    bartackWidth: {count: 3, min: 1, max: 5 },
    bartackStart: {pct: 25, min: 0, max: 100 },
    bartackEnd: {pct: 75, min: 0, max: 100 },
    // Buttons options
    buttonsScale: { pct: 100, min: 10, max: 200 },
    buttonsRotate: { deg: 0, min: -360, max: 360 },
    // Cutonfold options
    cutonfoldMargin: { count: 5, min: 0, max: 25 },
    cutonfoldOffset: { count: 15, min: 0, max: 100 },
    cutonfoldGrainline: { bool: false },
    // Dimension options
    dimensionCustomText: { bool: false },
    dimensionD: { count: 10, min: -20, max: 20 },
    dimensionEndMarker: { bool: true },
    dimensionStartMarker: { bool: true },
    // Flip options
    flipAxis: { dflt: 'x', list: ['x', 'y'] },
    // Gore options
    goreRadius: { count: 20, min: 10, max: 30 },
    goreGoreNumber: { count: 6, min: 4, max: 8 },
    goreExtraLength: { count: 10, min: 0, max: 20 },
    // Logo options
    logoScale: { pct: 100, min: 10, max: 200 },
    logoRotate: { deg: 0, min: -360, max: 360 },
    // Mirror options
    mirrorLine: { dflt: 'a', list: ['a', 'b', 'none' ] },
    mirrorClone: { bool: true },
    // Round options
    roundRadius: { count: 10, min: 0, max: 50 },
    roundRender: { bool: true },
    scaleboxType: { dflt: 'scalebox' , list: ['scalebox', 'miniscale'] },
    // Logo options
    sprinkleScale: { pct: 100, min: 10, max: 200 },
    sprinkleRotate: { deg: 0, min: -360, max: 360 },
    sprinkleSnippet: {
      dflt: 'bnotch',
      list: [
        'notch',
        'bnotch',
        'button',
        'buttonhole',
        'buttonhole-start',
        'buttonhole-end',
        'snap-stud',
        'snap-socket',
        'logo',
      ]
    },
    // Title options
    titleNr: { count: 1, min: 0, max: 100 },
    titleTitle: { bool: true },
    titleMeta: { bool: true },
    titleScale: { pct: 100, min: 10, max: 200 },
    titleRotate: { deg: 0, min: -360, max: 360 },
  }
}
