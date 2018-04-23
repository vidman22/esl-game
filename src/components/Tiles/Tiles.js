import React from 'react';

import './Tile.css';

const tile = (props) => {

	return (
		<div onClick={() => {props.score(props.tile, props.team, props.name, props.index)}} className="tile" >
			<h1>{props.tile}</h1>
		</div>

	);

}

export default tile; 