'use strict';

import Border from "./modules/border_class.js";
import { Point } from "./structs.js";

//test script

const canvas = document.getElementById('testCanvas');
canvas.style.border = '1px solid black';
const ctx = canvas.getContext('2d');

const border = new Border();
border.addPoint(new Point(1, 1));
border.removePoint(new Point(1, 1));
border.addPoint(new Point(2, 2));
border.addPoint(new Point(100, 50));
border.addPoint(new Point(100, 100));
border.draw(ctx);




