import React from 'react';
import './style.css';

function DevForm({ registerUser }) {

	const [user, setUser] = React.useState({ latitude: "", longitude: "", github_username: "", techs: "" })

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setUser({ latitude, longitude })
			},
			(err) => {
				console.log(err)
			},
			{
				timeout: 30000
			}
		)
	}, [])

	async function handleSubmit(event) {
		event.preventDefault();
		await registerUser(user);
		setUser({ github_username: "", techs: "" })
	}

	return (
		<form onSubmit={handleSubmit} >

			<div className="input-block">
				<label htmlFor="github_username">Usuário do github</label>
				<input name="github_username" id="github_username"
					value={user.github_username}
					onChange={event => setUser({ ...user, github_username: event.target.value })} required />
			</div>

			<div className="input-block" >
				<label htmlFor="techs">Tecnologias</label>
				<input name="techs" id="techs" required value={user.techs}
					onChange={event => setUser({ ...user, techs: event.target.value })} />
			</div>

			<div className="input-group">

				<div className="input-block">
					<label htmlFor="latitude">Latitude</label>
					<input name="latitude" value={user.latitude}
						onChange={event => setUser({ ...user, latitude: event.target.value })}
						id="latitude" required />
				</div>

				<div className="input-block">
					<label htmlFor="longitude">Longitude</label>
					<input name="longitude" value={user.longitude}
						onChange={event => setUser({ ...user, longitude: event.target.value })}
						id="longitude" required />
				</div>

			</div>
			<button type="submit">Salvar</button>
		</form>
	)
}

export default DevForm;