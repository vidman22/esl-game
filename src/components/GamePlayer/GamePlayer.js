import React from 'react';
import Avatar from '../../assets/profile.svg'

import './GamePlayer.css';


const gplayer = (props) => {
	if (props.name === props.active) {
		return (
		  <div className="active">	
			<img src={Avatar} alt="Avatar" />
			<span>{props.name}</span>

		</div>
		);
	}
	else {
		return (
			<div className="game">
				<img src={Avatar} alt="Avatar" />
				<span>{props.name}</span>

			</div>

		)
	}
	
};

export default gplayer;