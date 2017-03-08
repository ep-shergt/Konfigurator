import React, { Component } from 'react';
import { render } from 'react-dom';
import FieldCode from './FieldCode';
import FieldText from './FieldText';
import FieldTextarea from './FieldTextarea';

class FieldConfig extends Component {

  constructor(props) {
    super(props);

    this.handleFieldData = this.handleFieldData.bind(this);

    this.state = {
      jsonData: this.props.store.database.jsonData,
      fieldToEdit: this.props.store.database.fieldToEdit
    };
  }

  handleTypeChange(event) {
    const type = event.target.value,
          selector = type + 'ParamsId';

    let fieldToEdit = this.state.fieldToEdit,
      groupKeys = fieldToEdit.group.split('|');

    $('.param-wrapper').addClass('display-hidden');
    $('#' + selector).removeClass('display-hidden');

    fieldToEdit['parameters'] = {};

    this.props.changeField(fieldToEdit);
    this.props.setSubAccordionToOpen(groupKeys);    
  }

  handleFieldData(event) {
    let newField = this.state.fieldToEdit,
        groupKeys = newField.group.split('|'),
        titleForKey;

    event.preventDefault();
      
    let fieldData = {
      inputFieldTitle: this.inputFieldTitle.value,
      fieldType: this.fieldType.value,
      tooltip: this.inputFieldTooltip.value,
      cols: this.colSelectField.value
    }

    newField.title = fieldData.inputFieldTitle;
    newField.type = fieldData.fieldType;
    newField.tooltip = fieldData.tooltip;
    newField.cols = fieldData.cols;
    newField.clearBefore = $("#fieldClearBefore").is(":checked");
    newField.clearAfter = $("#fieldClearAfter").is(":checked");

    switch(fieldData.fieldType) {
      case 'code':
        newField.parameters.css = $('#cssParam').val();
        newField.parameters.html = $('#htmlParam').val();
        newField.parameters.js = $('#jsParam').val();
        break;

      case 'text':
        newField.parameters.class = $('#inputTextParams').val();
        break;

      case 'textarea':
        newField.parameters.class = $('#inputTextareaParams').val();
        break;

      case 'check': 
        /*newField.parameters.inline = $("#checkInlineCheck").is(":checked") ? true : false;
        newField.parameters.inlineBreak = $("#checkInlineBreakCheck").is(":checked") ? true : false;*/
    }

    this.props.changeField(newField);
    this.props.setSubAccordionToOpen(groupKeys);

    $('#fieldEditorPanel').addClass('display-hidden');
    $('.param-wrapper').addClass('display-hidden');
  }

  componentWillReceiveProps(nextProps) {
    let newJsonData = nextProps.store.database.jsonData,
      newFieldToEdit = nextProps.store.database.fieldToEdit,
        jsonData = {...this.state.jsonData},
        fieldToEdit = {...this.state.fieldToEdit}

    jsonData = newJsonData;
    fieldToEdit = newFieldToEdit;

    this.setState({
      jsonData,
      fieldToEdit
    });
  }

  render() {
    return (
      <div id="fieldEditorPanel" className="display-hidden">
        <h3>Feld-Editor</h3>
        <form onSubmit={(e) => this.handleFieldData(e)}>    
          <div className="input-group">
              <span className="input-group-addon">Titel</span>
              <input required ref={(input) => { this.inputFieldTitle = input}} id="inputFieldTitle" type="text" className="form-control" name="inputFieldTitle" placeholder="Feldtitel" />            
          </div>
          <br/>  
          <div className="input-group col-xs-5">
            <span className="input-group-addon">Typ</span>
            <select onChange={this.handleTypeChange.bind(this)} ref={(input) => { this.fieldType = input}} className="form-control" id="fieldType" name="fieldType">
              <option>code</option>
              <option>radio</option>
              <option>check</option>
              <option>select</option>
              <option>text</option>
              <option>textarea</option>
            </select>
          </div>
          <br/>
          <p className="heading-parameter">Zusätzliche Optionen</p>
          <br/>
          <div className="input-group col-xs-5">
            <span className="input-group-addon">Spalten</span>
            <select ref={(input) => { this.colSelectField = input}} className="form-control" id="colSelectField" name="colSelectField">
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
          </div>
          <br/>
          <div className="input-group">
              <span className="input-group-addon">Tooltip</span>
              <input ref={(input) => { this.inputFieldTooltip = input}} id="inputFieldTooltip" type="text" className="form-control" name="inputFieldTooltip" placeholder="Tooltip - Text" />            
          </div>
          <br/>
          <div className="container-fluid">
            <div className="row vertical-align">
              <div className="input-group col-xs-5">
              <label className="label-check"><input id="fieldClearBefore" type="checkbox" value="clearBefore" />  Zeilenumbruch davor</label>
            </div>
            <div className="col-xs-2"></div>
              <div className="input-group col-xs-5">
              <label className="label-check"><input id="fieldClearAfter" type="checkbox" value="clearAfter" />  Zeilenumbruch danach</label>
            </div>
            </div>
          </div>
          <br />
          <p className="heading-parameter-param">Typ-Parameter</p>
          <br/>
          <div id="codeParamsId" className="display-hidden param-wrapper">
            <FieldCode />
          </div>
          <div id="textParamsId" className="display-hidden param-wrapper">
            <FieldText />
          </div>
          <div id="textareaParamsId" className="display-hidden param-wrapper">
            <FieldTextarea />
          </div>
          <button type="submit" className="btn btn-primary btn-field-confirm">Bestätigen</button>
         </form>
      </div>
    )
  }
}

export default FieldConfig;
