import React, { Component } from 'react';
import { render } from 'react-dom';

class GroupTwoConfig extends Component {

  constructor(props) {
    super(props);

    this.handleGroupTwoData = this.handleGroupTwoData.bind(this);

    this.state = {
      jsonData: this.props.store.database.jsonData,
      groupTwoToEdit: this.props.store.database.groupTwoToEdit
    };
  }

  handleGroupTwoData(event) {
    event.preventDefault();

    const groupOneKey = document.getElementById("inputGroupLevelTwoTitle").getAttribute("grouponekey");
    let newGroup = this.state.groupTwoToEdit,
      groupData = {
        cols: this.colSelectGTwo.value,
        title: this.inputGroupLevelTwoTitle.value
    };
    
    newGroup.cols = groupData.cols;
    newGroup.clearBefore = $("#g2ClearBefore").is(":checked") ? true : false;
    newGroup.clearAfter = $("#g2ClearAfter").is(":checked") ? true : false;
    newGroup.collapse = $("#g2Collapse").is(":checked") ? true : false;
    newGroup.autocollapse = $("#g2AutoCollapse").is(":checked") ? true : false;

    this.props.changeGroupLevelTwoTitle(groupData.title, this.state.groupTwoToEdit.key, groupOneKey);
    this.props.changeGroupTwo(newGroup, groupOneKey);

    $('#inputGroupLevelOne').addClass('display-hidden');    
  }

  componentWillReceiveProps(nextProps) {
    let newJsonData = nextProps.store.database.jsonData,
        newGroupTwoToEdit = nextProps.store.database.groupTwoToEdit,
        jsonData = {...this.state.jsonData},
        groupTwoToEdit = {...this.state.groupTwoToEdit}

    jsonData = newJsonData;
    groupTwoToEdit = newGroupTwoToEdit;

    this.setState({
      jsonData,
      groupTwoToEdit
    });
  }

  render() {
    return (
      <div id="inputGroupLevelTwo" className="display-hidden">
        <form onSubmit={(e) => this.handleGroupTwoData(e)}>
          <div className="input-group">
            <span className="input-group-addon">Gruppe L2</span>
            <input id="inputGroupLevelTwoTitle" required ref={(input) => { this.inputGroupLevelTwoTitle = input}} type="text" className="form-control" name="inputGroupLevelTwoTitle" placeholder="Titel - Gruppe Level 2" />            
          </div>
          <br/>
          <p className="heading-parameter">Zusätzliche Parameter</p>
          <br/>
          <div className="input-group col-xs-5">
            <span className="input-group-addon">Spalten</span>
            <select ref={(input) => { this.colSelectGTwo = input}} className="form-control" id="colSelectGTwo" name="colSelectGTwo">
              <option></option>
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
          <div className="container-fluid">
            <div className="row vertical-align">
              <div className="input-group col-xs-5">
              <label className="label-check"><input id="g2ClearBefore" type="checkbox" value="clearBefore" />  Zeilenumbruch davor</label>
            </div>
            <div className="col-xs-2"></div>
              <div className="input-group col-xs-5">
              <label className="label-check"><input id="g2ClearAfter" type="checkbox" value="clearAfter" />  Zeilenumbruch danach</label>
            </div>
            </div>
          </div>
          <br />
          <div className="container-fluid">
            <div className="row vertical-align">
              <div className="input-group col-xs-5">
              <label className="label-check"><input id="g2Collapse" type="checkbox" value="collapse" /> Einklappen</label>
            </div>
            <div className="col-xs-1"></div>
              <div className="input-group col-xs-6">
              <label className="label-check"><input id="g2AutoCollapse" type="checkbox" value="autocollapse" />  Automatisch einklappen nach Validierung</label>
            </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-field-confirm">Bestätigen</button>
        </form>
      </div>
    )
  }
}

export default GroupTwoConfig;
