import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './user/pages/Users';

const App = () => {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Routes>
					<Route path='/' element={<Users />} exact />
					<Route path='/places/new' element={<NewPlace />} />
					{/* <Redirect to='/' /> */}
				</Routes>
			</main>
		</Router>
	)
}

export default App;
