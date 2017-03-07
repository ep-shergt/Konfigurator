import React, { Component } from 'react';
import { render } from 'react-dom';

class Field extends Component {

  constructor(props) {
    super(props);

    this.updateField = this.updateField.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      field: this.props.field
    };
  }

  componentWillReceiveProps(nextProps) {
    let newField = nextProps.field;
    this.updateField(newField);
  }

  updateField(newField) {
    let field = {...this.state.field};
    field = newField;
    this.setState({ field });
  }

  componentDidMount() {
    
  }

  handleClick(event, field) {
    const groupKeys = field.group.split('|');

    if ($('#fieldEditorPanel').hasClass('display-hidden')) {
      $('#fieldEditorPanel').removeClass('display-hidden');
    } else {
      $('#fieldEditorPanel').addClass('display-hidden');
    }

    $('.param-wrapper').addClass('display-hidden');

    switch (field.type) {
      case 'code':
        $('#codeParamsWrapper').removeClass('display-hidden');
        $('#cssParam').val(field.parameters.css);
        $('#htmlParam').val(field.parameters.html);
        $('#jsParam').val(field.parameters.js);
        break;

      case 'text':
        $('#textParamsWrapper').removeClass('display-hidden');
        $('#inputTextParams').val(field.parameters.class);
        break;

      case 'radio':
        $('#radioParamsWrapper').removeClass('display-hidden');
        break;

      case 'check':
        $('#checkParamsWrapper').removeClass('display-hidden');
        $('#checkInlineCheck').prop("checked", field.parameters.inline);
        $('#checkInlineBreakCheck').prop("checked", field.parameters.inlineBreak);
        break;

      case 'select':
        $('#selectParamsWrapper').removeClass('display-hidden');
        break;

      case 'textarea':
        $('#textareaParamsWrapper').removeClass('display-hidden');
        $('#inputTextAreaParams').val(field.parameters.class);
        break;
    }

    $('#inputFieldTitle').val(field.title);
    $('#colSelect').val(field.cols);
    $('#fieldType').val(field.type);
    $("#checkClearBefore").prop("checked", field.clearBefore);
    $("#checkClearAfter").prop("checked", field.clearAfter);

    this.props.changeFieldToEdit(field);
    this.props.setSubAccordionToOpen(groupKeys);
  }

  render() {
    let field = this.state.field;

    switch (this.state.field.type) {
      case 'code':
        return (
          <div className="field-node field-li" onClick={(e) => this.handleClick(e, field)}>
            <ul className="field-inner-ul">
              <li className="field-inner-li field-li-more-width"><div className="title-overflow">{this.state.field.title}</div></li>
              <li className="field-inner-li field-li-less-width">
                <div className="field-icon">
                  <i className="fa fa-file-code-o fa-2x field-code" aria-hidden="true"></i>
                </div>
              </li>
            </ul>
          </div>
        );
        break;

      case 'radio':
        return (
          <div className="field-node field-li" onClick={(e) => this.handleClick(e, field)}>
            <ul className="field-inner-ul">
              <li className="field-inner-li field-li-more-width"><div className="title-overflow">{this.state.field.title}</div></li>
              <li className="field-inner-li field-li-less-width">
                <div className="field-icon">
                  <i className="fa fa-dot-circle-o fa-2x field-radio" aria-hidden="true"></i>
                </div>
              </li>
            </ul>
          </div>
        );
        break;

      case 'check':
        return (
          <div className="field-node field-li" onClick={(e) => this.handleClick(e, field)}>
            <ul className="field-inner-ul">
              <li className="field-inner-li field-li-more-width"><div className="title-overflow">{this.state.field.title}</div></li>
              <li className="field-inner-li field-li-less-width">
                <div className="field-icon">
                  <i className="fa fa-check-square-o fa-2x field-check" aria-hidden="true"></i>
                </div>
              </li>
            </ul>
          </div>
        );
        break;

      case 'select':
        return (
          <div className="field-node field-li" onClick={(e) => this.handleClick(e, field)}>
            <ul className="field-inner-ul">
              <li className="field-inner-li field-li-more-width"><div className="title-overflow">{this.state.field.title}</div></li>
              <li className="field-inner-li field-li-less-width">
                <div className="field-icon">
                  <i className="fa fa-list-ol fa-2x field-select" aria-hidden="true"></i>
                </div>
              </li>
            </ul>
          </div>
        );
        break;

      case 'text':
        return (
          <div className="field-node field-li" onClick={(e) => this.handleClick(e, field)}>
            <ul className="field-inner-ul">
              <li className="field-inner-li field-li-more-width"><div className="title-overflow">{this.state.field.title}</div></li>
              <li className="field-inner-li field-li-less-width">
                <div className="field-icon">
                  <i className="fa fa-commenting fa-2x field-text" aria-hidden="true"></i>
                </div>
              </li>
            </ul>
          </div>
        );
        break;

      case 'textarea':
        return (
          <div className="field-node field-li" onClick={(e) => this.handleClick(e, field)}>
            <ul className="field-inner-ul">
              <li className="field-inner-li field-li-more-width"><div className="title-overflow">{this.state.field.title}</div></li>
              <li className="field-inner-li field-li-less-width">
                <div className="field-icon">
                  <i className="fa fa-file-text fa-2x field-textarea" aria-hidden="true"></i>
                </div>
              </li>
            </ul>
          </div>
        );
        break;

      default:
        return (
          <div className="field-node field-li" onClick={(e) => this.handleClick(e, field)}>
            <ul className="field-inner-ul">
              <li className="field-inner-li field-li-more-width"><div className="title-overflow">{this.state.field.title}</div></li>
              <li className="field-inner-li field-li-less-width">
                <div className="field-icon">
                  <i className="fa fa-question-circle fa-2x" aria-hidden="true"></i>    
                </div>
              </li>
            </ul>
          </div>
        );
        break;
    }
  }
}

export default Field;
