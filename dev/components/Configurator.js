import React, { Component } from 'react';
import { render } from 'react-dom';
import Accordion from './Accordion';
import { removeArrayElement } from './../helpers';

class Configurator extends Component {

	constructor(props) {
	    super(props);

	    this.handleFieldData = this.handleFieldData.bind(this);

	    //getinitialState
	    this.state = {
	  		jsonData: this.props.store.database.jsonData,
	  		fieldToEdit: this.props.store.database.fieldToEdit
	    };
    }

    componentDidMount() {
    	const self = this;

    	$('#inputMainTitle').val(this.state.jsonData.title);
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

        $("input").keypress( function(e) {
		    let chr = String.fromCharCode(e.which);
		    if (!("_".indexOf(chr) < 0))
		        return false;
		});
  	}

  	handleFieldData(event) { 	
		event.preventDefault();
  		
  		let fieldData = {
			inputFieldTitle: this.inputFieldTitle.value
		}

		console.log('inputFieldTitle', fieldData.inputFieldTitle);
		console.log('field', this.state.fieldToEdit);
		$('#fieldEditorPanel').addClass('display-hidden');
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

  	handleGroupLevelOneTitleChange(event){
  		const newTitle = event.target.value,
  			  groupOneKey = document.getElementById("inputGroupLevelOneTitle").getAttribute("grouponekey");
  		let keyString = newTitle.split(' ').join('_');

	    this.props.changeGroupLevelOneTitle(newTitle, groupOneKey);
	    $('#inputGroupLevelOneTitle').attr('grouponekey', 'grp_1_' + keyString);
  	}

  	handleGroupLevelTwoTitleChange(event){
  		const newTitle = event.target.value,
  			  groupOneKey = document.getElementById("inputGroupLevelTwoTitle").getAttribute("grouponekey"),
  			  groupTwoKey = document.getElementById("inputGroupLevelTwoTitle").getAttribute("grouptwokey");
  		let keyString = newTitle.split(' ').join('_');

	    this.props.changeGroupLevelTwoTitle(newTitle, groupTwoKey, groupOneKey);

	    $('#inputGroupLevelTwoTitle').attr('grouptwokey', 'grp_2_' + keyString);
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

	    setTimeout(() => {
	        $('#inputMainTitle').val(this.state.jsonData.title);
	    }, 200);
	 }

    render() {
    	return (
    		<div id="configuratorWrapper">
				<div className="col-md-8">
					<Accordion {...this.props}/>
				</div>
				<div className="col-md-4 editor-panel">
					<h2>Panel</h2>
					<form>
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
						<div id="inputGroupLevelOne" className="display-hidden">
							<div className="input-group">
							    <span className="input-group-addon">Gruppe L1</span>
							    <input id="inputGroupLevelOneTitle" onChange={this.handleGroupLevelOneTitleChange.bind(this)} type="text" className="form-control" name="inputMainTitle" placeholder="Titel - Gruppe Level 1" />			  		
						  	</div>
						</div>
						<div id="inputGroupLevelTwo" className="display-hidden">
							<div className="input-group">
							    <span className="input-group-addon">Gruppe L2</span>
							    <input id="inputGroupLevelTwoTitle" onChange={this.handleGroupLevelTwoTitleChange.bind(this)} type="text" className="form-control" name="inputMainTitle" placeholder="Titel - Gruppe Level 2" />			  		
						  	</div>
						</div>
					</form>
					<div id="fieldEditorPanel" className="display-hidden">
						<h3>Feld-Editor</h3>
						<form onSubmit={(e) => this.handleFieldData(e)}>		
							<div className="input-group">
							    <span className="input-group-addon">Titel</span>
							    <input required ref={(input) => { this.inputFieldTitle = input}} id="inputFieldTitle" type="text" className="form-control" name="inputFieldTitle" placeholder="Feldtitel" />			  		
						  	</div>					
						 	<button type="submit" className="btn btn-primary btn-field-confirm">Bestätigen</button>
						 </form>
					</div>
				</div>
			</div>
		);
    }
}

export default Configurator;