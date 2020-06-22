import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Input, Form, Card, Image, Button, Message} from 'semantic-ui-react'
import { handleAddQuestion } from  '../actions/questions'

export class NewQuestion extends Component {	
	state = {      
  	optionOneText:'',
		optionTwoText:'',
	};


  handleOnChange = (e, data) => {
    this.setState({ [data.id]: data.value });
  };

  handleClick = async () => {

      const { authedUser: author, history, resetActiveIndexToZero } = this.props
    	const { optionOneText, optionTwoText} = this.state   
    
      await this.props.handleAddQuestion({
        optionOneText,
        optionTwoText,
        author
      });
      resetActiveIndexToZero();
      history.push("/");
    };
 
	render() {
        const {authedUser, users} = this.props;
        const user = users[authedUser];

		return (
			<div>
       <Card.Group centered>
            <Card style={{ width: "500px"}}>
                <Card.Content>
                    <Image size="tiny" src={user.avatarURL}/>
                   
        <div >Hello {user.name},  Add New Poll Below</div>
				<Form>
					<div>Would you rather...</div>
					<Input 
						id="optionOneText"
						type="text"
						placeholder="Please Enter Option 1"
						value={this.state.optionOneText}
            onChange={this.handleOnChange} />
					<div className="or">Or</div>
					<Form>
          <Input 
						id="optionTwoText"
						type="text"
						placeholder="Please Enter Option 2"
						value={this.state.optionTwoText}
						onChange={this.handleOnChange} />
                         </Form> 
                   <Message red style={{ color: "Red"},{floated: "centered"}}> Enter Both Options To Submit</Message>         
        <Card.Content>       
					<Button color="red" basic onClick={this.handleClick}>Submit</Button>
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

export default connect(mapSatetToProps, {handleAddQuestion})(NewQuestion);