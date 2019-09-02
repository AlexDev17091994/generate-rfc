import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FormDate extends Component {

    constructor (props){
        super(props);

        this.state = {
            inputValue: ''
        }

        this.onChange = this.onChange.bind(this);
    
    }

    onChange(e){


         if(/^(\s*[0-9-/]\s*)*$/.test(e.target.value)){
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
                id={this.props.id}
                />

                {/* <MaskedInput
                mask={[/[0-3]/,/[0-9]/,'-',/[0-1]/,/[0-9]/,'-',/[1-2]/,/\d/,/\d/,/\d/]}
                className="FormRow-input"
                placeholder={this.props.placeholderInput}
                guide={false}
                onBlur={() => {}}
                onChange={this.onChange}
                ref={this.props.ref}
                /> */}
                
            </div>
        )
    }

}

    FormDate.propTypes = {
        inputType: PropTypes.string,
        pattern: PropTypes.string,
        labelText: PropTypes.string,
        placeholderInput: PropTypes.string,
        isRequired: PropTypes.bool,
        id:PropTypes.string

}



export default FormDate;