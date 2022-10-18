import React,{Component} from 'react';
import {Form,Input,Message,Button} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import Router from 'next/router';
class Contribution extends Component{
    state={
        value: '',
        loading:false,
        errMessage: ''
    };
    onSubmit= async (event) =>{
        event.preventDefault();
        this.setState({loading: true,errMessage: ''});
        const campaign = Campaign(this.props.address);
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        }catch(err){
            this.setState({errMessage:err.message});
        }
        this.setState({loading: false,value: ''}
        );

    }
    render(){
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
            <Form.Field>
            <label>Amount to contribute</label>
            <Input 
                value={this.state.value}
                onChange={event=>this.setState({value: event.target.value})}
                label='ether'
                labelPosition='right'
            />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errMessage}/>
            <Button primary loading={this.state.loading}>
            Contribute!</Button>
            </Form>
        );


    }
}
export default Contribution;