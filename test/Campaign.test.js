const assert = required('assert');
const { Web3 } = require('web3');
const ganache = require('ganache');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../campaign/build/CampaignFactory.json');
const compiledCampaign = require('../campaign/build/Campaign.json');
const { beforeEach } = require('node:test');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();

    factory = await web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data : compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '100000' });
});