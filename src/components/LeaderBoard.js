import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Card, List, Label } from 'semantic-ui-react';

class LeaderBoard extends Component {
    cardItemsPerRow = 3;
    render() {
      const { users } = this.props
      let ulist = Object.keys(users).map((uid) => users[uid]);
  const usersWithScore ={}
      Object.keys(users).forEach(uid => {
    const user = users[uid];
    const answeredQuestions = Object.keys(user.answers).length
    const createdQuestions = user.questions.length;
    user.score = answeredQuestions + createdQuestions;
    usersWithScore[uid] = users
});
     
   
    
      return (
          <div  className="text-center"> 
                    <List>
                    { ulist.map((u) => {
                        const { id, name, avatarURL, questions, answers } = u;
                        const numAnswered = Object.keys(answers).length;
                        const createdQuestions =  questions.length
                        const score = numAnswered + createdQuestions;
                        return(
                       
                       <Card floated=""right>
                        <List.Item key={id}>
                        <Image avatar src={avatarURL} />
                            <List.Content>
    
                            <List.Header style={{ fontSize: "18px"}}>{`${name} (@${id})`}</List.Header>
                                    <List.Description>
                                    {`${questions.length} questions asked & ${numAnswered} questions answered `}

                                    </List.Description>
                                    <Label circular color={"red"}>{`Score = ${score}`}</Label>
                             </List.Content>
                         </List.Item>
                         </Card>
                     ) })}
                                </List>
          
          </div>
      );
    }
  }
function mapStateToProps(state) {
    return {
        users: state.users
    }
}
  
  
  export default connect(mapStateToProps)(LeaderBoard)