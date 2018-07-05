import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder } from '../actions';
import { bake_cookie, read_cookie } from 'sfcookies';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        };
    }
    addReminder() {

        this.props.addReminder(this.state.text)
        // console.log(this.props)
    }
    renderReminders() {
        // console.log(read_cookie('reminder'))
        let cok = read_cookie('reminder');
        // cok.map(item => {
        //     console.log(item.text)
        // })
        const { reminders } = this.props;
        // console.log(JSON.parse(reminders))
        return (
            <ul>
                {
                    reminders.map((reminder, index) => {
                        // console.log(reminder)
                        return (
                            <li key={index}>
                                {reminder.text}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    render() {
        return (
            <div className="App">
                <div>Reminder Pro</div>
                <div>
                    <div>
                        <input
                            type='text'
                            placeholder='I have too...'
                            onChange={(event) => this.setState({
                                text: event.target.value
                            })}
                        />
                    </div>
                    <button type='button'
                        onClick={() => this.addReminder()}
                    >add</button>
                    {this.renderReminders()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        reminders: state
    }
}


export default connect(mapStateToProps, { addReminder })(App);
