import Button from './Button';
import './Sort.css';

export default function Sorting(props) {
	return (
		<div className='sorting-bar'>
			<Button className='sort-button' onClick={props.onSortName}>
				sort by name
			</Button>
			<Button className='sort-button' onClick={props.onSortPrice}>
				sort by price
			</Button>
		</div>
	);
}
