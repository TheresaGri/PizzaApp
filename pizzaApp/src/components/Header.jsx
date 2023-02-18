import './Header.css';
import Badge from './Badge';

export default function Header() {
	return (
		<>
			<div id='header'>
				<div className='header-div' id='header-home'>
					Home
				</div>
				<div className='header-div' id='header-menu'>
					Menu
				</div>
				<div className='header-div' id='header-about'>
					About
				</div>
				<Badge value='5'>
					<span id='shopping-cart'>🛒</span>
				</Badge>
			</div>
		</>
	);
}
