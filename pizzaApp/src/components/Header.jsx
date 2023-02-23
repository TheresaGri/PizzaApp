import './Header.css';
import Badge from './Badge';
import { forwardRef } from 'react';
import Popper from './Popper';

function Header({ onclick, onPress, value, children }, ref) {
	return (
		<div id='header'>
			<div className='header-div' id='header-home'
			ref = {ref}
			onClick = {() => {onPress();}}
			>
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
			<Badge value={value} className='header-div' id='orders'>
				🛒
				{children}
			</Badge>
		</div>
	);
}

export default forwardRef(Header);
