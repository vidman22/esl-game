import React, {Component} from 'react';
// import axios from 'axios';
import GPlayer from '../../components/GamePlayer/GamePlayer';
import StartModal from '../../components/StartModal/StartModal';
import FinishModal from '../../components/FinishModal/FinishModal';
import Tile from '../../components/Tiles/Tiles';
import Verbs from '../../IrregularVerbs';

let currentTurnOne = 0;

let currentTurnTwo = 0;

let turnOne = 0;

let turnTwo = 0;

export default class Play extends Component {

	constructor(props) {
		super(props);

		this.state = {
		  irregularVerbs: [],
		  activeWords1: [],
		  activeWords2: [],
		  activePlayerTeamOne: this.props.teamone[0],
		  activePlayerTeamTwo: this.props.teamtwo[0],
		  startModal: true,
		  finishModal: false,
		  winningTeam: "",
		  scoreTeamOne: 0,
		  scoreTeamTwo: 0,
		  activeValue1: "",
		  activeValue2: ""
				
	   }


	}

	componentWillMount() {
		this.newBoard('one');
		this.newBoard('two');

	}

	newBoard(team) {
		console.log("new board");
		let array = Verbs;	
		
		
		let currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		array = array.slice(0, 6);
		
		let arrayV2 =[];
		for (let i=0 ; i < array.length; i ++ ) {
			arrayV2.push({v1: array[i].v1, v2: array[i].v2});
		}
		let arrayV3 =[];
		for (let i=0 ; i < array.length; i ++ ) {
			arrayV3.push({v1: array[i].v1, v2: array[i].v3});
		}
		
		let newArray = arrayV2.concat(arrayV3);

		

		let currentIndex1 = newArray.length, temporaryValue1, randomIndex1;

		while (0 !== currentIndex1) {

			randomIndex1 = Math.floor(Math.random() * currentIndex1);
			currentIndex1 -= 1;

			temporaryValue1 = newArray[currentIndex1];
			newArray[currentIndex1] = newArray[randomIndex1];
			newArray[randomIndex1] = temporaryValue1;
		} 

		let randomWordIndex = Math.floor(Math.random() * newArray.length);

		const activeWord = newArray[randomWordIndex].v1;

		if ( team === 'one') {
			console.log("board one array ", newArray)
			this.setState({
				activeWords1: newArray,
				activeValue1: activeWord
				
			})

		} 
		if (team === 'two') {
			console.log("board two array ", newArray)
			this.setState({
				activeValue2: activeWord,
				activeWords2: newArray
			})
		}

	}

	nextRound = (team) => {
		console.log("triggered");
		if (team === 'one') {
			const teamOne = [...this.props.teamone];

			turnOne = currentTurnOne++ % teamOne.length;

			let activePlayerTeamOne = teamOne[currentTurnOne];
			console.log(activePlayerTeamOne);

			this.newBoard(team);

			this.setState({
			activePlayerTeamOne: activePlayerTeamOne
		   });

			if (activePlayerTeamOne === undefined) {

				this.finish('one');


			}

			


		} 
		
		if ( team === 'two') {
			const teamTwo = [...this.props.teamtwo];

			
			turnTwo = currentTurnTwo++ % teamTwo.length;

			
			let activePlayerTeamTwo = teamTwo[currentTurnTwo];
			console.log(activePlayerTeamTwo);

			this.newBoard(team);

			 this.setState({ 
			 	activePlayerTeamTwo: activePlayerTeamTwo 
			 });

			if (activePlayerTeamTwo === undefined) {
				this.finish('two');
			}

			
		}
	};
	
	start = () => {
		this.setState({
			startModal: false
		});
	};

	finish = (team) => {
		let winningTeam = "";
		if (team === 'one') {
			winningTeam = this.props.teamnames[this.props.activeteams[0]];
		}
		if ( team === 'two') {
			winningTeam = this.props.teamnames[this.props.activeteams[1]];

		}
		this.setState({
			finishModal: true,
			winningTeam: winningTeam
		});
	};

