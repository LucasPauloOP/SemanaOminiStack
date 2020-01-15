import React from 'react'
import UserItem from './components/userItem/index';
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import api from "./services/api";
import DevForm from './components/devForm/index';

function App() {
	const [listUser, setListUser] = React.useState([]);

	React.useEffect(() => {
		async function loadUsers() {
			const responseApi = await api.get("/users");
			setListUser(responseApi.data);
		}
		loadUsers();
	}, [])

	async function registerUser(data) {
		const responseApi = await api.post("/users", data)
		setListUser(...listUser, responseApi.data)
	}

	return (
		<div id="app">
			<aside>
				<strong>Cadastrar</strong>
				<DevForm registerUser={registerUser} />
			</aside>
			<main>
				<ul>
					{listUser.map(user => (
						<UserItem key={user._id} user={user} />
					))}
				</ul>
			</main>
		</div>
	)
}

export default App;