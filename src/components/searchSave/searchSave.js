import React, { useState, useEffect, useRef } from 'react';
import './searchSave.css';
import SelectType from '../selectType';

const LIST = [
	'askreddit',
	'wtf',
	'cscareerquestions',
	'jokes',
	'justiceserved',
	'news',
	'pics',
	'aww',
	'todayilearned',
	'gifs',
	'movies',
];

function SearchSave({ updateSavedSubreddits }) {
	const [text, setText] = useState('');
	const [type, setType] = useState('top');
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	function handleClick(e) {
		const isOutside = !dropdownRef.current.contains(e.target);
		if (isOutside) {
			setOpen(false);
		}
	}
	useEffect(() => {
		document.addEventListener('click', handleClick);

		return function() {
			document.removeEventListener('click', handleClick);
		};
	});
	function handleFilter() {
		return LIST.filter(x => x.startsWith(text));
	}
	function change(e) {
		setText(e.target.value);
		if (!open) {
			setOpen(true);
		}
	}

	function handleChange(e) {
		setType(e.target.value);
	}

	function handleItemClick(x) {
		setText(x);
		setOpen(false);
	}

	function toggleList(e) {
		e.stopPropagation();
		setOpen(!open);
	}

	function handleSubmit() {
		const savedSubreddits = JSON.parse(localStorage.getItem('subreddits'));
		if (savedSubreddits && savedSubreddits.length > 0) {
			if (savedSubreddits.every(({ subreddit }) => subreddit !== text)) {
				savedSubreddits.push({
					name: text,
					type,
				});
				localStorage.setItem('subreddits', JSON.stringify(savedSubreddits));
				updateSavedSubreddits(savedSubreddits);
			}
		} else {
			const subredditsArray = [];
			subredditsArray.push({
				name: text,
				type,
			});
			localStorage.setItem('subreddits', JSON.stringify(subredditsArray));
			updateSavedSubreddits(subredditsArray);
		}
	}

	return (
		<div className="search-container">
			<div className="dropdown-container" ref={dropdownRef}>
				<input
					className="dropdown-input"
					type="text"
					value={text}
					onFocus={toggleList}
					onChange={change}
				/>
				{open && (
					<ul className="search-results-container">
						{handleFilter().map(x => (
							<li className="search-results-item" key={x} onClick={() => handleItemClick(x)}>
								{x}
							</li>
						))}
					</ul>
				)}
			</div>
			<SelectType value={type} handleChange={handleChange} />
			<button onClick={handleSubmit}>save</button>
		</div>
	);
}

export default SearchSave;
