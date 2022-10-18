import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xBbF978415a160f5B9DF218BEedB92c9CE0c342aE'
);
export default instance;