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

    $('.config-wrapper').addClass('display-hidden');
    $('#standardInputWrapper').removeClass('display-hidden');
    $('#fieldTypeWrapper').removeClass('display-hidden');
    $('#exportKeyWrapper').removeClass('display-hidden');
    $('#inputExportKey').attr('required', true);
    $('#submitButtonWrapper').removeClass('display-hidden');
    $('#optionalInputWrapper').removeClass('display-hidden')
    $('#colSelectWrapper').removeClass('display-hidden');
    $('#clearWrapper').removeClass('display-hidden');
    $('#tooltipWrapper').removeClass('display-hidden');
    $('#idParamsWrapperForAll').removeClass('display-hidden');
    $('#panelWrapper').attr('configtype', 'field');
    
    this.props.changeFieldToEdit(field);

    $('#inputTitle').val(field.title);
    $('#colSelectField').val(field.cols);
    $('#fieldType').val(field.type);
    $('#inputExportKey').val(field.exportKey);
    $('#idClearBefore').prop("checked", field.clearBefore);
    $('#idClearAfter').prop("checked", field.clearAfter);
    $('#inputTooltip').val(field.tooltip);

    switch(field.type) {
      case 'code':
        $('#codeParamsWrapper').removeClass('display-hidden');
        $('#cssParam').val(field.parameters.css);
        $('#htmlParam').val(field.parameters.html);
        $('#jsParam').val(field.parameters.js);
        break;

      case 'text':
        $('#textParamsWrapper').removeClass('display-hidden');
        $('#idTextClass').val(field.parameters.class);
        $('#idTextPlaceholder').val(field.parameters.placeholder);
        $('#idTextWidth').val(field.parameters.width);
        break;

      case 'textarea':
        $('#textParamsWrapper').removeClass('display-hidden');
        $('#idTextClass').val(field.parameters.class);
        $('#idTextPlaceholder').val(field.parameters.placeholder);
        $('#idTextWidth').val(field.parameters.width);
        break;
    }

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
