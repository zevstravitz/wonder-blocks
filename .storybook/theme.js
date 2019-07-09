import { create } from '@storybook/theming';

export default create({
  base: 'light',

  // Typography
  fontBase: '"Lato", sans-serif',
//   fontCode: '"Inconsolata", monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',


  brandTitle: 'Wonder Blocks',
  brandUrl: 'https://wonder-blocks.netlify.com/',
  brandImage: '/logo.svg',
});