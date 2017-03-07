import React, { Component } from 'react';
import { render } from 'react-dom';

class FieldCheckbox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <div className="input-group">
          <span className="input-group-addon">Titel</span>
          <input id="inputParamsTitleCheck" name="inputParamsTitleCheck" required type="text" className="form-control" name="inputParamsTitleCheck" placeholder="z.B.: positiv" />           
        </div>
        <br/>
        <div className="input-group">
          <span className="input-group-addon">Wert</span>
          <input id="inputParamsValueCheck" name="inputParamsValueCheck" required type="text" className="form-control" name="inputParamsValueCheck" placeholder="z.B.: +" />           
        </div>
      </div>
    )
  }
}

export default FieldCheckbox;
