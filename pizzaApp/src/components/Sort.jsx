import Button from './Button';
import './Sort.css';

export default function Sort(props) {
	return (
		<div className='sort-bar'>
			<Button id='sort-button' onClick={props.onSortName}>
				sort by name
			</Button>
			<Button id='sort-button' onClick={props.onSortPrice}>
				sort by price
			</Button>
		</div>
	);
}
