import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Users />} exact/>
				<Route path='/places/new' element={<NewPlace />} />
				{/* <Redirect to='/' /> */}
			</Routes>
		</Router>
	)
}

export default App;
