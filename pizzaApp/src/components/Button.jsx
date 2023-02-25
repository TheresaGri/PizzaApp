import './Button.css';

export default function Button({ onClick, children }) {
	return (
		<>
			<button className='button-component' onClick={onClick}>
				{children}
			</button>
		</>
	);
}
