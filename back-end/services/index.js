var fs = require("fs");
var path = require("path");

var serviceFiles = fs.readdirSync(__dirname)
	.filter(function (file) {
		return file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js";
	})
	.map(function (file) {
		exports[file.slice(0,-3)] = require(path.join(__dirname, file));
		return ;
	});