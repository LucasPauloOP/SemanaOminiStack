import React from 'react';
import "./style.css";
import DevForm from './devForm';

function Aside({registerUser}) {
	return (
		<aside>
			<strong>Cadastrar</strong>
			<DevForm registerUser={registerUser} />
		</aside>
	)
}

export default Aside;