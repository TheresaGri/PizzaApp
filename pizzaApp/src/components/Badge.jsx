import './Badge.css';

export default function Badge({ children, value }) {
	return (
		<div className='badge-container'>
			{children}
			{value > 0 ? (
				<div className='bubble'>{value}</div>
			) : value > 9 ? (
				<div className='bubble'>9+</div>
			) : null}
		</div>
	);
}
