import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Input, Form, Card, Image, Button, Message} from 'semantic-ui-react'
import { handleAddQuestion } from  '../actions/questions'

export class NewQuestion extends Component {	
	state = {      
    	optionOneText:'',
		optionTwoText:'',
		toHome: false
	};

	handleInputChange = (event, type) => {
		const value = event.target.value;

		this.setState((state) => {
			return type === 'option1' ? {...state, optionOneText: value} : {...state, optionTwoText: value}
		});
	}

	handleSubmit = (event) => {   
    	event.preventDefault();

    	const { dispatch } = this.props
    	const { optionOneText, optionTwoText} = this.state   
    
    	dispatch(handleAddQuestion(
      		optionOneText,
      		optionTwoText
    	))

    	this.setState({
        	optionOneText:'',
			optionTwoText:'',
			toHome: true
      	})
  	}
 
	render() {
        const {authedUser, users} = this.props;
        const user = users[authedUser];
		const { toHome } = this.state;

		if (toHome) {
			return <Redirect to='/dashboard' />
		}

		return (
			<div>
                <Card.Group centered>
            <Card style={{ width: "500px"}}>
                <Card.Content>
                    <Image size="tiny" src={user.avatarURL}/>
                   
        <div >Hello {user.name},  Add New Poll Below</div>
				<Form onSubmit={this.handleSubmit}>
					<div>Would you rather...</div>
					<Input 
						name="optionOneText"
						type="text"
						placeholder="Please Enter Option 1"
						value={this.state.optionOneText}
						onChange={(event) => this.handleInputChange(event, 'option1')} />
					<div className="or">Or</div>
					<Form>
                        <Input 
						name="optionTwoText"
						type="text"
						placeholder="Please Enter Option 2"
						value={this.state.optionTwoText}
						onChange={(event) => this.handleInputChange(event, 'option2')} />
                         </Form> 
                   <Message red style={{ color: "Red"},{floated: "centered"}}> Enter Both Options To Submit</Message>         
                <Card.Content  extra>
                    
					<Button color="red" basic type="submit">Submit</Button>
                   
                   
                     </Card.Content>
                    
				</Form>
                </Card.Content>
                </Card>
                </Card.Group>
			</div> 
  		)
	}
}


const mapSatetToProps = state => {
    return {users: state.users, authedUser: state.authedUser};
}

export default connect(mapSatetToProps)(NewQuestion);