import React,{Component}from 'react'
import Campaign from '../../ethereum/campaign';
import Layout from '../../components/Layout';
import {Card,Grid} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';
import {Button} from 'semantic-ui-react';
class CampaignShow extends Component{
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution : summary[0],
            balance : summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }
    renderCards(){
        const {balance,manager,minimumContribution,requestsCount,approversCount}=this.props;
        const items = [
            {
                header: manager,
                meta:'Address of the Manager',
                description:'The manager created this Campaign and can request for money!',
                style: {overflowWrap: 'break-word'}
               // fluid : true
            },{
                header:minimumContribution,
                meta:'Minimum Contribution',
                description:'You should Contribute atleast this much to be an approver',
            },{
                header:requestsCount,
                meta:"Number of Requests",
                description:'The Number of Requests made by the Manager'
            },{
                header:web3.utils.fromWei(balance ,'ether'),
                meta:"Total Balance",
                description:"Total Balance which is inside the Smart Contract"
            },{
                header:approversCount,
                meta:"Number of People Approved",
                description:"You have to contribute the minimum contribution in order to be an approver"
            }
        ];
        return <Card.Group items={items}/>;
    }
    render(){
       
        return  <Layout>
        <br></br>
            <font  color="white"><h3>About this Campaign</h3></font>
            <br></br>
            <Grid><Grid.Column width={10}>{this.renderCards()}
            <br></br> 
            <Link route={`/campaigns/${this.props.address}/requests`}><a>
            <Button primary>View Requests</Button>
            </a>
            </Link>
            </Grid.Column>
                    <Grid.Column width ={6}><ContributeForm address={this.props.address}/></Grid.Column></Grid>
        </Layout>
    }
}
export default CampaignShow;