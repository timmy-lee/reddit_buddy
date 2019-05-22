import React from 'react';
import PropTypes from 'prop-types';

function SelectType({ value, handleChange, disabled }) {
	return (
		<select disabled={disabled} value={value} onChange={handleChange}>
			<option value="hot">hot</option>
			<option value="top">top</option>
			<option value="new">new</option>
			<option value="rising">rising</option>
			<option value="controversial">controversial</option>
		</select>
	);
}

SelectType.propTypes = {};

SelectType.defaultProps = {
	disabled: false,
};

export default SelectType;
