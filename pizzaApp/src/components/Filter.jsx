import './Filter.css';

export default function Filter({ label, value, placeholder, onChange }) {
	return (
		<div id='filter'>
			<label id='filter-label'>{label}</label>
			<input
				id='filter-inputs'
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
}
