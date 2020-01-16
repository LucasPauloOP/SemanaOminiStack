import React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

function Main({ navigation }) {
	const [currentRegion, setCurrentRegion] = React.useState(null)
	const [techs, setTechs] = React.useState("")

	const [users, setUsers] = React.useState([]);

	React.useEffect(() => {
		async function loadInitialPosition() {

			const { granted } = await requestPermissionsAsync();

			if (granted) {
				// const { coords } = getCurrentPositionAsync({
				// 	enableHighAccuracy: true
				// })
			//	const {latitude, longitude} = coords;
				setCurrentRegion({
					latitude: -19.4408958,
					longitude: -42.5607639,
					latitudeDelta: 0.08,
					longitudeDelta: 0.08,
				})
			}
		}
		loadInitialPosition()
	}, [])

	function handleRegionChanged(region) {
	//	console.log(region);
		setCurrentRegion(region);
	}

	async function loadUsers() {
		const { latitude, longitude } = currentRegion;
		try{
			const response = await api.get("/search", {
				params: {
					latitude,
					longitude,
					techs
				}
			})
	
			setUsers(response.data);
		}
		catch(err) {
			console.error(err);
		}
	
	}

	if (!currentRegion) {
		return null
	}
	//console.log(currentRegion);
	return (
		<>
			<MapView onRegionChangeComplete={handleRegionChanged}
				initialPosition={currentRegion} style={styles.map} >
					{users.map(user =>(
										<Marker
										key={user._id} 
										coordinate={{
											latitude: user.location.coordinates[1],
											longitude: user.location.coordinates[0],
										}}>
											<Image style={styles.avatar} source={{ uri:user.avatar_url}} />
											<Callout onPress={() => {
												navigation.navigate("Profile", { github_username: user.github_username })
											}}>
												<View style={styles.callout}>
													<Text style={styles.userName}>{user.name}</Text>
													<Text style={styles.userBio}>{user.bio}</Text>
													<Text style={styles.userTechs}>{user.techs.join(",")}</Text>
												</View>
											</Callout>
										</Marker>
					))}
			</MapView>
			<View style={styles.searchForm}>
				<TextInput style={styles.searchFormInput}
					placeholder="Buscar desenvolvedores por tecnologias"
					placeholderTextColor="#999"
					autoCapitalize="words"
					autoCorrect={false}
					value={techs}
					onChangeText={text => setTechs(text)}
				/>
				<TouchableOpacity onPress={loadUsers} style={styles.loadButton} >
					<MaterialIcons name="my-location" size={20} color="#FFF" />
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	map: {
		flex: 1
	},
	avatar: {
		width: 54,
		height: 54,
		borderRadius: 4,
		borderWidth: 4,
		borderColor: "#FFF"
	},
	callout: {
		width: 260
	},
	userName: {
		fontWeight: "bold",
		fontSize: 16
	},
	userBio: {
		color: "#666",
		marginTop: 5
	},
	userTechs: {
		marginTop: 5
	},
	searchForm: {
		position: "absolute",
		top: 20,
		left: 20,
		right: 20,
		zIndex: 5,
		flexDirection: "row"
	},
	searchFormInput: {
		height: 50,
		flex: 1,
		backgroundColor: "#FFF",
		color: "#333",
		borderRadius: 25,
		paddingHorizontal: 20,
		fontSize: 16,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 4,
			height: 4
		},
		elevation: 2
	},
	loadButton: {
		width: 50,
		height: 50,
		backgroundColor: "#8E4Dff",
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 15
	}
})

export default Main;