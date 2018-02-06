var path = require('path');
var fs = require('fs');

exports.resolvePackagePath = function resolvePackagePath(name){
  var pathsArgs = Array.prototype.slice.call(arguments,1);
  var paths = module.paths;
  var length = paths.length;
  for(var i = 0; i < length; i++){
    var modulesPath = paths[i];
    var packagePath = path.join(modulesPath,name);
    if(fs.existsSync(packagePath)) return path.join.bind(null,packagePath).apply(null,pathsArgs);
  }
  throw new Error('package '+name+' not found!');
};
