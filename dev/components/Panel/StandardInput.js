import React, { Component } from 'react';
import { render } from 'react-dom';

class StandardPanelInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      jsonData: this.props.store.database.jsonData,
      fieldToEdit: this.props.store.database.fieldToEdit
    };
  }

  handleTypeChange(event) {
    const type = event.target.value;
    let fieldToEdit = {...this.state.fieldToEdit},
        groupKeys = fieldToEdit.group.split('|');

    $('.param-wrapper').addClass('display-hidden');
    fieldToEdit['parameters'] = {};

    switch(type) {
      case 'code':
        $('#codeParamsWrapper').removeClass('display-hidden');
        break;

      case 'text':
        $('#textParamsWrapper').removeClass('display-hidden');
        break;

      case 'textarea':
        $('#textParamsWrapper').removeClass('display-hidden');
        break;

      case 'check':
        $('#selectParamsWrapper').removeClass('display-hidden');
        $('#fillerDiv').removeClass('display-hidden');
        $('#idInlineWrapper').removeClass('display-hidden');
        $('#idInlineBreakWrapper').removeClass('display-hidden');
        fieldToEdit.parameters.options = [];
        break;

      case 'radio':
        $('#selectParamsWrapper').removeClass('display-hidden');
        $('#fillerDiv').removeClass('display-hidden');
        $('#idInlineWrapper').removeClass('display-hidden');
        $('#idInlineBreakWrapper').removeClass('display-hidden');
        fieldToEdit.parameters.options = [];
        break;

      case 'select':
        $('#selectParamsWrapper').removeClass('display-hidden');
        $('#idSelectMultiple').removeClass('display-hidden');
        $('#idSelectContainer').removeClass('display-hidden');
        $('#fillerDivLeft').removeClass('display-hidden');
        $('#fillerDivRight').removeClass('display-hidden');
        fieldToEdit.parameters.options = [];
        fieldToEdit.parameters.container = {};
        $('#textAreaContainer').val(JSON.stringify(fieldToEdit.parameters.container, null, 2));
        break;
    }

    fieldToEdit.type = type;

    this.props.changeFieldToEdit(fieldToEdit);
    this.props.changeFieldType(type);
    this.props.setSubAccordionToOpen(groupKeys);

  }

  componentDidMount() {
    let date_input=$('input[name="date"]'),
        container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";

    date_input.datepicker({
      format: 'yyyy-mm-dd',
      container: container,
      todayHighlight: true,
      autoclose: true,
      orientation: "bottom left",
      language: "de-DE"
    });
  }

  componentWillReceiveProps(nextProps) {
    let newJsonData = nextProps.store.database.jsonData,
        newFieldToEdit = nextProps.store.database.fieldToEdit,
        jsonData = {...this.state.jsonData},
        fieldToEdit = {...this.state.fieldToEdit};

    jsonData = newJsonData;
    fieldToEdit = newFieldToEdit;

    this.setState({
        jsonData,
        fieldToEdit
    });
  }

  render() {
    return (
      <div id="standardInputWrapper" className="config-wrapper display-hidden">
        <p className="heading-parameter">Pflichteinstellungen</p>
        <div className="input-group">
          <span className="input-group-addon">title</span>
          <input required id="inputTitle" type="text" className="form-control adjust-width" name="inputTitle" placeholder="" />           
        </div>
        <div id="datepickerWrapper" className="config-wrapper display-hidden">
          <div className="bootstrap-iso">
            <div className="container-fluid">
              <div className="form-group ">
                <span className="label label-info">valid_from</span>
                <input className="form-control" id="dateMainTitle" name="date" type="text"/>
                <span className="label label-info">valid_to</span>
                <input className="form-control" id="endDateMainTitle" name="date" type="text"/>
              </div>
           </div>
          </div>
        </div>
        <div id="fieldTypeWrapper" className="input-group col-xs-5 config-wrapper display-hidden">
          <span className="input-group-addon">type</span>
          <select onChange={this.handleTypeChange.bind(this)} className="form-control input-sm" id="fieldType" name="fieldType">
            <option>code</option>
            <option>radio</option>
            <option>check</option>
            <option>select</option>
            <option>text</option>
            <option>textarea</option>
          </select>
        </div>
        <div id="exportKeyWrapper" className="input-group config-wrapper display-hidden">
          <span className="input-group-addon">exportKey</span>
          <input id="inputExportKey" type="text" className="form-control input-sm adjust-width" name="inputExportKey" placeholder="" />           
          <br/>
        </div>
      </div>
    )
  }
}

export default StandardPanelInput;
