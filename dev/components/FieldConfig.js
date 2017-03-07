import React, { Component } from 'react';
import { render } from 'react-dom';

class FieldCode extends Component {

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
          selector = type + 'ParamsWrapper';

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
      fieldType: this.fieldType.value
    }

    newField.title = fieldData.inputFieldTitle;
    titleForKey = fieldData.inputFieldTitle.split(' ').join('_');
    newField.key = "fld_" + titleForKey;
    newField.type = fieldData.fieldType;
    newField.clearBefore = $("#checkClearBefore").is(":checked");
    newField.clearAfter = $("#checkClearAfter").is(":checked");

    switch(fieldData.fieldType) {
      case 'code':
        newField.parameters.css = $('#cssParam').val();
        newField.parameters.html = $('#htmlParam').val();
        newField.parameters.js = $('#jsParam').val();
        break;

      case 'text':
        newField.parameters.class = $('#inputTextParams').val();

      case 'textarea':
        newField.parameters.class = $('#inputTextAreaParams').val();

      case 'check': 
        newField.parameters.inline = $("#checkInlineCheck").is(":checked") ? true : false;
        newField.parameters.inlineBreak = $("#checkInlineBreakCheck").is(":checked") ? true : false;
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
          <button type="submit" className="btn btn-primary btn-field-confirm">Bestätigen</button>
         </form>
      </div>
    )
  }
}

export default FieldCode;
