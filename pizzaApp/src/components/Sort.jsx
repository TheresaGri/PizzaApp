import Button from './Button';

export default function Sorting(props) {
	return (
		<div className='sorting-bar'>
			<Button onClick={props.onSort1}>sort ba name</Button>
			<Button onClick={props.onSort2}>sort by price</Button>
		</div>
	);
}
