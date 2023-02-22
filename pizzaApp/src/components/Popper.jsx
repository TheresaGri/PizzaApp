import './Popper.css';
import Button from './Button';
import React, { useState } from 'react';

export default function Popper({ children }) {
	const [open, setOpen] = useState(false);

	function checkPopper() {
		setOpen((prev) => !prev);
	}

	return (
		<div className='popper' onClick={checkPopper}>
			{open ? <div className='popper-content'>{children}</div> : null}
		</div>
	);
}
