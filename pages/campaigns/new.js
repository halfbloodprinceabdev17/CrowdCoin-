import React from 'react';
import { Component } from 'react';
import Layout from '../../components/Layout';
import {Form,Button,Input,Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
class CampaignNew extends Component{
    state= {
        MinimumContribution : '',
        errMessage: '',
        loading: false
    };
    onSubmit = async (event)=>{
        event.preventDefault();
        this.setState({loading: true,errMessage: ''});
        try{
        const account = await web3.eth.getAccounts();
        await factory.methods.createCampaign(this.state.MinimumContribution).send({
            from: account[0]
        });
        Router.pushRoute('/');  //go to the root route
    }catch (err){
            this.setState({errMessage: err.message});
        }
        this.setState({loading: false});
    };
    render(){
        return(
            <Layout><h3>Create a Campaign</h3>
            <Form onSubmit ={this.onSubmit} error={!!this.state.errMessage}>
            <Form.Field>
            <label>Minimum Contribution</label>
            <Input label=' in Wei' labelPosition='right' 
            value={this.state.MinimumContribution}
            onChange ={event => this.setState({MinimumContribution : event.target.value})}
            />
            </Form.Field>
            <Message error header='Opps! Seems like You fucked up again! :)' content={this.state.errMessage}/>
            <Button loading={this.state.loading} primary>Create!</Button>
            </Form>
            </Layout>
        );

    }
}
export default CampaignNew;