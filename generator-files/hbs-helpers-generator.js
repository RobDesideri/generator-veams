var chalk = require('chalk');
var config = require('./config.js');

var hTimesId = 'helperTimes';
var hLimitId = 'helperLimit';
var hIfId = 'helperIf';
var hIfBlockId = 'helperIfBlock';
var hAutolinkId = 'helperAutolink';
var hWrapWithId = 'helperWrapWith';
var hRandomId = 'helperRandom';

exports.questions = function () {
	return [
		{
			name: "helperPath",
			message: "Where do you have your helper files for your templates",
			default: "resources/templating/helpers"
		}, {
			name: "assembleHelperFiles",
			type: "checkbox",
			message: "Which Assemble Helpers do you want to install?",
			choices: [
				{
					name: "Times (Block Helper) - Repeat your html elements",
					value: hTimesId
				},
				{
					name: "Limit (Block Helper) - Limit your JSON output",
					value: hLimitId
				},
				{
					name: "If (Block Helper) - Execute an IF statement with any expression.",
					value: hIfId
				},
				{
					name: "IfBlock (Block Helper) - Determine if {{#block}} is set for extended layouts.",
					value: hIfBlockId
				},
				{
					name: "Autolink (Simple Helper) - Generate relative links.",
					value: hAutolinkId
				},
				{
					name: "WrapWith (Block Helper) - Enclose snippets/partials with a predefined markup.",
					value: hWrapWithId
				},
				{
					name: "Random Helper - Returns a random number.",
					value: hRandomId
				}
			]
		}
	];
};

exports.setup = function () {
	this.generatorHbsHelperPath = '../../' + config.paths.appPath + config.paths.hbsHelperPath;
	this.helperPath = this.helperPath || config.paths.helperPath;

	if (this.helperPath !== '') {
		this.helperPath = this.helperPath.replace(/\/?$/, '/');
	}
};

exports.scaffold = function () {

	if (this.assembleHelperFiles && this.assembleHelperFiles.length > 0) {
		if (this.assembleHelperFiles.indexOf(hTimesId) != -1) {
			this.copy(this.generatorHbsHelperPath + "/helper-for.js", this.helperPath + "/helper-for.js");
		}
		if (this.assembleHelperFiles.indexOf(hLimitId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-limit.js', this.helperPath + '/helper-limit.js');
		}
		if (this.assembleHelperFiles.indexOf(hIfId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-xif.js', this.helperPath + '/helper-xif.js');
		}
		if (this.assembleHelperFiles.indexOf(hIfBlockId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-ifBlock.js', this.helperPath + '/helper-ifBlock.js');
		}
		if (this.assembleHelperFiles.indexOf(hAutolinkId) != -1) {
			this.npmInstall(['handlebars-helper-autolink'], {'saveDev': true});
			this.log(
				('\n') +
				chalk.bgRed(' Autolink Helper - Please add the following lines to your package.json)') + ('\n') +
				chalk.yellow('\n "keywords": [') +
				chalk.yellow('\n    "handlebars-helper-autolink"') +
				chalk.yellow('\n ]') + ('\n') + ('\n')
			);
		}
		if (this.assembleHelperFiles.indexOf(hWrapWithId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-wrapWith.js', this.helperPath + '/helper-wrapWith.js');
			this.copy(this.generatorHbsHelperPath + '/alias.js', this.helperPath + '/alias.js');
			
			this.log(
				('\n') +
				chalk.bgRed('WrapWith Helper - For further instructions see: http://www.prototype-generator.com/templating-in-pg/template-helpers.html)') +
				chalk.yellow('\n') + ('\n') + ('\n')
			);
		}
		if (this.assembleHelperFiles.indexOf(hRandomId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-random.js', this.helperPath + '/helper-random.js');
		}
	}
};