const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

function takeBefore(x, suffix) {
  return x.substr(0, x.indexOf(suffix));
}

function takeAfter(x, prefix) {
  return x.substr(x.indexOf(prefix) + prefix.length);
}

function ensureDirectoryExistsSync(filePath) {
  const dirname = path.dirname(filePath);
  
  if (fs.existsSync(dirname)) {
    return true;
  }

  ensureDirectoryExistsSync(dirname);
  
  fs.mkdirSync(dirname);

  return false;
}

const cc = process.env['CC'] || 'cc';

const file = process.argv[2];

if (!file) {
  throw new Error('You must provide a file as a command-line argument');
}

const targetDirectory = process.argv[3];

if (!targetDirectory) {
  throw new Error('You must provide a target directory as a command-line argument');
}

const includeDirectoriesOutput = execSync(cc + ' -x c -E -v /dev/null 2>&1').toString();

const prefix = '#include <...> search starts here:';
const suffix = 'End of search list.';

const includeDirectories = takeAfter(takeBefore(includeDirectoriesOutput, suffix), prefix).split(/\n/)
  .map(x => x.trim())
  .filter(x => x.length > 0)
  .filter(x => !x.includes('(framework directory)'));

const output = execSync(cc + ' -M -E ' + file).toString();

const includePaths = output.split(/[\\\s]+/)
  .filter(x => x.length > 0)
  .splice(2)
  .map(x => x.trim());

for (const includePath of includePaths) {
  for (const includeDirectory of includeDirectories) {
    if (includePath.startsWith(includeDirectory)) {
      const targetPath = path.join(targetDirectory, path.relative(includeDirectory, includePath));
      
      ensureDirectoryExistsSync(targetPath);

      fs.writeFileSync(targetPath, fs.readFileSync(includePath));

      break;
    }
  }
}
