import React from 'react'
import UserItem from './userItem/index';
import './style.css';

function Main({ listUser }) {
	return (
		<>
			<main>
				<ul>
					{listUser.map(user => (
						<UserItem key={user._id} user={user} />
					))}
				</ul>
			</main>
		</>
	)
}

export default Main;