import React, { Component } from 'react';
import { render } from 'react-dom';

class FieldCode extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <div className="col-xs-12">
        <table>
          <thead>
            <tr>
              <th className="align-center">Code-Typ</th>
              <th className="align-center">Wert</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>css</th>
              <th className="th-param"><textarea className="form-control textarea-param" rows="5" id="cssParam"></textarea></th>
            </tr>
            <tr>
              <th>html</th>
              <th className="th-param"><textarea className="form-control textarea-param" rows="5" id="htmlParam"></textarea></th>
            </tr>
            <tr>
              <th>js</th>
              <th className="th-param"><textarea className="form-control textarea-param" rows="5" id="jsParam"></textarea></th>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default FieldCode;
