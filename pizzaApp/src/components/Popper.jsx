import './Popper.css';
import Button from './Button';
import React, { useState } from 'react';

export default function Popper() {
	const [open, setOpen] = useState(false);

	function checkPopper() {
		setOpen((prev) => !prev);
	}

	return (
		<div className='popper'>
			<Button onClick={checkPopper}>CLICK ME</Button>
			{open ? <div id='surprise'>Tadaaa!!</div> : null}
		</div>
	);
}
