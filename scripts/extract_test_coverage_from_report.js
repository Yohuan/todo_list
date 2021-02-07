/* eslint-disable no-console */
const fs = require('fs');

const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
  description: 'Parse jest test coverage',
});

parser.add_argument('-f', '--coverage-file', {
  help: 'The jest test coverage file in json format',
  dest: 'inputFile',
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
const { inputFile, coverageType } = args;

const rawData = fs.readFileSync(inputFile);
const { total: totalCoverage } = JSON.parse(rawData);

console.log(totalCoverage[coverageType].pct);
