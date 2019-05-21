import React, { useState, useEffect, useRef } from 'react';
import './searchSave.css';

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

function SearchSave() {
	const [text, setText] = useState('');
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
					subreddit: text,
				});
				localStorage.setItem('subreddits', JSON.stringify(savedSubreddits));
			}
		} else {
			const subredditsArray = [];
			subredditsArray.push({
				subreddit: text,
			});
			localStorage.setItem('subreddits', JSON.stringify(subredditsArray));
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
			<button onClick={handleSubmit}>save</button>
		</div>
	);
}

export default SearchSave;
