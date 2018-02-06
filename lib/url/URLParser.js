/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const path = require("path");
const { RawSource } = require("webpack-sources");

class URLParser {
	constructor(options = {}) {
		this.options = options;
	}

	parse(source, state) {
		const { module } = state;

		if (typeof source === "string") {
			source = Buffer.from(source, "utf8");
		}

		const url = path.relative(module.context, module.request);

		source = new RawSource(source);

		state.module._source = new RawSource(
			`export default '__webpack_public_path__ + ${url}'`
		);

		state.module.buildInfo.assets = {
			[url]: source
		};

		return state;
	}
}

module.exports = URLParser;
