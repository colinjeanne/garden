import React from 'react';

export default class EditableText extends React.Component {
    constructor(props) {
        super(props);
        
        this.propType = {
            children: React.PropTypes.element.isRequired
        };
        
        this.state = {
            enabled: false
        };
    }
    
    handleEdit() {
        this.setState({
            enabled: !this.state.enabled
        });
    }
    
    render() {
        return (
            <div className="editableText">
                <fieldset disabled={!this.state.enabled}>
                    {this.props.children}
                </fieldset>
                <button
                    type="button"
                    className="editableTextEdit"
                    onClick={this.handleEdit.bind(this)}>
                    {(() => this.state.enabled ? 'Save' : 'Edit')()}
                </button>
            </div>
        );
    }
}