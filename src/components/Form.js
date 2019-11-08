import React from 'react';

const Form = props => {
    return (
        <form 
        className="input-group mb-3"
        onSubmit={props.submit}>
            <input 
            type="text" 
            className="form-control" 
            id="city-name" 
            placeholder="City name" 
            value={props.value}
            onChange={props.change}>
            </input>
            <div className="input-group-append">
                <button className="btn btn-success" type="submit">Search</button>
            </div>
        </form>
    );
}
export default Form;
