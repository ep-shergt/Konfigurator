import React, { Component } from 'react';
import { render } from 'react-dom';

class GroupOneConfig extends Component {

  constructor(props) {
    super(props);

    this.handleGroupOneData = this.handleGroupOneData.bind(this);

    this.state = {
      jsonData: this.props.store.database.jsonData,
      groupOneToEdit: this.props.store.database.groupOneToEdit
    };
  }

  handleGroupOneData(event) {
    event.preventDefault();

    let newGroup = this.state.groupOneToEdit,
        groupData = {
          cols: this.colSelectGOne.value,
          title: this.inputGroupLevelOneTitle.value
        };

    
    newGroup.cols = groupData.cols;
    newGroup.clearBefore = $("#g1ClearBefore").is(":checked") ? true : false;
    newGroup.clearAfter = $("#g1ClearAfter").is(":checked") ? true : false;
    newGroup.collapse = $("#g1Collapse").is(":checked") ? true : false;
    newGroup.autocollapse = $("#g1AutoCollapse").is(":checked") ? true : false;

    this.props.changeGroupLevelOneTitle(groupData.title, this.state.groupOneToEdit.key);
    this.props.changeGroupOne(newGroup);

    $('#inputGroupLevelOne').addClass('display-hidden');
  }

  componentWillReceiveProps(nextProps) {
    let newJsonData = nextProps.store.database.jsonData,
        newGroupOneToEdit = nextProps.store.database.groupOneToEdit,
        jsonData = {...this.state.jsonData},
        groupOneToEdit = {...this.state.groupOneToEdit}

    jsonData = newJsonData;
    groupOneToEdit = newGroupOneToEdit;

    this.setState({
      jsonData,
      groupOneToEdit
    });
  }

  componentDidMount() {
    const self = this;

    var date_input=$('input[name="date"]');
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      date_input.datepicker({
          format: 'yyyy-mm-dd',
          container: container,
          todayHighlight: true,
          autoclose: true,
          orientation: "bottom left",
          language: "de-DE"
      }).on('changeDate', function() {
        const target = $(this),
              targetDate = target.val();

        (target[0].id === 'dateMainTitle') ? self.props.changeStartDate(targetDate)
                                           : self.props.changeEndDate(targetDate);
      });
  }

  render() {
    return (
      <div id="inputGroupLevelOne" className="col-xs-12 display-hidden">
        <form onSubmit={(e) => this.handleGroupOneData(e)}>
          <div className="input-group">
              <span className="input-group-addon">Gruppe L1</span>
              <input id="inputGroupLevelOneTitle" required ref={(input) => { this.inputGroupLevelOneTitle = input}} type="text" className="form-control" name="inputGroupLevelOneTitle" placeholder="Titel - Gruppe Level 1" />            
          </div>
          <br/>
          <p className="heading-parameter">Zusätzliche Optionen</p>
          <br/>
          <div className="input-group col-xs-5">
            <span className="input-group-addon">Spalten</span>
            <select ref={(input) => { this.colSelectGOne = input}} className="form-control" id="colSelectGOne" name="colSelectGOne">
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
          <div className="container-fluid">
            <div className="row vertical-align">
              <div className="input-group col-xs-5">
              <label className="label-check"><input id="g1ClearBefore" type="checkbox" value="clearBefore" />  Zeilenumbruch davor</label>
            </div>
            <div className="col-xs-2"></div>
              <div className="input-group col-xs-5">
              <label className="label-check"><input id="g1ClearAfter" type="checkbox" value="clearAfter" />  Zeilenumbruch danach</label>
            </div>
            </div>
          </div>
          <br />
          <div className="container-fluid">
            <div className="row vertical-align">
              <div className="input-group col-xs-5">
              <label className="label-check"><input id="g1Collapse" type="checkbox" value="collapse" /> Einklappen</label>
            </div>
            <div className="col-xs-1"></div>
              <div className="input-group col-xs-6">
              <label className="label-check"><input id="g1AutoCollapse" type="checkbox" value="autocollapse" />  Automatisch einklappen nach Validierung</label>
            </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-field-confirm">Bestätigen</button>
        </form>
      </div>
    )
  }
}

export default GroupOneConfig;
