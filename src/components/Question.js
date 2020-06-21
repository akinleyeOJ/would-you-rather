import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button,Image, Card,  Menu, Tab } from "semantic-ui-react";

class Question extends Component {
  cardItemsPerRow = 1;
  getCardsFromQuestions = filterLogic => {
    const { questions, users } = this.props;
    const cards = Object.keys(questions)
      .filter(filterLogic)
      .map(qid => {
        const question = questions[qid];
        const user = users[question.author];
        return (
          <Card key={qid}>
            <Card.Content>
              <Image src={user.avatarURL} size="tiny" />
              <Card.Header>{user.name} asks</Card.Header>
              <div>
                Would you rather {question.optionOne.text} <text fontWeight={"Bold"}>(OR)</text>  {" "} {question.optionTwo.text}?
              </div>
            </Card.Content>
            <Card.Content extra>
                <Link to={`/questions/${qid}`} style={{ width: "100%" }}>
                  <Button color="red"> View Poll</Button>
                </Link>
          
            </Card.Content>
          </Card>
        );
      });

    return cards.length
      ? [
          cards.length,
          <Card.Group itemsPerRow={this.cardItemsPerRow}>{cards}</Card.Group>
        ]
      : [cards.length];
  };

  render() {
    const { questions, authedUser, activeIndex, handleTabChange } = this.props;
// dont forget...fix the bug here 
    const [
      unansweredQuestionsCount,
      unansweredQuestionsContent = "All questions have been answered."] = this.getCardsFromQuestions(
      id =>
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
    );

    const [
      answeredQuestionsCount,
      answeredQuestionsContent = "No answered questions to show."] = this.getCardsFromQuestions(
      qid =>
        questions[qid].optionOne.votes.includes(authedUser) ||
        questions[qid].optionTwo.votes.includes(authedUser)
    );

    const panes = [
      {
        menuItem: (
          <Menu.Item key="unanswered-questions">
            Unanswered Questions ({unansweredQuestionsCount})
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{unansweredQuestionsContent}</Tab.Pane>
      },
      {
        menuItem: (
          <Menu.Item key="answered-questions">
            Answered Questions ({answeredQuestionsCount})
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{answeredQuestionsContent}</Tab.Pane>
      }
    ];

    return (
      <div>
        <div>
          <Tab
            panes={panes}
            activeIndex={activeIndex}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
        </div>
      </div>
    );
  }
}

const sortQuestionsByTimeStamp = questions => {
  const questionsSorted = {};
  Object.keys(questions)
    .map(key => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach(question => {
      questionsSorted[question.id] = question;
    });
  return questionsSorted;
};

const mapStateToProps = state => {
  return {
    questions: sortQuestionsByTimeStamp(state.questions),
    users: state.users,
    authedUser: state.authedUser
  };
};

export default connect(mapStateToProps)(Question);
