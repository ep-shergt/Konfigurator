import React, { Component } from "react";
import { render } from "react-dom";
import Field from "./Field";
import { removeArrayElement } from './../helpers';
import { getRandomInt } from './../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class AccordionSection extends Component {

  constructor(props) {
    super(props);

    this.updateFields = this.updateFields.bind(this);
    this.markForCopy = this.markForCopy.bind(this);
    this.updateMarking = this.updateMarking.bind(this);
    this.updateFieldsToCopy = this.updateFieldsToCopy.bind(this);
    this.updateJsonData = this.updateJsonData.bind(this);
    this.insertFieldsToCopy = this.insertFieldsToCopy.bind(this);
    this.createNewField = this.createNewField.bind(this);
    this.handleDeleteField = this.handleDeleteField.bind(this);
    this.shift = this.shift.bind(this);
    this.handleMarking = this.handleMarking.bind(this);

    this.state = {
      jsonData: this.props.store.database.jsonData,
      fields: [],
      fieldsToCopy: []
    };
  }

  componentWillReceiveProps(nextProps) {
    let newFields = nextProps.elem.content,
        newFieldsToCopy = nextProps.store.database.fieldsToCopy,
        newJsonData = nextProps.store.database.jsonData;

    this.updateFieldsToCopy(newFieldsToCopy);    
    this.updateFields(newFields);
    this.updateJsonData(newJsonData);

    setTimeout(() => {
      this.updateMarking(newFields);
    }, 100);
  }

  insertFieldsToCopy(groupKeys, field, fieldIndexInJsonData) {
    let keysArr = groupKeys.split('|');

    this.props.insertFieldsToCopy(field, fieldIndexInJsonData);
    this.props.setSubAccordionToOpen(keysArr);
  }

  createNewField(groupKeys, fieldIndex) {
    const rand = getRandomInt(1, 1000);
    let keysArr = groupKeys.split('|');
   
    this.props.createField(fieldIndex, groupKeys, rand);
    this.props.setSubAccordionToOpen(keysArr);
  }

  handleDeleteField(elem, fieldIndex, fieldsLength, ulFieldId) {
    let keysArr = elem.group.split('|'),
        self = this;

    if (fieldsLength > 1) {
      $('#' + ulFieldId).fadeOut(400, () => {
        self.props.deleteField(elem, fieldIndex, fieldsLength);
        self.props.setSubAccordionToOpen(keysArr);   
      });
    }

  }

  handleMarking(elem, fieldIndex) {
    let keysArr = elem.group.split('|');

    this.props.markFieldToCopy(elem, fieldIndex);
    this.props.setSubAccordionToOpen(keysArr);
  }

  shift(groupKeys, fieldIndex) {
    let keysArr = groupKeys.split('|');

    this.props.shiftFields(fieldIndex);
    this.props.setSubAccordionToOpen(keysArr);
  }

  updateFields(newFields) {
    let fields = [...this.state.fields],
        helpingFields = [];

    newFields.forEach((i) => {
      i['marked'] = (i.marked !== undefined) ? i.marked : false;
      helpingFields.push(i);
    });

    fields = helpingFields;

    this.setState({
      fields
    });
  }

  updateMarking(newFields) {
    let fields = [...this.state.fields];

    fields = newFields;

    fields.forEach((i) => {
      const buttonId = 'btn_field_' + i.key;

      $('#' + buttonId).removeClass('marked');
      if (i.marked) {
        $('#' + buttonId).addClass('marked');
      } else {
        $('#' + buttonId).removeClass('marked');
      }
    });
  }

  updateFieldsToCopy(newFieldsToCopy) {
    let fieldsToCopy = [...this.state.fieldsToCopy];

    fieldsToCopy = newFieldsToCopy;

    this.setState({ 
      fieldsToCopy
    });
  }

  updateJsonData(newJsonData) {
    let jsonData = {...this.state.jsonData};

    jsonData = newJsonData;

    this.setState({ 
      jsonData
    });
  }

  markForCopy(elem, index) {
    const buttonId = 'btn_field_' + elem.key;
    let fieldsToCopy = [...this.state.fieldsToCopy],
        fields = [...this.state.fields],
        indexForElementToRemove;

    if (elem.marked) {
      indexForElementToRemove = fieldsToCopy.map((key, i) => {
        return key;
      }).indexOf(elem.key);

      fieldsToCopy = removeArrayElement(fieldsToCopy, indexForElementToRemove);
      fields[index].marked = false;
      $('#' + buttonId).removeClass('marked');

    } else {
      fields[index].marked = true;
      fieldsToCopy.push(fields[index].key);
      $('#' + buttonId).addClass('marked');      
    }

    this.setState({
      fieldsToCopy,
      fields
    });
  }

  componentWillMount() {
    let newFields = this.props.elem.content,
        newFieldsToCopy = this.props.store.database.fieldsToCopy;

    this.updateFieldsToCopy(newFieldsToCopy)
    this.updateFields(newFields);

    setTimeout(() => {
      this.updateMarking(newFields);
    }, 100);
  }

  render () {
    let {fields, fieldsToCopy} = this.state;
    const groupLevelOneKey = this.props.groupLevelOneKey,
          groupLevelTwoKey = this.props.elem.key;

    return (
      <div>
        <div 
          className="title" 
          onClick={(e) => this.props.click(e, this.props.groupTwo)}
        >      
          <span className="title-text">
            {this.props.elem.title}
          </span>
          <span className="arrow-wrapper">
            <i className={this.props.elem.open 
              ? "fa fa-angle-down fa-rotate-180" 
              : "fa fa-angle-down"}
            ></i>
          </span>
        </div>
       <div className={this.props.elem.open 
         ? "content content-open" 
         : "content"}
        >
          <div className={this.props.elem.open 
            ? "content-text content-text-open" 
            : "content-text"}
          >
            {this.state.fields.map((elem, i) => {
              let fieldId = 'field_' + elem.key,
                  ulFieldId = 'ul' + elem.key,
                  buttonId = "btn_field_" + elem.key,
                  groupKeys = elem.group,
                  jsonData = this.state.jsonData,
                  fieldsLength = this.state.fields.length,
                  fieldIndexInJsonData;

              fieldIndexInJsonData = jsonData.fields.map((field, i) => {
                return field.key;
              }).indexOf(elem.key);

              switch (true) {
                case elem.clearBefore && elem.clearAfter:
                  return (
                    <div key={i} id={fieldId} className="clear-both">
                      <ul id={ulFieldId} className="field-ul">
                        <li className="field-li"><Field setSubAccordionToOpen={this.props.setSubAccordionToOpen} changeFieldToEdit={this.props.changeFieldToEdit} field={elem}></Field></li>
                        <li className="field-li">
                          <div className="btn-group-vertical li-div" role="group" aria-label="edit">
                            <button onClick={() => this.handleMarking(elem, fieldIndexInJsonData)} id={buttonId} type="button" className="btn btn-default btn-xs">
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </button>
                            <div className="dropdown">
                              <button type="button" className="btn btn-default btn-xs" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li><a href="#" onClick={() => this.createNewField(groupKeys, fieldIndexInJsonData)}><i className="fa-margin fa fa-plus" aria-hidden="true"></i> Neues Element anlegen</a></li>
                                <li><a href="#" onClick={() => this.shift(groupKeys, fieldIndexInJsonData)}><i className="fa fa-arrows" aria-hidden="true"></i> Verschieben</a></li>
                                <li><a href="#" onClick={() => this.insertFieldsToCopy(groupKeys, elem, fieldIndexInJsonData)}><i className="fa-margin fa fa-arrow-down" aria-hidden="true"></i> Markierte Elemente einfügen</a></li>
                                <li><a href="#" onClick={() => this.handleDeleteField(elem, fieldIndexInJsonData, fieldsLength, ulFieldId)}><i className="fa-margin fa fa-times" aria-hidden="true"></i> Element löschen</a></li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                  break;

                case elem.clearBefore && !elem.clearAfter:
                  return (
                    <div key={i} id={fieldId} className="clear-left">
                      <ul id={ulFieldId} className="field-ul">
                        <li className="field-li"><Field setSubAccordionToOpen={this.props.setSubAccordionToOpen} changeFieldToEdit={this.props.changeFieldToEdit} field={elem}></Field></li>
                        <li className="field-li">
                          <div className="btn-group-vertical li-div" role="group" aria-label="edit">
                            <button onClick={() => this.handleMarking(elem, fieldIndexInJsonData)} id={buttonId} type="button" className="btn btn-default btn-xs">
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </button>
                            <div className="dropdown">
                              <button type="button" className="btn btn-default btn-xs" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li><a href="#" onClick={() => this.createNewField(groupKeys, fieldIndexInJsonData)}><i className="fa-margin fa fa-plus" aria-hidden="true"></i> Neues Element anlegen</a></li>
                                <li><a href="#" onClick={() => this.shift(groupKeys, fieldIndexInJsonData)}><i className="fa fa-arrows" aria-hidden="true"></i> Verschieben</a></li>
                                <li><a href="#" onClick={() => this.insertFieldsToCopy(groupKeys, elem, fieldIndexInJsonData)}><i className="fa-margin fa fa-arrow-down" aria-hidden="true"></i> Markierte Elemente einfügen</a></li>
                                <li><a href="#" onClick={() => this.handleDeleteField(elem, fieldIndexInJsonData, fieldsLength, ulFieldId)}><i className="fa-margin fa fa-times" aria-hidden="true"></i> Element löschen</a></li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                  break;

                case !elem.clearBefore && elem.clearAfter:
                  return (
                    <div key={i} id={fieldId} className="clear-right">
                      <ul id={ulFieldId} className="field-ul">
                        <li className="field-li"><Field setSubAccordionToOpen={this.props.setSubAccordionToOpen} changeFieldToEdit={this.props.changeFieldToEdit} field={elem}></Field></li>
                        <li className="field-li">
                          <div className="btn-group-vertical li-div" role="group" aria-label="edit">
                            <button onClick={() => this.handleMarking(elem, fieldIndexInJsonData)} id={buttonId} type="button" className="btn btn-default btn-xs">
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </button>
                            <div className="dropdown">
                              <button type="button" className="btn btn-default btn-xs" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li><a href="#" onClick={() => this.createNewField(groupKeys, fieldIndexInJsonData)}><i className="fa-margin fa fa-plus" aria-hidden="true"></i> Neues Element anlegen</a></li>
                                <li><a href="#" onClick={() => this.shift(groupKeys, fieldIndexInJsonData)}><i className="fa fa-arrows" aria-hidden="true"></i> Verschieben</a></li>
                                <li><a href="#" onClick={() => this.insertFieldsToCopy(groupKeys, elem, fieldIndexInJsonData)}><i className="fa-margin fa fa-arrow-down" aria-hidden="true"></i> Markierte Elemente einfügen</a></li>
                                <li><a href="#" onClick={() => this.handleDeleteField(elem, fieldIndexInJsonData, fieldsLength, ulFieldId)}><i className="fa-margin fa fa-times" aria-hidden="true"></i> Element löschen</a></li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                  break;

                case !elem.clearBefore && !elem.clearAfter:
                  return (
                    <div key={i} id={fieldId}>
                      <ul id={ulFieldId} className="field-ul">
                        <li className="field-li"><Field setSubAccordionToOpen={this.props.setSubAccordionToOpen} changeFieldToEdit={this.props.changeFieldToEdit} field={elem}></Field></li>
                        <li className="field-li">
                          <div className="btn-group-vertical li-div" role="group" aria-label="edit">
                            <button onClick={() => this.handleMarking(elem, fieldIndexInJsonData)} id={buttonId} type="button" className="btn btn-default btn-xs">
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </button>
                            <div className="dropdown">
                              <button type="button" className="btn btn-default btn-xs" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li><a href="#" onClick={() => this.createNewField(groupKeys, fieldIndexInJsonData)}><i className="fa-margin fa fa-plus" aria-hidden="true"></i> Neues Element anlegen</a></li>
                                <li><a href="#" onClick={() => this.shift(groupKeys, fieldIndexInJsonData)}><i className="fa fa-arrows" aria-hidden="true"></i> Verschieben</a></li>
                                <li><a href="#" onClick={() => this.insertFieldsToCopy(groupKeys, elem, fieldIndexInJsonData)}><i className="fa-margin fa fa-arrow-down" aria-hidden="true"></i> Markierte Elemente einfügen</a></li>
                                <li><a href="#" onClick={() => this.handleDeleteField(elem, fieldIndexInJsonData, fieldsLength, ulFieldId)}><i className="fa-margin fa fa-times" aria-hidden="true"></i> Element löschen</a></li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                  break;
              }
            })}
          </div>
        </div>
      </div>
    );
  };   
 }

export default AccordionSection;
