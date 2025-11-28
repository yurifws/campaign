const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');

const compiledFactory = require('./build/CampaignFactory.json')
 
provider = new HDWalletProvider(
    'region want mention plug episode gap voice cross dream also item usage',
    'https://sepolia.infura.io/v3/91f637fff8cc4fd9aaf2aeca088bdb0d'
);

const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ 
        data: compiledFactory.evm.bytecode.object
    })
    .send({ 
        gas: '5000000', 
        from: accounts[0] 
    });
 
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
 
deploy();