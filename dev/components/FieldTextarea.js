import React, { Component } from 'react';
import { render } from 'react-dom';

class FieldTextarea extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <div className="input-group">
        <span className="input-group-addon">Klasse</span>
        <input id="inputTextareaParams" type="text" className="form-control" name="inputTextareaParams" placeholder="Klasse für Textbox" />           
      </div>
    )
  }
}

export default FieldTextarea;
