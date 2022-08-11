import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

// import NewPlace from './places/pages/NewPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
// import UserPlaces from './places/pages/UserPlaces';
// import MainNavigation from './shared/components/Navigation/MainNavigation';
// import Auth from './user/pages/Auth';
import Users from './user/pages/Users';


import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const NewPlace = lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = lazy(() => import('./places/pages/UpdatePlace'));
const UserPlaces = lazy(() => import('./places/pages/UserPlaces'));
const MainNavigation = lazy(() => import('./shared/components/Navigation/MainNavigation'));
const Auth = lazy(() => import('./user/pages/Auth'));

const App = () => {
	const { token, login, logout, userId } = useAuth();

	let routes;

	if (token) {
		routes = (
			<Routes>
				<Route path='/' element={<Users />} exact />
				<Route path='/:userId/places' element={<UserPlaces />} exact />
				<Route path='/places/new' element={<NewPlace />} />
				<Route path='/places/:placeId' element={<UpdatePlace />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path='/' element={<Users />} exact />
				<Route path='/:userId/places' element={<UserPlaces />} exact />
				<Route path='/auth' element={<Auth />} />
				<Route path='*' element={<Navigate to='/auth' replace />} />
			</Routes>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout
			}}
		>
			<Router>
				<MainNavigation />
				<main>
					<Suspense fallback={
						<div className='center'>
							<LoadingSpinner />
						</div>
					}>
						{routes}
					</Suspense>
				</main>
			</Router>
		</AuthContext.Provider>
	)
}

export default App;
