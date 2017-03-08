import React, { Component } from 'react';
import { render } from 'react-dom';

class FieldText extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <div className="input-group">
        <span className="input-group-addon">Klasse</span>
        <input id="inputTextParams" type="text" className="form-control" name="inputTextParams" placeholder="Klasseneingabe" />            
      </div>
    )
  }
}

export default FieldText;
