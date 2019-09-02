import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Form.css';


class FormRow extends Component{

    constructor (props){
        super(props);

        this.state = {
            inputValue: ''
        }

        this.onChange = this.onChange.bind(this);
    
    }

    onChange(e){


            if(/^(\s*[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ]\s*)*$/.test(e.target.value)){
                this.setState({inputValue: e.target.value});
            }
     
    }

    getValue(){
        return this.state.inputValue;
    }


    render(){

        return (
            <div className="FormRow">
                <label className="FormRow-label" > {this.props.labelText} </label>
               
                <input
                type={this.props.inputType}
                className = "FormRow-input"
                value={this.state.inputValue}
                placeholder={this.props.placeholderInput}
                required={this.props.isRequired}
                onChange={this.onChange}
                pattern={this.props.pattern}
                ref={this.props.ref}
                />
                
            </div>
        )
    }
}

FormRow.propTypes = {
    inputType: PropTypes.string,
    pattern: PropTypes.string,
    labelText: PropTypes.string,
    placeholderInput: PropTypes.string,
    isRequired: PropTypes.bool,
    ref:PropTypes.string
}

export default FormRow  ;