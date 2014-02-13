var fs = require('fs');
var path = require('path');

var Generator = module.exports = function() {
  var prompts = [];
  var files   = this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true });
  var ignores = [
    '.git',
    'LICENSE',
    'README.md',
  ];

  this.config.save();

  this.package = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.on('end', function () {
    this.installDependencies();
  });


  this.log.writeln('Generating from ' + 'Generator Building Blocks Project'.cyan + ' v' + this.package.version.cyan + '...');

  files.forEach(function(file) {
    if (ignores.indexOf(file) !== -1) {
      return;
    }

    this.copy(file, file);
  }, this);
};

Generator.name = "Generator Boilerplate";
