import './Header.css';
import Badge from './Badge';
import { forwardRef } from 'react';

function Header({ onclick, value }, ref) {
	return (
		<div id='header'>
			<div className='header-div' id='header-home'>
				Home
			</div>
			<div
				ref={ref}
				className='header-div'
				id='header-menu'
				onClick={() => {
					onclick();
				}}
			>
				Menu
			</div>
			<div className='header-div' id='header-about'>
				About
			</div>
			<Badge value={value}>
				<span id='shopping-cart'>🛒 </span>
			</Badge>
		</div>
	);
}

export default forwardRef(Header);
