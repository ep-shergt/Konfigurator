import React, { Component } from 'react';
import { render } from 'react-dom';
import { isInRange } from './../../helpers'; 

class Parameters extends Component {

  constructor(props) {
    super(props);

    this.state = {
      jsonData: this.props.store.database.jsonData,
      fieldToEdit: this.props.store.database.fieldToEdit
    };
  }

  handleWidthChange(event) {
    let number = Number(event.target.value);

    if(!isInRange(number, 1001)) {
      $('#idTextWidth').val('');
    }
  }

  componentWillReceiveProps(nextProps) {
    let newJsonData = nextProps.store.database.jsonData,
        jsonData = {...this.state.jsonData};

    jsonData = newJsonData;

    this.setState({
        jsonData
    });
  }

  render() {
    return (
    	<div id="idParamsWrapperForAll" className="display-hidden config-wrapper">
	      	<p id="idParamsHeader" className="heading-parameter">Typabhängige-Parameter</p>
			<div id="codeParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
				<table>
					<thead>
						<tr>
							<th className="align-center">Art</th>
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
			<div id="textParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
		        <div className="input-group param-input-margin">
		            <span className="input-group-addon">Class</span>
		            <input id="idTextClass" type="text" className="form-control input-sm"
		                   name="inputTextParams" placeholder="Klasseneingabe" />            
		        </div>
		        <div className="input-group param-input-margin">
		          <span className="input-group-addon">Placeholder</span>
		          <input id="idTextPlaceholder" type="text" className="form-control input-sm"
		                 name="inputTextPHParams" placeholder="Platzhalter für Textfeld" />            
		        </div>
		        <div className="input-group param-input-margin">
		          <span className="input-group-addon">Width</span>
		          <input id="idTextWidth" type="text" className="form-control input-sm"
		                 name="inputTextWidthParams" placeholder="Breite in Pixel" onChange={this.handleWidthChange.bind(this)}/>            
		        </div>
		     </div>
		     <div id="selectParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
		     	<div className="row vertical-align">
		            <div className="input-group col-xs-4">
		                <label className="label-check"><input id="idInline" type="checkbox" value="inline" />  inline</label>
		            </div>
		            <div id="fillerDiv" className="input-group col-xs-4 display-hidden param-wrapper"></div>
		            <div id="idSelectMultiple" className="input-group col-xs-4 display-hidden param-wrapper">
		                <label className="label-check"><input id="idMultiple" type="checkbox" value="multiple" />  multiple</label>
		            </div>
		            <div className="input-group col-xs-4">
		                <label className="label-check"><input id="idInlineBreak" type="checkbox" value="inlineBreak" />  inlineBreak</label>
		            </div>
		          </div>
		     </div>
		</div>
    )
  }
}

export default Parameters;