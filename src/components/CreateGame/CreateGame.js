import React, {Component} from 'react';

import Player from '../Player/Player';

export default class Create extends Component {



	render() {

		const players = this.props.players.map((player, index) => {
			  		return <Player
			  			action={this.props.action}
			  			delete={this.props.delete}
			  			name={player}
			  			number={index}
			  			key={index} />;

			  });
		return (
			<div>
						<form onSubmit={this.props.handlesubmit} className="login-form" >

							<label htmlFor="nickname">
								<h2>Add a Name</h2>
							</label>
							<input
								type="text"
								name="name"
								value={this.props.nickname}
								onChange={this.props.handlechange}
								placeholder={'Name'}
							/>
							 
						</form>
						<button type="submit" name="submitPlayer" onClick={this.props.handlesubmit}>Add</button>
					  	<button disabled={this.props.disablebutton}  onClick={this.props.generateteams}>Shuffle</button>
					  <div>

					    {players}

					  </div> 
					</div>
			)
	}
}