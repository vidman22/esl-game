import React, {Component} from "react";
import CSSTransition from "react-transition-group/CSSTransition";
// import Player from '../Player/Player';
import "../StartModal/StartModal.css";

const animationTiming = {
    enter: 400,
    exit: 1000
};

export default class FinishModal extends Component {

    render() {
        console.log("players on finish" , this.props.players);
        const players = this.props.players.map((player, index) =>
                    <li key={index}>{player}<hr/></li>

              );


  return (
        <CSSTransition 
            mountOnEnter 
            unmountOnExit 
            in={this.props.show} 
            timeout={animationTiming}
            classNames={{
                enter: '',
                enterActive: 'ModalOpen',
                exit: '',
                exitActive: 'ModalClosed'
            }}>
              <div className="Modal">
                <h1>{this.props.team} Won!!!</h1>
                <h3>{this.props.winningScore} to {this.props.losingScore}</h3>
                <ol>{players}</ol>
              </div>
        </CSSTransition>
      );
    };

}