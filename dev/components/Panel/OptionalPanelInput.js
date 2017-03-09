import React, { Component } from 'react';
import { render } from 'react-dom';

class OptionalPanelInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      jsonData: this.props.store.database.jsonData,
      fieldToEdit: this.props.store.database.fieldToEdit
    };
  }

  componentDidMount() {
  
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
      <div id="optionalInputWrapper" className="display-hidden config-wrapper">
        <p className="heading-parameter">Zusätzliche Einstellungen</p>
        <div id="colSelectWrapper" className="input-group col-xs-5 config-wrapper display-hidden">
          <span className="input-group-addon">Spalten</span>
          <select className="form-control" id="colSelect" name="colSelect">
            <option></option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
          <br/>
        </div>
        <div id="tooltipWrapper" className="input-group config-wrapper display-hidden">
            <span className="input-group-addon">Tooltip</span>
            <input id="inputTooltip" type="text" className="form-control input-sm" name="inputTooltip" placeholder="Tooltip - Text" />            
        </div>
        <div id="clearWrapper" className="container-fluid config-wrapper display-hidden">
          <div className="row vertical-align">
            <div className="input-group col-xs-5">
              <label className="label-check"><input id="idClearBefore" type="checkbox" value="clearBefore" />  clearBefore</label>
            </div>
            <div className="col-xs-2"></div>
            <div className="input-group col-xs-5">
              <label className="label-check"><input id="idClearAfter" type="checkbox" value="clearAfter" />  clearAfter</label>
            </div>
          </div>
        </div>
        <div id="collapseWrapper" className="container-fluid config-wrapper display-hidden">
          <div className="row vertical-align">
            <div className="input-group col-xs-5">
            <label className="label-check"><input id="idCollapse" type="checkbox" value="collapse" /> collapse</label>
          </div>
          <div className="col-xs-1"></div>
            <div className="input-group col-xs-6">
            <label className="label-check"><input id="idAutoCollapse" type="checkbox" value="autocollapse" />  autocollapse</label>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OptionalPanelInput;
