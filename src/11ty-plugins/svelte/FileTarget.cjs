const fs = require("fs");
const path = require("path");
const { ImportTransformer } = require("esm-import-transformer");
// const { ImportTransformer } = await import("esm-import-transformer");

// Writes the isomorphic component JS file to the output directory
class FileTarget {
	constructor(filename, eleventyConfig) {
		this.filename = filename;
		this.parsed = path.parse(filename);
		// console.log({ parsed: this.parsed });
		this.eleventyConfig = eleventyConfig;
		this.suffix = ".client";
	}

	setSuffix(suffix) {
		this.suffix = suffix;
	}

	getFilename() {
		return this.parsed.name + this.suffix + ".js";
	}

	getImportUrl() {
		return "/" + path.join(this.parsed.dir, this.getFilename());
	}

	getOutputFile() {
		let outputDir = "./" + (this.eleventyConfig?.dir?.output || "_site");
		return path.join(outputDir, this.parsed.dir, this.getFilename());
	}

	augmentContent(content, importMap) {
		// let transformer = new ImportTransformer();
		// let code = transformer.transform(content, importMap);
		let it = new ImportTransformer(content);
		let code = it.transformWithImportMap(importMap);
		return code;
	}

	write(content, importMap) {
		if (importMap) {
			content = this.augmentContent(content, importMap);
		}

		let outputFile = this.getOutputFile();
		let { dir } = path.parse(outputFile);
		fs.mkdirSync(dir, { recursive: true });

		// TODO this writes every time it’s referenced
		fs.writeFileSync(outputFile, content, "utf8");
	}
}

module.exports = FileTarget;
