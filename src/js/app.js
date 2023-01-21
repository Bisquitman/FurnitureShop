import burger from './modules/burger.js';
import { useDynamicAdapt } from './modules/dynamicAdapt.js';
import * as flsFunctions from './modules/functions.js';
import sliders from './modules/sliders.js';
import spoilers from './modules/spoilers.js';

import './modules/functions.js';
import furnitureGallery from './modules/furnitureGallery.js';

flsFunctions.isWebp();

spoilers();
burger();
sliders();
useDynamicAdapt();
furnitureGallery();

window.onload = function () {
  document.addEventListener('click', flsFunctions.documentActions);
};

flsFunctions.ibg();
