import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Card, List } from 'semantic-ui-react';

class LeaderBoard extends Component {
    cardItemsPerRow = 3;
    render() {
      const { users } = this.props
      let ulist = Object.keys(users).map((uid) => users[uid]);
        ulist.sort((u1, u2) => computeSum(u2) - computeSum(u1));

      return (
          <div className="text-center"> 
                    <List>
                    { ulist.map((u) => {
                        const { id, name, avatarURL, questions, answers } = u;
                        const numAnswered = Object.keys(answers).length;
                        return(
                            <Card>
                        <List.Item key={id}>
                        <Image avatar src={avatarURL} />
                        <List.Content>
    
                                    <List.Header>{`${name} (@${id})`}</List.Header>
                                    <List.Description>
                                    {`asked ${questions.length} questions & answered ${numAnswered} questions`}
                                    </List.Description>
                                </List.Content>
                                </List.Item>
                                </Card>
                     ) })}
                                </List>
          
          </div>
      );
    }
  }
  function computeSum(user) {
    return (Object.keys(user.answers).length + user.questions.length);
}
function mapStateToProps(state) {
    return {
        users: state.users
    }
}
  
  
  export default connect(mapStateToProps)(LeaderBoard)