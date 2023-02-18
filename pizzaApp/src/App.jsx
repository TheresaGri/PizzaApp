import { useState } from 'react';
import './App.css';
import Header from './components/header';
import banner from './assets/banner.webp';

function App() {
	return (
		<div className='homepage'>
			<Header> </Header>
			<img id='restaurant-banner' src={banner}></img>
		</div>
	);
}

export default App;
