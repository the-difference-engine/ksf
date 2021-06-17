const semver = require('semver')
const pjson = require('../package.json')

const version = pjson.engines.node;
if (!semver.satisfies(process.version, version)) {
  console.log(new Error(`Required node version ${version} not satisfied with current version ${process.version}.`));
  process.exit(1);
}