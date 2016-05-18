
((module) => {
	'use strict';

	var {mkdirSync, statSync, unlinkSync} = require('fs');
	var path = require('path');
	var justTry = require('just-try');
	var Info = require('fs-force-utils/info');
	var Action = require('fs-force-utils/action');
	var _donothing = require('fs-force-utils/do-nothing');
	var flatArray = require('fs-force-utils/flat-array');

	var resolvePath = path.resolve;
	var getParent = path.dirname;

	var _mkdirSync = (dirname, onaction) => {
		var callOnAction = (action) =>
			justTry(() => onaction(action), (error) => console.error(error));
		var createInfo = (...action) =>
			new Info('mkdir', dirname, action);
		try {
			let info = statSync(dirname);
			if (info.isFile()) {
				unlinkSync(dirname);
				let action = new Action('delete', dirname, 'file');
				callOnAction(action);
				let nextact = _mkdirSync(dirname, onaction).action;
				return createInfo(action, ...flatArray(nextact));
			}
			if (info.isDirectory()) {
				return createInfo();
			}
			throw new Error(`Invalid format of "${dirname}"`);
		} catch (error) {
			let parent = getParent(dirname);
			if (parent === dirname) {
				throw {
					message: `Root directory "${parent}" doesn't exist`,
					__proto__: error
				};
			}
			var prevact = _mkdirSync(parent, onaction).action;
			mkdirSync(dirname);
			let action = new Action('create', dirname, 'dir');
			callOnAction(action);
			return createInfo(...flatArray(prevact), action);
		}
	};

	module.exports = (dirname, onaction = _donothing) => _mkdirSync(resolvePath(dirname), onaction);

})(module);
