import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import Users from './user/pages/Users';

import { AuthContext } from './shared/context/auth-context';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = useCallback(() => {
		setIsLoggedIn(true);
	});

	const logout = useCallback(() => {
		setIsLoggedIn(false);
	});

	return (
		<AuthContext.Provider value={{
			isLoggedIn: isLoggedIn,
			login: login,
			logout: logout
		}}>
			<Router>
				<MainNavigation />
				<main>
					<Routes>
						<Route path='/' element={<Users />} exact />
						<Route path='/:userId/places' element={<UserPlaces />} exact />
						<Route path='/places/new' element={<NewPlace />} />
						<Route path='/places/:placeId' element={<UpdatePlace />} />
						<Route path='/auth' element={<Auth />} />
						{/* <Redirect to='/' /> */}
					</Routes>
				</main>
			</Router>
		</AuthContext.Provider>
	)
}

export default App;
