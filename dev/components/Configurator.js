import React, { Component } from 'react';
import { render } from 'react-dom';
import Accordion from './Accordion';
import { removeArrayElement } from './../helpers';
import MainTitleConfig from './MainTitleConfig';
import GroupOneConfig from './GroupOneConfig';
import GroupTwoConfig from './GroupTwoConfig';
import FieldConfig from './FieldConfig';

class Configurator extends Component {

	constructor(props) {
	    super(props);
	    
	    this.state = {
	  		jsonData: this.props.store.database.jsonData,
	  		fieldToEdit: this.props.store.database.fieldToEdit
	    };
    }

    componentWillMount() {
    	this.props.changeJSON(this.state.jsonData);
    }

    componentDidMount() {
        $("input").keypress( function(e) {
		    let chr = String.fromCharCode(e.which);
		    if (!("_".indexOf(chr) < 0))
		        return false;
		});
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
	}

    render() {
    	return (
    		<div id="configuratorWrapper">
				<div className="col-md-8">
					<Accordion {...this.props}/>
				</div>
				<div className="col-md-4 editor-panel">
					<h2>Panel</h2>
					<MainTitleConfig {...this.props} />
					<br/>
					<GroupOneConfig {...this.props} />
					<br/>
					<GroupTwoConfig {...this.props} />
					<br/>
					<FieldConfig {...this.props} />
				</div>
			</div>
		);
    }
}

export default Configurator;