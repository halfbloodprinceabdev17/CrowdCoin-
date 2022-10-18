import React,{Component} from 'react';
import { Card,Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import {Link} from '../routes';


class CampaignIndex extends Component{
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns};
    }
renderCampaigns(){
    const items = this.props.campaigns.map(address =>{
        return{
            header : address,
            description : (<Link route={`/campaigns/${address}`}><a>See some nudes of parthib</a>
            </Link>),
            fluid: true
    };
});
return <Card.Group items={items}/>
}

    render(){
    return <Layout>
    <div>
    <h1><i><b>Open Campaigns</b></i></h1>
    <Link route='/campaigns/new'>
    <a><Button floated='right' content="Create Campaigns" 
    icon='add circle'
    primary />
    </a>
    </Link>
    {this.renderCampaigns()} 
    </div>
    </Layout>;
    }
}
export default CampaignIndex;
