import React from 'react';

const editableText = props => (
    <div className="editableText">
        <fieldset disabled={!props.editing}>
            {props.children}
        </fieldset>
        <button
            type="button"
            className="editableTextEdit"
            onClick={() => props.onChange(!props.editing)}>
            {(() => props.editing ? 'Save' : 'Edit')()}
        </button>
    </div>
);

editableText.propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
    editing: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired
};

export default editableText;