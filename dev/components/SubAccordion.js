import React, { Component } from 'react';
import { render } from 'react-dom';
import AccordionSection from './AccordionSection';
import { removeArrayElement } from './../helpers';
import { splitValidation } from './../helpers';
import { getRandomInt } from './../helpers';

class SubAccordion extends Component {

  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.updateSubAccordionItems = this.updateSubAccordionItems.bind(this);
    this.updateGroupsLevelTwoToCopy = this.updateGroupsLevelTwoToCopy.bind(this);
    this.updateMarking = this.updateMarking.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.createNewGroupTwo = this.createNewGroupTwo.bind(this);
    this.handleDeleteGroupTwo = this.handleDeleteGroupTwo.bind(this);
    this.handleMarking = this.handleMarking.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.shift = this.shift.bind(this);

    this.state = {
      jsonData: this.props.store.database.jsonData,
      subAccordionItems: [],
      groupsLevelTwoToCopy: [],
      groupTwoToEdit: this.props.store.database.groupTwoToEdit
    };
  }

  componentWillReceiveProps(nextProps) {
    let newItems = nextProps.elem.content,
        newGroupsLevelTwoToCopy = nextProps.store.database.groupsLevelTwoToCopy,
        newJsonData = nextProps.store.database.jsonData,
        newGroupTwoToEdit = nextProps.store.database.groupTwoToEdit,
        jsonData = {...this.state.jsonData},
        groupTwoToEdit = {...this.state.groupTwoToEdit};

    this.updateGroupsLevelTwoToCopy(newGroupsLevelTwoToCopy);    
    this.updateSubAccordionItems(newItems);

    jsonData = newJsonData;
    groupTwoToEdit = newGroupTwoToEdit;

     this.setState({
          jsonData,
          groupTwoToEdit
      });

    setTimeout(() => {
      this.updateMarking(newItems)
    }, 100);
  }

  createNewGroupTwo(groupLevelOneKey, indexInGroupOne) {
    const rand = getRandomInt(1, 1000);

    this.props.createGroupTwo(groupLevelOneKey, indexInGroupOne, rand);
    this.props.setAccordionToOpen(groupLevelOneKey);
  }

  handleDeleteGroupTwo(groupLevelOneKey, elem, indexInGroupOne) {
    const subAccLength = this.state.subAccordionItems.length;

    this.props.deleteGroupLevelTwo(groupLevelOneKey, elem, indexInGroupOne, subAccLength);
    this.props.setAccordionToOpen(groupLevelOneKey);
  }

  handleMarking(element, groupOneIndex, indexInGroupOne, groupLevelOneKey) {
    this.props.markGroupLevelTwoForCopy(element, groupOneIndex, indexInGroupOne);
    this.props.setAccordionToOpen(groupLevelOneKey);
  }

  updateSubAccordionItems(newItems) {
    let subAccordion = [],
        subAccordionItems = [...this.state.subAccordionItems];

    newItems.forEach((j) => {
      subAccordion.push({
        key: j.key,
        title: j.title,
        content: j.fields,
        open: (j.open !== undefined) ? j.open : false,
        marked: (j.marked !== undefined) ? j.marked : false
      });
    });
        
    subAccordionItems = subAccordion;

    this.setState({ 
      subAccordionItems
    });
  }

  updateGroupsLevelTwoToCopy(newGroupsLevelTwoToCopy) {
    let groupsLevelTwoToCopy = [...this.state.groupsLevelTwoToCopy];

    groupsLevelTwoToCopy = newGroupsLevelTwoToCopy;

    this.setState({ 
      groupsLevelTwoToCopy
    });
  }

  updateMarking(newSubAccordionItems) {
    let subAccordionItems = [...this.state.subAccordionItems];

    subAccordionItems = newSubAccordionItems;

    subAccordionItems.forEach((i) => {
      const buttonId = 'btn_group_level_two_mark_' + i.key;

      $('#' + buttonId).removeClass('marked');
      if (i.marked) {
        $('#' + buttonId).addClass('marked');
      } else {
        $('#' + buttonId).removeClass('marked');
      }
    });
  }

  shift(groupOneKey, groupTwoKey, groupOneIndex, indexInGroupOne) {
    this.props.shiftGroupsTwo(groupOneKey, groupTwoKey, groupOneIndex, indexInGroupOne);
    this.props.setAccordionToOpen(groupOneKey);
  }

  componentWillMount() {
    let subAccordion = this.props.elem.content,
        newGroupsLevelTwoToCopy = this.props.store.database.groupsLevelTwoToCopy;

    this.updateGroupsLevelTwoToCopy(newGroupsLevelTwoToCopy);
    this.updateSubAccordionItems(subAccordion);

    setTimeout(() => {
      this.updateMarking(subAccordion);
    }, 100);
  }

  click(event, j){ 
    const newSubAccordion = this.state.subAccordionItems.slice();

    newSubAccordion[j].open = !newSubAccordion[j].open;
    this.setState({
      subAccordionItems: newSubAccordion
    });
  }

  handleEdit(event, groupOneKey, groupTwoKey) {
    const jsonData = {...this.state.jsonData};
    let groupOneIndex, groupTwoIndex,
        validationValues = {},
        newGroupTwoToEdit = {...this.state.groupTwoToEdit}; 

    groupOneIndex = jsonData.groups.map((elem, i) => {
      return elem.key;
    }).indexOf(groupOneKey);

    groupTwoIndex = jsonData.groups[groupOneIndex].groups.map((group, i) => {
      return group.key;
    }).indexOf(groupTwoKey);

    newGroupTwoToEdit = jsonData.groups[groupOneIndex].groups[groupTwoIndex];
         
    $('.config-wrapper').addClass('display-hidden');
    $('.val-access-wrapper').removeClass('display-hidden');
    $('#standardInputWrapper').removeClass('display-hidden');
    $('#optionalInputWrapper').removeClass('display-hidden');
    $('#colSelectWrapper').removeClass('display-hidden');
    $('#clearWrapper').removeClass('display-hidden');
    $('#collapseWrapper').removeClass('display-hidden');
    $('#submitButtonWrapper').removeClass('display-hidden');
    $('#idValidationWrapper').removeClass('display-hidden');
    $('#panelWrapper').attr('configtype', 'groupTwo');

    this.props.changeGroupTwoToEdit(newGroupTwoToEdit);
    validationValues = splitValidation(newGroupTwoToEdit.validation);
    
    $('#inputTitle').val(newGroupTwoToEdit.title);
    $('#colSelect').val(newGroupTwoToEdit.cols);
    $('#idClearBefore').prop("checked", newGroupTwoToEdit.clearBefore);
    $('#idClearAfter').prop("checked", newGroupTwoToEdit.clearAfter);
    $('#idCollapse').prop("checked", newGroupTwoToEdit.collapse);
    $('#idAutoCollapse').prop("checked", newGroupTwoToEdit.autocollapse);
    $('#panelWrapper').attr('grouponekey', groupOneKey);
    $('#idValRequired').prop("checked", validationValues[0]);
    $('#validationTextArea').val(JSON.stringify(validationValues[1], null, 2));
  }

  handleInsert(groupOneKey, groupTwoKey, groupOneIndex, indexInGroupOne) {
    this.props.insertGroupLevelTwo(groupOneKey, groupTwoKey, groupOneIndex, indexInGroupOne);
    this.props.setAccordionToOpen(groupOneKey);
  }

  render() {
    const groupLevelOneKey = this.props.elem.key;
    let {subAccordionItems, groupsLevelTwoToCopy} = this.state;

    return (
      <div>
        <div 
          className="title" 
          onClick={(e) => this.props.click(e, this.props.groupOne)}
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
            : "content-text"}>
            <div className="acc-width">
              <div>
                {this.state.subAccordionItems.map((elem, j) => {
                  let buttonId = "btn_group_level_two_mark_" + elem.key,
                      jsonData = this.state.jsonData,
                      groupOneIndex,
                      indexInGroupOne;

                  groupOneIndex = jsonData.groups.map((group, i) => {
                    return group.key;
                  }).indexOf(groupLevelOneKey);

                  indexInGroupOne = jsonData.groups[groupOneIndex].groups.map((group, i) => {
                    return group.key;
                  }).indexOf(elem.key);

                  return (
                    <div key={j}>
                      <div className="group-bar-level-one"><AccordionSection {...this.props} click={this.click} groupTwo={j} groupOne={this.props.groupOne} groupLevelOneKey={groupLevelOneKey} elem={elem}/></div>
                      <div className="group-buttons-level-one">
                        <div className="btn-group-vertical" role="group" aria-label="edit">
                          <button id={buttonId} type="button" className="btn btn-default btn-xs" onClick={() => this.handleMarking(elem, groupOneIndex, indexInGroupOne, groupLevelOneKey)}>
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </button>
                          <div className="dropdown">
                            <button type="button" className="btn btn-default btn-xs" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                            </button>
                            <ul className="dropdown-menu">
                              <li><a href="#" onClick={(e) => this.handleEdit(e, groupLevelOneKey, elem.key)}><i className="fa-margin fa fa-wrench" aria-hidden="true"></i> Bearbeiten</a></li>
                              <li><a href="#" onClick={() => this.createNewGroupTwo(groupLevelOneKey, indexInGroupOne)}><i className="fa-margin fa fa-plus" aria-hidden="true"></i> Neues Element</a></li>
                              <li><a href="#" onClick={() => this.shift(groupLevelOneKey, elem.key, groupOneIndex, indexInGroupOne)}><i className="fa fa-arrows" aria-hidden="true"></i> Verschieben</a></li>
                              <li><a href="#" onClick={() => this.handleInsert(groupLevelOneKey, elem.key, groupOneIndex, indexInGroupOne)}><i className="fa-margin fa fa-arrow-down" aria-hidden="true"></i>Einfügen</a></li>
                              <li><a href="#" onClick={() => this.handleDeleteGroupTwo(groupLevelOneKey, elem, indexInGroupOne)}><i className="fa-margin fa fa-times" aria-hidden="true"></i>Löschen</a></li>
                            </ul>
                          </div>          
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default SubAccordion;