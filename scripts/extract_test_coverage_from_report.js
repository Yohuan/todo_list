/* eslint-disable no-console */
const fs = require('fs');

const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
  description: 'Extract jest test coverage from the given test report',
});

parser.add_argument('-f', '--coverage-file', {
  help: 'The jest coverage report file in json format',
  dest: 'reportFile',
  type: 'str',
  required: true,
});

parser.add_argument('-t', '--coverage-type', {
  help: 'The target coverage type',
  dest: 'coverageType',
  type: 'str',
  choices: ['statements', 'branches', 'functions', 'lines'],
  required: true,
});

const args = parser.parse_args();
const { reportFile, coverageType } = args;

const rawData = fs.readFileSync(reportFile);
const { total: totalCoverage } = JSON.parse(rawData);

console.log(totalCoverage[coverageType].pct);
