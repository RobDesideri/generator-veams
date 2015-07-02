module.exports = function promptAnswerFactory(customAnswers) {
	var defaults = {
		"projectName": "",
		"projectAuthor": "",
		"templateEngine": "",
		"installPlugin": false,
		"installCMS": false,
		"taskRunner": [
			"grunt"
		],
		"gulpModules": [],
		"gruntModules": [
			"grunt-combine-mq",
			"grunt-dr-svg-sprites"
		],
		"features": [
			"sassInsteadOfCompass"
		],
		"jsLibs": [],
		"cssLibs": [],
		"installProxy": false,
		"proxyHost": "0.0.0.0",
		"proxyPort": 80,
		"author": {
			"name": "",
			"login": "",
			"email": ""
		}
	};

	var custom = defaults;
	var val;

	for (val in customAnswers) {
		if (customAnswers.hasOwnProperty(val)) {
			custom[val] = customAnswers[val];
		}
	}

	return custom;
};
