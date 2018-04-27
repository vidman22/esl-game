import React, {Component} from 'react';

import Player from '../Player/Player';

export default class Lobby extends Component {
	

	render() {


			const teamOne = this.props.teamone.map((player, index) => {
				return <Player
						action={this.props.action}
						switch={this.props.switch}
						delete={this.props.delete}
						name={player}
						number={index}
						team='teamOne'
						key={index} />;
			});

			const teamTwo = this.props.teamtwo.map((player, index) => {
				return <Player
						action={this.props.action}
						switch={this.props.switch}
						delete={this.props.delete}
						name={player}
						number={index}
						team='teamTwo'
						key={index} />;
			});

		return (
					<div className="container">	

						<div className="team-one">
							 <h2>{this.props.teamnames[this.props.activeteams[0]]}</h2>
							 {teamOne}
						</div>
						
						<div className="team-two">
							<h2>{this.props.teamnames[this.props.activeteams[1]]}</h2>
							 {teamTwo}
						</div>
						<div>
							<button className="first" onClick={this.props.back}>Back</button>
							<button className="second" onClick={this.props.startgame}>Start Game</button>
						</div>
						
					</div>

				)
	}
}