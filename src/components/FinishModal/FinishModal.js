import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "../StartModal/StartModal.css";

const animationTiming = {
    enter: 400,
    exit: 1000
};

const FinishModal = props => {
  return (
    <CSSTransition 
        mountOnEnter 
        unmountOnExit 
        in={props.show} 
        timeout={animationTiming}
        classNames={{
            enter: '',
            enterActive: 'ModalOpen',
            exit: '',
            exitActive: 'ModalClosed'
        }}>
          <div className="Modal">
            <h1>{props.team} Won!!!</h1>
            
          </div>
    </CSSTransition>
  );
};

export default FinishModal;