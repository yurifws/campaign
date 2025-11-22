const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode']
            }
        }
    }
};

console.log('Compiling...');
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
    output.errors.forEach(error => {
        console.log(error.formattedMessage);
    });
}

const contracts = output.contracts['Campaign.sol'];
console.log('Contracts found:', Object.keys(contracts));

fs.ensureDirSync(buildPath);

for(let contract in contracts) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        contracts[contract]
    );
    console.log('Writing:', contract + '.json');
}

console.log('Done!');