	handleClick = (tile, team, value, index) => {
		console.log(value + " value clicked");
		console.log(tile + " tile clicked")
		// Team One word array handling
		if ( value === this.state.activeValue1 && team==='one') {
			console.log("correct click");
			let newArray = [...this.state.activeWords1];
			newArray.splice(index, 1);

			let scoreTeamOne = this.state.scoreTeamOne;
			scoreTeamOne++;

			if (scoreTeamOne !==0 && scoreTeamOne%2 === 0 && newArray[0] !== undefined ) {

					const newActiveWord = newArray[Math.floor(Math.random() * newArray.length)].v1;

					this.setState({
						activeValue1: newActiveWord,
						scoreTeamOne: scoreTeamOne,
						activeWords1: newArray
					});

				} 
				 if (newArray[0] !== undefined) {
					this.setState({
						scoreTeamOne: scoreTeamOne,
						activeWords1: newArray
				 })
				}
				if ( newArray[0] === undefined) {
					this.setState({
						scoreTeamOne: scoreTeamOne
					});
					this.nextRound(team);
				}
		}

		if ( value === this.state.activeValue2 && team==='two') {
			console.log("correct click");
			let newArray = [...this.state.activeWords2];
			newArray.splice(index, 1);

			let scoreTeamTwo = this.state.scoreTeamTwo;
			scoreTeamTwo++;

			if (scoreTeamTwo !==0 && scoreTeamTwo%2 === 0 && newArray[0] !== undefined ) {

					const newActiveWord = newArray[Math.floor(Math.random() * newArray.length)].v1;

					this.setState({
						activeValue2: newActiveWord,
						scoreTeamTwo: scoreTeamTwo,
						activeWords2: newArray
					});

				} if (newArray[0] !== undefined) {
					this.setState({
						scoreTeamTwo: scoreTeamTwo,
						activeWords2: newArray
					})
				}
				 if ( newArray[0] === undefined) {
				 	this.setState({
						scoreTeamTwo: scoreTeamTwo
					});
					this.nextRound(team);
				}


		}
		

};
	



	render() {

		
		
		const teamOne = this.props.teamone.map((player, index) => {
				return <GPlayer
						active={this.state.activePlayerTeamOne}
						name={player}
						key={index} />;
			});

		const teamTwo = this.props.teamtwo.map((player, index) => {
				return <GPlayer
						active={this.state.activePlayerTeamTwo}
						name={player}
						key={index} />;
			});

		const firstBoard = this.state.activeWords1.map((tile, index) => {
				return <Tile
						team='one' 
						name={tile.v1}
						score={this.handleClick}
						tile={tile.v2}
						
						index={index}
						key={index} />;
		
		});
		const secondBoard = this.state.activeWords2.map((tile, index) => {
				return <Tile 
						team='two'
						name={tile.v1}
						score={this.handleClick}
						tile={tile.v2}
						
						index={index}
						key={index} />;
		
		});



		return(
			<div>
				<div className="team-one">
					
					<h2>{this.props.teamnames[this.props.activeteams[0]]}</h2>
					{teamOne}
					<div>Score: {this.state.scoreTeamOne}</div>
					<div>
						<h2>{this.state.activeValue1}</h2>
						{firstBoard}
					</div>
				</div>
				<div className="team-two">
					<h2>{this.props.teamnames[this.props.activeteams[1]]}</h2>
					
					{teamTwo}
					<div>Score: {this.state.scoreTeamTwo}</div>
					<div>
						<h2>{this.state.activeValue2}</h2>
						{secondBoard}
					</div>
				</div>
				<StartModal show={this.state.startModal} start={this.start} />
				<FinishModal show={this.state.finishModal} finish={this.finish} team={this.state.winningTeam} />


				
			</div>


		)

	}

}