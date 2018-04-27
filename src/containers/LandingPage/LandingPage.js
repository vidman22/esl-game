import React, { Component } from 'react';

import Create from '../../components/CreateGame/CreateGame';
import Lobby from '../../components/GameLobby/GameLobby';
import Play from '../GamePlay/GamePlay';

import './LandingPage.css';

export default class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nickname: "",
			players: [],
			teamOne: [],
			teamTwo: [],
			action: 'input',
			teamNames: [ "Ambling Aardvarks", "Fiery Foxes", "Holistic Hippos", "Wanton Wolves", "Incisive Ibexes", "Outrageous Okapi", "Slinking Snakes", "Gregarious Giraffes", "Grumpy Goats", "Rowdy Reindeer", "Tenacious Tigers", "Untamed Unicorns", "Zany Zebras" ],
			activeTeams: [],
		};

		this.deleteWaiter = this.deleteWaiter.bind(this);
	};

	handleChange = (e) => {
		this.setState({nickname:e.target.value});
	  }

	handleSubmit = (e) => {
		e.preventDefault();
		const nickname = this.state.nickname;
		
		const players = [...this.state.players];
		players.push(nickname);
		this.setState({
			players: players,
			nickname: "", 
		});
		
	}

	generateTeams = () => {
		let array = [...this.state.players];
		let currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;

		}
		console.log("array" , array);
		const midPoint = Math.floor(array.length/2);
		const teamOne = array.slice(0, midPoint);

		const teamTwo = array.slice(midPoint, array.length);

		console.log("team one and two " , teamOne, teamTwo);


			const num1 = Math.floor(Math.random()*this.state.teamNames.length);
			let num2 = Math.floor(Math.random()*this.state.teamNames.length);
	
		console.log("number one", num1 );
		console.log("number two", num2 );
		while (num1 === num2) {
			num2 = Math.floor(Math.random()*this.state.teamNames.length); 	
		}
		this.setState({
				teamOne: teamOne,
				teamTwo: teamTwo,
				action: 'teams',
				activeTeams: [num1, num2]
			 });
	}

	deletePlayer = (team, index) => {
		if (team === 'teamOne') {
			const newTeam = [...this.state.teamOne];	
			newTeam.splice(index , 1);
			this.setState({teamOne: newTeam});
		} 
		if (team === 'teamTwo') {
			const newTeam = [...this.state.teamTwo];	
			newTeam.splice(index , 1);
			this.setState({teamTwo: newTeam});
		}
		
	}

	deleteWaiter = (index) => {
		const array = [...this.state.players];

		array.splice(index, 1);

		this.setState({
			players: array
		})
	}

	switchTeams = (team, index) => {

		if (team === 'teamOne') {
			const newTeam = [...this.state.teamOne];	
			const changedPlayer = newTeam.splice(index, 1);
			const teamTwo = [...this.state.teamTwo];
			teamTwo.push(changedPlayer);
			this.setState({
				teamOne: newTeam,
				teamTwo: teamTwo
				});
		}
		if ( team === 'teamTwo') {
			const newTeam = [...this.state.teamTwo];	
			const changedPlayer = newTeam.splice(index, 1);
			const teamOne = [...this.state.teamOne];
			teamOne.push(changedPlayer);
			this.setState({
				teamTwo: newTeam,
				teamOne: teamOne
				});
		}
	}

	back = () => {
		this.setState({
			action: 'input'
		});
	};

	startGame = () => {
			const teamOne = [...this.state.teamOne];
			const teamTwo = [...this.state.teamTwo]; 
		 if (teamOne.length < teamTwo.length) {
		 	const diff = teamTwo.length - teamOne.length;

		 	let i = 0;
		 	while (teamOne.length != teamTwo.length) {
		 		teamOne.push(teamOne[i]);
		 		i++;
		 	}

		 	this.setState({
		 		teamOne: teamOne
		 	})
		 }
		 if (teamTwo.length < teamOne.length) {
		 	const diff = teamOne.length - teamTwo.length;

		 	let i = 0;
		 	while (teamTwo.length != teamOne.length) {
		 		teamTwo.push(teamTwo[i]);
		 		i++;
		 	}

		 	this.setState({
		 		teamTwo: teamTwo
		 	})
		 }

		this.setState({
			action: 'game'
		})

	}

	addComponent = () => {
		let result;
		switch(this.state.action) {

			case 'input':
				result = (
					<div>
						<Create 
							action={this.state.action}
							players={this.state.players} 
							nickname={this.state.nickname} 
							delete={this.deleteWaiter}
							handlesubmit={this.handleSubmit} 
							handlechange={(event) => this.handleChange(event)}
							generateteams={this.generateTeams}
						/>
					</div>
					)
				break;
			case 'teams':
				result = (
					<div>
						<Lobby
							action={this.state.action}
							teamone={this.state.teamOne}
							teamtwo={this.state.teamTwo}
							teamnames={this.state.teamNames}
							delete={this.deletePlayer}
							activeteams={this.state.activeTeams}
							startgame={this.startGame}
							switch={this.switchTeams}
							back={this.back}
						/>
					</div>
					)
				break;
			case 'game': 
				result =(
					<Play 
						teamone={this.state.teamOne}
						teamtwo={this.state.teamTwo}
						activeteams={this.state.activeTeams}
						teamnames={this.state.teamNames}
					/>
					)
				break;
			default: 
				result=(
					<h1>Something went wrong</h1>
					)
		}
			return result;

	}
	
	

	render() {
		
		return (
			<div>
				{this.addComponent()}
			</div>
			);
	}

};

