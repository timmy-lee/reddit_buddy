import React, { useState, useEffect, useRef } from 'react';
import './searchSave.css';
import SelectType from '../selectType';

const LIST = [
	'askreddit',
	'cscareerquestions',
	'programminghumor',
	'stocks',
	'funny',
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
	const [subscribed, setSubscribed] = useState('');
	const [showMessage, setShowMessage] = useState(false);
	const [showErrorMessage, setErrorMessage] = useState(false);
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

	function afterActions() {
		setSubscribed(text);
		setText('');
		setShowMessage(true);
		setTimeout(() => {
			setShowMessage(false);
		}, 5000);
	}

	function handleSubmit() {
		const savedSubreddits = JSON.parse(localStorage.getItem('subreddits'));
		if (text.trim().length > 0) {
			if (savedSubreddits) {
				const subreddits = Object.keys(savedSubreddits);
				if (subreddits.every(subreddit => subreddit !== text)) {
					savedSubreddits[text] = { ...savedSubreddits[text], type };
					localStorage.setItem('subreddits', JSON.stringify(savedSubreddits));
					afterActions();
				} else {
					setErrorMessage(true);
					setTimeout(() => {
						setErrorMessage(false);
					}, 5000);
				}
			} else {
				const newSubreddit = {
					[text]: {
            type,
            seenIds: {},
            posts: [],
          },
				};
				localStorage.setItem('subreddits', JSON.stringify(newSubreddit));
				afterActions();
			}
		}
	}

	return (
		<div>
			<h3>
				add subscriptions here!! <span role="img">🗑🥦☺️🏃‍</span>
			</h3>
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
			{showMessage && (
				<p className="success-message">
					You're now subscribed to <bold>r/{subscribed}</bold> notification!
				</p>
			)}
			{showErrorMessage && (
				<p className="error-message">r/{text} already exists in your subscriptions!</p>
			)}
			<p id="mohnish">mohnish was once a sheep herder before he joined toutapp</p>
		</div>
	);
}

export default SearchSave;
