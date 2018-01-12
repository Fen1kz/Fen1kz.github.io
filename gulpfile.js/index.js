const _ = require('lodash');
const requireDir = require('./utils').requireDir;

const gulp = require('gulp');
const gulpPlugins = require('gulp-load-plugins')();
const tasks = requireDir('./tasks');
// const config = require('./config');

// const localPlugins = require('require-dir')('./plugins');

// Object.keys(localPlugins)
//     .map((key) => gulpPlugins[_.camelCase(key)] = localPlugins[key](gulp, gulpPlugins, config));

// Object.keys(tasks)
//     .map((key) => tasks[key])
//     .filter((obj) => typeof obj === 'function')
//     .forEach((task) => task(gulp, gulpPlugins, config));
