import React, { useState } from 'react';
import '../stylesheets/listItem.css';
import SelectType from './selectType';

function ListItem({ name, deleteSubreddit, type, saveChanges }) {
	const [editing, setEditing] = useState(false);
	const [selectedType, setSelectedType] = useState(type);

	function handleChange(e) {
		setSelectedType(e.target.value);
	}

	function handleSave(name, type) {
		saveChanges(name, type);
		setEditing(false);
	}

	return (
		<div className="list-item-container">
			<span>{name}</span>
			<SelectType disabled={!editing} value={selectedType} handleChange={handleChange} />
			<div className="actions">
				{!editing && <button onClick={() => setEditing(!editing)}>Edit</button>}
				<button onClick={() => deleteSubreddit(name)}>Delete</button>
				{editing && <button onClick={() => handleSave(name, type)}>Save</button>}
			</div>
		</div>
	);
}

export default ListItem;
