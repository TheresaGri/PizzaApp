import './Select.css';

export default function Select(props) {
	return (
		<>
			<select
				className='filter-selections'
				value={props.select}
				onChange={(event) => props.onChange(event)}
			>
				{props.array.map((e, index) => (
					<option key={index} value={e.value}>
						{e.name}
					</option>
				))}
			</select>
		</>
	);
}
