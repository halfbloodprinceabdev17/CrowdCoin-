const HDWalletProvider= require('@truffle/hdwallet-provider');
const Web3 =require('web3');
const CompiledFactory =require('./build/CampaignFactory.json');
const provider = new HDWalletProvider(
    'unit spoon oppose rare swim else long math venue cake suit orbit',
    'https://goerli.infura.io/v3/fdfaa8bd59704c4abed2762fccad5ef7'
);
const web3 = new Web3(provider);
const deploy =  async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying your Account',accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(CompiledFactory.interface))
    .deploy({data: CompiledFactory.bytecode}).send({gas: '1000000',from : accounts[0]});
    console.log('Contract Deployed to',result.options.address);
    provider.engine.stop();
};
deploy();