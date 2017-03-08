import React, { Component } from 'react';
import { render } from 'react-dom';
import { isInRange } from './../helpers'; 

class FieldText extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  handleWidthChange(event) {
    let number = Number(event.target.value);

    if(!isInRange(number, 1000)) {
      $('#inputTextWidthParams').val('');
    }
  }

  render() {
    return (
      <div id="textOptionsWrapper">
        <div className="input-group">
          <span className="input-group-addon">Klasse</span>
          <input id="inputTextParams" type="text" className="form-control"
                 name="inputTextParams" placeholder="Klasseneingabe" />            
        </div>
        <br />
        <div className="input-group">
          <span className="input-group-addon">Platzhalter</span>
          <input id="inputTextPHParams" type="text" className="form-control"
                 name="inputTextPHParams" placeholder="Platzhalter für Textfeld" />            
        </div>
        <br />
        <div className="input-group">
          <span className="input-group-addon">Breite</span>
          <input id="inputTextWidthParams" type="text" className="form-control"
                 name="inputTextWidthParams" placeholder="Breite in Pixel" onChange={this.handleWidthChange.bind(this)}/>            
        </div>
        <br />
        <p className="heading-parameter-param">Validierungen</p>
        <br/>
      </div>
    )
  }
}

export default FieldText;
