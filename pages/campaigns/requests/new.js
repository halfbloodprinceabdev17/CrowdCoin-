import React, {Component} from "react";
import Layout from "../../../components/Layout";
import { Button,Form,Input,Message,Label} from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from '../../../ethereum/campaign';
import {Link,Router} from '../../../routes';
class Newpage extends Component{
    state= {
        value : '',
        recipient: '',
        description: '',
        loading: false,
        errorMessage : ''
    }
    static async getInitialProps(props){
        const {address} = props.query;
        return {address};
    }
    onSubmit = async event =>{
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        const {description,recipient,value}=this.state;
        this.setState({loading: true, errorMessage: ''});
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
            .createRequest(description,web3.utils.toWei(value, 'ether'),recipient)
            .send({from : accounts[0]});

        Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        }catch(err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loading : false});
    };
    render(){
        return (
            <Layout>
            <Link route={`/campaigns/${this.props.address}/requests`}>
            <a>Back</a>
             </Link>
            <h2>Create Requests!</h2>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>      
            <Form.Field><Label>Description</Label>
            <Input value = {this.state.description} 
            onChange={event => this.setState({ description : event.target.value})} /></Form.Field>
            <Form.Field><Label>Value in Ether</Label>
            <Input value = {this.state.value}
            onChange={event => this.setState({value : event.target.value})} /></Form.Field>
            <Form.Field><Label>Recipient</Label>
            <Input value ={this.state.recipient} 
            onChange = {event =>{this.setState({recipient : event.target.value})}} />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage}/>
            <Button primary loading={this.state.loading} >Create!</Button>
            </Form>
            </Layout>
       );
    } 
}
export default Newpage;