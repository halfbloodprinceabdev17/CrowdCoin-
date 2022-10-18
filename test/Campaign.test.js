const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const CompiledFactory = require('../ethereum/build/CampaignFactory.json');
const CompiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;
beforeEach(async () => {
    accounts =await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(CompiledFactory.interface))
    .deploy({data : CompiledFactory.bytecode})
    .send({from :accounts[0],gas : '1000000'});

    await factory.methods.createCampaign('100').send({
        from : accounts[0],
        gas : '1000000'
    });
    const addresses = await factory.methods.getDeployedCampaigns().call();
    campaignAddress = addresses[0];
    campaign =await new web3.eth.Contract(JSON.parse(CompiledCampaign.interface),campaignAddress);
});

describe ('Campaign',()=>{
    it('Deployes a Factory and a Campaign', ()=>{
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
    it('Marks Caller as the Campaign Manager', async ()=>{
        const manager =  await campaign.methods.manager().call();
        console.log(manager);
        assert.equal(manager,accounts[0]);
    });
    it('Allows people to Contribute money and mark them as approvers', async ()=>{
        await campaign.methods.contribute().send({
            value : '200',
            from : accounts[1]
        });
        const isContibutor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContibutor);
    });
    it('Checks The minimum Donation', async ()=>{
        try{
            await campaign.methods.contribute().send({
                value : '3',
                from: accounts[2]
            });
            assert(false);
        }
        catch(err){
            assert(err);
        }
    });
    it("Allows the manager to post a REquest !", async ()=>{
        await campaign.methods.createRequest("Buy a Toy" ,'100',accounts[1]).send({
            from : accounts[0],
            gas : '1000000'
        });
        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy a Toy',request.description);
        console.log(request.description);
        console.log(request.value);
        console.log(request.recipient);
    });
    it('Processes Request',async ()=>{
        await campaign.methods.contribute().send({
            from : accounts[0],
            value : web3.utils.toWei('10','ether')
        });
        await campaign.methods.createRequest('Buy',web3.utils.toWei('5','ether'),accounts[2]).send({
            from : accounts[0],
            gas : '1000000'
        });
        await campaign.methods.approveRequest(0).send({from: accounts[0],gas : '1000000'});
        await campaign.methods.finalizeRequest(0).send({from: accounts[0],gas: '1000000'});
        let balance = await web3.eth.getBalance(accounts[2]);
        balance = web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);
        console.log(balance);
        console.log(accounts[0]);
        console.log(accounts[2]);
        assert(balance > 100);
    });
});