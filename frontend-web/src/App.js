import React from 'react'
import './global.css'
import './App.css'
import api from "./services/api";
import Aside from './components/aside/index';
import Main from './components/main/index';

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
			<Aside registerUser={registerUser} />
			<Main listUser={listUser} />
		</div>
	)
}

export default App;