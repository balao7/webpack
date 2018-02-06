/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const URLGenerator = require("./URLGenerator");
const URLParser = require("./URLParser");

class URLModulesPlugin {
	constructor() {
		this.plugin = {
			name: "URLModulesPlugin"
		};
	}

	apply(compiler) {
		const { plugin } = this;
		const { compilation } = compiler.hooks;

		compilation.tap(plugin, (compilation, { normalModuleFactory }) => {
			const { createParser, createGenerator } = normalModuleFactory.hooks;

			createParser.for("url").tap(plugin, options => {
				return new URLParser();
			});

			createGenerator.for("url").tap(plugin, () => {
				return new URLGenerator();
			});
		});
	}
}

module.exports = URLModulesPlugin;
