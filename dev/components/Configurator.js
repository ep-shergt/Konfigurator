import React, { Component } from 'react';
import { render } from 'react-dom';
import Accordion from './Accordion';
import { removeArrayElement } from './../helpers';
import CheckboxOptions from './CheckboxOptions';

class Configurator extends Component {

	constructor(props) {
	    super(props);

	    this.handleFieldData = this.handleFieldData.bind(this);
	    this.handleCheckboxNumberChange = this.handleCheckboxNumberChange.bind(this);

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

  	handleTypeChange(event) {
  		const type = event.target.value,
  		      selector = type + 'ParamsWrapper';
  		let fieldToEdit = this.state.fieldToEdit,
  			groupKeys = fieldToEdit.group.split('|');

  		$('.param-wrapper').addClass('display-hidden');
  		$('#' + selector).removeClass('display-hidden');

  		fieldToEdit['parameters'] = {};

  		this.props.changeField(fieldToEdit);
  		this.props.setSubAccordionToOpen(groupKeys); 		
  	}

  	handleCheckboxNumberChange(event) {

  	}

  	handleFieldData(event) {
  		let newField = this.state.fieldToEdit,
  			groupKeys = newField.group.split('|'),
  			titleForKey;

		event.preventDefault();
  		
  		let fieldData = {
			inputFieldTitle: this.inputFieldTitle.value,
			colSelect: this.colSelect.value,
			fieldType: this.fieldType.value
		}

		newField.title = fieldData.inputFieldTitle;
		titleForKey = fieldData.inputFieldTitle.split(' ').join('_');
		newField.key = "fld_" + titleForKey;
		newField.cols = fieldData.colSelect;
		newField.type = fieldData.fieldType;
		newField.clearBefore = $("#checkClearBefore").is(":checked");
		newField.clearAfter = $("#checkClearAfter").is(":checked");

		switch(fieldData.fieldType) {
      		case 'code':
      			newField.parameters.css = $('#cssParam').val();
      			newField.parameters.html = $('#htmlParam').val();
      			newField.parameters.js = $('#jsParam').val();
      			break;

      		case 'text':
      			newField.parameters.class = $('#inputTextParams').val();

      		case 'textarea':
      			newField.parameters.class = $('#inputTextAreaParams').val();

      		case 'check': 
      			newField.parameters.inline = $("#checkInlineCheck").is(":checked") ? true : false;
      			newField.parameters.inlineBreak = $("#checkInlineBreakCheck").is(":checked") ? true : false;
      			newField.parameters.options = [{}];
      			newField.parameters.options[0].title = $('#inputParamsTitleCheck').val();
      			newField.parameters.options[0].value = $('#inputParamsValueCheck').val();
      	}

		this.props.changeField(newField);
		this.props.setSubAccordionToOpen(groupKeys);
		$('#fieldEditorPanel').addClass('display-hidden');
		$('.param-wrapper').addClass('display-hidden');
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
						<br/>
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
						  	<br/>
						  	<div className="container-fluid">
    							<div className="row vertical-align">
								  	<div className="input-group col-xs-5">
								  		<span className="input-group-addon">Spalten</span>
									  	<select ref={(input) => { this.colSelect = input}} className="form-control" id="colSelect" name="colSelect">
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
								    <div className="col-xs-2"></div>
								    <div className="input-group col-xs-5">
								  		<span className="input-group-addon">Typ</span>
									  	<select onChange={this.handleTypeChange.bind(this)} ref={(input) => { this.fieldType = input}} className="form-control" id="fieldType" name="fieldType">
									        <option>code</option>
									        <option>radio</option>
									        <option>check</option>
									        <option>select</option>
									        <option>text</option>
									        <option>textarea</option>
									    </select>
								    </div>
								</div>
							</div>
							<br/>
							<div className="container-fluid">
    							<div className="row vertical-align">
								  	<div className="input-group col-xs-5">
										<label className="label-check"><input id="checkClearBefore" type="checkbox" value="clearBefore" />  Zeilenumbruch davor</label>
									</div>
									<div className="col-xs-2"></div>
								    <div className="input-group col-xs-5">
										<label className="label-check"><input id="checkClearAfter" type="checkbox" value="clearAfter" />  Zeilenumbruch danach</label>
									</div>
								</div>
							</div>
							<br/>
							<p className="heading-parameter">Zusätzliche Typ-Parameter</p>
							<br/>
							<div id="codeParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
								<table>
									<thead>
										<tr>
											<th className="align-center">Typ</th>
											<th className="align-center">Wert</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th>css</th>
											<th className="th-param"><textarea className="form-control textarea-param" rows="5" id="cssParam"></textarea></th>
										</tr>
										<tr>
											<th>html</th>
											<th className="th-param"><textarea className="form-control textarea-param" rows="5" id="htmlParam"></textarea></th>
										</tr>
										<tr>
											<th>js</th>
											<th className="th-param"><textarea className="form-control textarea-param" rows="5" id="jsParam"></textarea></th>
										</tr>
									</tbody>
								</table>
							</div>
							<div id="radioParamsWrapper" className="col-xs-12 display-hidden param-wrapper">

							</div>
							<div id="checkParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
								<div className="container-fluid">
	    							<div className="row vertical-align">
									  	<div className="input-group col-xs-5">
											<label className="label-check"><input id="checkInlineCheck" type="checkbox" value="inline" />  nebeneinander setzen</label>
										</div>
										<div className="col-xs-2"></div>
									    <div className="input-group col-xs-5">
											<label className="label-check"><input id="checkInlineBreakCheck" type="checkbox" value="inlineBreak" />  Zeilenumbruch danach</label>
										</div>
									</div>
								</div>
								<br/>
								<div className="input-group col-xs-12">
							  		<span className="input-group-addon">Anzahl der Checkboxen für das Feld</span>
								  	<select onChange={this.handleCheckboxNumberChange.bind(this)} ref={(input) => { this.checkboxNumber = input}} className="form-control" id="checkboxNumber" name="checkboxNumber">
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
								    </select>
							    </div>
							    <br/>
								<CheckboxOptions />
							</div>
							<div id="selectParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
								
							</div>
							<div id="textParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
								<div className="input-group">
								    <span className="input-group-addon">Klasse</span>
								    <input id="inputTextParams" type="text" className="form-control" name="inputTextParams" placeholder="Klasse für Text" />			  		
							  	</div>
							</div>
							<div id="textareaParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
								<div className="input-group">
								    <span className="input-group-addon">Klasse</span>
								    <input id="inputTextAreaParams" type="text" className="form-control" name="inputTextAreaParams" placeholder="Klasse für Textbox" />			  		
							  	</div>
							</div>
							<br/>					
						 	<button type="submit" className="btn btn-primary btn-field-confirm">Bestätigen</button>
						 </form>
					</div>
				</div>
			</div>
		);
    }
}

export default Configurator;