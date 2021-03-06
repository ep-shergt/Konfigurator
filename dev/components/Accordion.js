import React, { Component } from 'react';
import { render } from 'react-dom';
import SubAccordion from './SubAccordion';
import { removeArrayElement } from './../helpers';
import { splitValidation } from './../helpers';
import { getRandomInt } from './../helpers';

class Accordion extends Component {

  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.updateMarking = this.updateMarking.bind(this);
    this.updateAccordion = this.updateAccordion.bind(this);
    this.updateGroupsLevelOneToCopy = this.updateGroupsLevelOneToCopy.bind(this);
    this.updateJsonData = this.updateJsonData.bind(this);
    this.updateGroupOneToEdit = this.updateGroupOneToEdit.bind(this);
    this.openMainTitlePanel = this.openMainTitlePanel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.createNewGroupOne = this.createNewGroupOne.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.shift = this.shift.bind(this);

    this.state = {
      jsonData: this.props.store.database.jsonData,
      accordion: [],
      groupsLevelOneToCopy: [],
      groupOneToEdit: this.props.store.database.groupOneToEdit
    };
  }

  componentWillMount() {
    let newAccordion = this.props.store.database.accordion,
        newGroupsLevelOneToCopy = this.props.store.database.groupsLevelOneToCopy;

    this.updateAccordion(newAccordion);
    this.updateGroupsLevelOneToCopy(newGroupsLevelOneToCopy);

    setTimeout(() => {
      this.updateMarking(newAccordion)
    }, 100);
  }

  shift(groupIndexInJson, groupOneKey) {
    this.props.shiftGroupsOne(groupIndexInJson, groupOneKey);
  }

  createNewGroupOne(groupOneIndexInJson) {
    const rand = getRandomInt(1, 1000);

    this.props.createGroupOne(groupOneIndexInJson, rand);
  }

  click(event, i) {
    const newAccordion = this.state.accordion.slice();

    newAccordion[i].open = !newAccordion[i].open;
    this.setState({
      accordion: newAccordion
    });
  }

  componentWillReceiveProps(nextProps) {
    let newJsonData = nextProps.store.database.jsonData,
        newAccordion = nextProps.store.database.accordion,
        newGroupsLevelOneToCopy = nextProps.store.database.groupsLevelOneToCopy,
        newGroupOneToEdit = this.props.store.database.groupOneToEdit;

    this.updateAccordion(newAccordion);
    this.updateGroupsLevelOneToCopy(newGroupsLevelOneToCopy);
    this.updateJsonData(newJsonData);
    this.updateGroupOneToEdit(newGroupOneToEdit);

    setTimeout(() => {
      this.updateMarking(newAccordion)
    }, 100);
  }

  updateAccordion(newAccordion) {
    let accordion = [...this.state.accordion];

    accordion = newAccordion;

    this.setState({ 
      accordion
    });
  }

  updateGroupsLevelOneToCopy(newGroupsLevelOneToCopy) {
    let groupsLevelOneToCopy = [...this.state.groupsLevelOneToCopy];

    groupsLevelOneToCopy = newGroupsLevelOneToCopy;

    this.setState({ 
      groupsLevelOneToCopy
    });
  }

  updateJsonData(newJsonData) {
    let jsonData = {...this.state.jsonData};

    jsonData = newJsonData;

    this.setState({ 
      jsonData
    });
  }

  updateGroupOneToEdit(newGroupOneToEdit) {
    let groupOneToEdit = {...this.state.groupOneToEdit};

    groupOneToEdit = newGroupOneToEdit;

    this.setState({ 
      groupOneToEdit
    });
  }

  updateMarking(newAccordion) {
    let accordion = [...this.state.accordion];

    accordion = newAccordion;

    accordion.forEach((i) => {
      const buttonId = 'btn_group_level_one_mark_' + i.key;

      $('#' + buttonId).removeClass('marked');
      if (i.marked) {
        $('#' + buttonId).addClass('marked');
      } else {
        $('#' + buttonId).removeClass('marked');
      }
    });
  }

  openMainTitlePanel(event) {
    $('.config-wrapper').addClass('display-hidden');
    $('#standardInputWrapper').removeClass('display-hidden');
    $('#datepickerWrapper').removeClass('display-hidden');
    $('#submitButtonWrapper').removeClass('display-hidden');

    $('#inputTitle').val(this.state.jsonData.title);
    $('#dateMainTitle').val(this.state.jsonData.valid_from);
    $('#dateMainTitle').attr('required', true);
    $('#endDateMainTitle').val(this.state.jsonData.valid_to);
    $('#endDateMainTitle').attr('required', true);
    $('#panelWrapper').attr('configtype', 'main');

  }

  handleEdit(event, groupIndex) {
    const groupOneToEdit = this.state.jsonData.groups[groupIndex];

    $('.config-wrapper').addClass('display-hidden');
    $('.val-access-wrapper').removeClass('display-hidden');
    $('#standardInputWrapper').removeClass('display-hidden');
    $('#optionalInputWrapper').removeClass('display-hidden');
    $('#colSelectWrapper').removeClass('display-hidden');
    $('#clearWrapper').removeClass('display-hidden');
    $('#collapseWrapper').removeClass('display-hidden');
    $('#submitButtonWrapper').removeClass('display-hidden');
    $('#idValidationWrapper').removeClass('display-hidden');
    $('#panelWrapper').attr('configtype', 'groupOne');


    this.props.changeGroupOneToEdit(groupOneToEdit);
    let [firstVal, secondVal] = splitValidation(groupOneToEdit.validation);

    $('#inputTitle').val(groupOneToEdit.title);
    $('#colSelect').val(groupOneToEdit.cols);
    $('#idClearBefore').prop("checked", groupOneToEdit.clearBefore);
    $('#idClearAfter').prop("checked", groupOneToEdit.clearAfter);
    $('#idCollapse').prop("checked", groupOneToEdit.collapse);
    $('#idAutoCollapse').prop("checked", groupOneToEdit.autocollapse);
    $('#idValRequired').prop("checked", firstVal);
    $('#validationTextArea').val(JSON.stringify(secondVal, null, 2));
  }

  handleInsert(event, groupIndexInJson) {
    this.props.insertGroupLevelOne(groupIndexInJson);
  }

  render() {
    let {groupsLevelOneToCopy} = this.state;

    return (
      <div className="accordion">
        <div className="title-wrapper-centering">
          <ul className="ul-accordion">
            <li className="li-accordion">
              <div className="title-style">{this.state.jsonData.title}</div>
              <div className="subtitle-style">{this.state.jsonData.valid_from} bis {this.state.jsonData.valid_to}</div>
            </li>
            <li className="li-accordion li-title-positioning">
              <button onClick={(e) => this.openMainTitlePanel(e)} id="btnMainTitle" type="button" className="btn btn-default btn-xs li-title-btn">
                <i className="fa fa-wrench glow" aria-hidden="true"></i>
              </button>
            </li>
          </ul>
        </div>
        <div>
          {this.state.accordion.map((elem, i) => {
            let buttonId = "btn_group_level_one_mark_" + elem.key,
                jsonData = this.state.jsonData,
                groupIndexInJson;

            groupIndexInJson = jsonData.groups.map((group, i) => {
              return group.key;
            }).indexOf(elem.key);    
              
            return (
              <div key={i}>
                <div className="group-bar-level-one"><SubAccordion {...this.props} click={this.click} groupOne={i} elem={elem}/></div>
                <div className="group-buttons-level-one">
                  <div className="btn-group-vertical" role="group" aria-label="edit">
                    <button id={buttonId} type="button" className="btn btn-default btn-xs" onClick={this.props.markGroupLevelOneForCopy.bind(null, elem, groupIndexInJson)}>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </button>
                    <div className="dropdown">
                      <button type="button" className="btn btn-default btn-xs" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a href="#" onClick={(e) => this.handleEdit(e, i)}><i className="fa-margin fa fa-wrench" aria-hidden="true"></i> Bearbeiten</a></li>
                        <li><a href="#" onClick={() => this.createNewGroupOne(groupIndexInJson)}><i className="fa-margin fa fa-plus" aria-hidden="true"></i> Neues Element</a></li>
                        <li><a href="#" onClick={() => this.shift(groupIndexInJson, elem.key)}><i className="fa fa-arrows" aria-hidden="true"></i> Verschieben</a></li>
                        <li><a href="#" onClick={(e) => this.handleInsert(e, groupIndexInJson)}><i className="fa-margin fa fa-arrow-down" aria-hidden="true"></i>Einfügen</a></li>
                        <li><a href="#" onClick={this.props.deleteGroupLevelOne.bind(null, groupIndexInJson, elem)}><i className="fa-margin fa fa-times" aria-hidden="true"></i>Löschen</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default Accordion;