import { useState } from 'react';
import './Modal.scss';

export function Modal ({ show, title, modalPaneClass, children }){
//Initialisation ---------------------------------
//State ------------------------------------------
//Handlers ---------------------------------------
//View -------------------------------------------
	return show ? (
		<div className='ModalOverlay'>
			<div className={`ModalPane ${modalPaneClass}`}>
				<header>
					<p>{title}</p>
				</header>
					<main>{children}</main>
			</div>
		</div> 
	) : null;

}

export function useModal(isOpen, initialContent = null){
//Initialisation ---------------------------------
//State ------------------------------------------
const [state, setState] = useState({show: isOpen, content: initialContent});


//Handlers ---------------------------------------
const open = (content) => setState({show: true, content});
const close = () => setState({...state, show: false });

//View -------------------------------------------
return [state.show, state.content, open, close];
}
