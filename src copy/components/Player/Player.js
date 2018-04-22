import React from 'react';
import Xmark from '../../assets/002-access-denied.svg';
import Arrows from '../../assets/003-arrows.svg';

import './Player.css';



function player (props) {
	
	if (props.action === 'input') {
	  return (
		 <div  className= "Player">
		 	<h2>{props.number + 1}. {props.name}</h2>
			<img 
						src={Xmark} 
						 
						onClick={() => { props.delete( props.number ) } } 
						alt="Delete" 
					/>
			<hr />

		</div>
		);
	}
	if (props.action === 'teams') {
		return (
			<div  className= "Player">
				<h2>{props.number + 1}. {props.name}</h2>

					<img id="wait"
						src={Xmark} 
						height="20px" 
						width="20px" 
						onClick={() => { props.delete( props.team, props.number ) } } 
						alt="Delete" 
					/>
				
				
					<img id="wait"
						src={Arrows} 
						height="20px" 
						width="20px" 
						onClick={() => { props.switch( props.team, props.number ) } } 
						alt="Switch" 
					/>
				<hr />

			</div>
		);
	}
};


export default player;