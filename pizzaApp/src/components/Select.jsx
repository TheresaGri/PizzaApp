import './Select.css';

export default function Select(props) {
	return (
		<div id='select'>
			<label id='select-label'>{props.label}</label>
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
		</div>
	);
}
