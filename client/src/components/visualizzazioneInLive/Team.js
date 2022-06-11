import React from 'react'
import './Team.css'


export default class Team extends React.Component {

    render() {
        return (
        <div id="content-team-name" className='team-text'>
            <div className="selectable-team" onClick={() => { this.props.setTeamClicked(true); this.props.setTeamName(this.props.name) }}>
                {this.props.name}
            </div>
        </div>
        );

    }
}