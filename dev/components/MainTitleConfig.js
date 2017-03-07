import React, { Component } from 'react';
import { render } from 'react-dom';

class MainTitleConfig extends Component {

  constructor(props) {
    super(props);

    this.state = {
      jsonData: this.props.store.database.jsonData
    };
  }

  handleMainTitleChange(event){
    const newTitle = event.target.value;
    this.props.changeMainTitle(newTitle);
  }

  handleStartDateChange(event){
    const newStartDate = event.target.value;
    this.props.changeStartDate(newStartDate);
  }

  handleEndDateChange(event){
    const newEndDate = event.target.value;
    this.props.changeEndDate(newEndDate);
  }

  componentDidMount() {
    $('#inputMainTitle').val(this.state.jsonData.title);
    $('#dateMainTitle').val(this.state.jsonData.valid_from);
    $('#endDateMainTitle').val(this.state.jsonData.valid_to);
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
        $('#inputMainTitle').val(this.state.jsonData.title);
    }, 200);
  }

  render() {
    return (
      <div id="inputMainTitleWrapper" className="display-hidden">
        <div className="input-group">
          <span className="input-group-addon">Titel</span>
          <input id="inputMainTitle" onChange={this.handleMainTitleChange.bind(this)} type="text" className="form-control" name="inputMainTitle" placeholder="Titel der Fallpauschale" />           
        </div>
        <div className="bootstrap-iso">
          <div className="container-fluid">
            <div className="form-group ">
              <span className="label label-info">Gültig von</span>
              <input onChange={this.handleStartDateChange.bind(this)} className="form-control" id="dateMainTitle" name="date" type="text"/>
              <span className="label label-info">bis</span>
              <input onChange={this.handleEndDateChange.bind(this)} className="form-control" id="endDateMainTitle" name="date" type="text"/>
            </div>
         </div>
        </div>
      </div>
    )
  }
}

export default MainTitleConfig;
