import React, { Component } from 'react';
import '../style.css';

class Example extends Component {
    constructor() {
        super();

        this.state = {
            issues: [
                {
                    title: 'Some title',
                    sub: 'Some sentence',
                    choices: ['blue', 'orange', 'pink'],
                    choice: ''
                },
                {
                    title: 'Another title',
                    sub: 'Some sentence',
                    choices: ['red', 'grey', 'brown'],
                    choice: ''
                }
            ]
        }
    }

    submitVote() {

    }
    
    selectChoice(index, choice, e) {
        let issues = [...this.state.issues];
        issues[index].choice = choice;

        this.setState({
            issues: issues
        });
        
        let buttons = e.target.parentNode.childNodes;
        
        buttons.forEach(button => button.classList.remove('selected'));

        e.target.classList.add('selected');
    }

    render() {
        return(
            <div className="column y-center">
                {this.state.issues.map((issue, i) => (
                    <div key={issue.title} className="column y-center">
                        <h3>{issue.title}</h3>
                        <p>Issue Title: {issue.sub}</p>
                        <div className="column choices">
                            {issue.choices.map(choice => (
                                <button key={choice} onClick={(e) => this.selectChoice(i, choice, e)}>{choice}</button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Example;