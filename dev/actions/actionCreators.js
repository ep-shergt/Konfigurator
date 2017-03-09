
// Changers
//***************************************************************************
export function changeJSON(jsonData) {
	return {
		type: 'CHANGE_JSON',
		jsonData
	}
}

export function changeJSONOnLoading(jsonData) {
	return {
		type: 'CHANGE_JSON_ON_LOADING',
		jsonData
	}
}

export function initializeJSON(jsonData) {
	return {
		type: 'INITIALIZE_JSON',
		jsonData
	}
}

export function changeFieldToEdit(fieldToEdit) {
	return {
		type: 'CHANGE_FIELD_TO_EDIT',
		fieldToEdit
	}
}

export function changeGroupOneToEdit(groupOneToEdit) {
	return {
		type: 'CHANGE_GROUP_ONE_TO_EDIT',
		groupOneToEdit
	}
}

export function changeGroupTwoToEdit(groupTwoToEdit) {
	return {
		type: 'CHANGE_GROUP_TWO_TO_EDIT',
		groupTwoToEdit
	}
}

export function changeField(field) {
	return {
		type: 'CHANGE_FIELD',
		field
	}
}

export function changeGroupOne(groupOne) {
	return {
		type: 'CHANGE_GROUP_ONE',
		groupOne
	}
}

export function changeGroupTwo(groupTwo, groupOneKey) {
	return {
		type: 'CHANGE_GROUP_TWO',
		groupTwo,
		groupOneKey
	}
}
//*******************************************************************************


// Setters
//***************************************************************************************
export function setAccordionToOpen(groupOneKey) {
	return {
		type: 'SET_ACCORDION_TO_OPEN',
		groupOneKey
	}
}

export function setSubAccordionToOpen(groupKeys) {
	return {
		type: 'SET_SUBACCORDION_TO_OPEN',
		groupKeys
	}
}
// Markers
//*************************************************************************************************************************************
export function markGroupLevelOneForCopy(groupsLevelOneToCopy, element, index) {
	return {
		type: 'MARK_GROUP_L1',
		groupsLevelOneToCopy,
		element,
		index
	}
}

export function markGroupLevelTwoForCopy(subAccordionItems, groupsLevelTwoToCopy, groupLevelOneKey, element, index) {
	return {
		type: 'MARK_GROUP_L2',
		subAccordionItems,
		groupsLevelTwoToCopy,
		groupLevelOneKey,
		element,
		index
	}
}

export function markFieldToCopy(fields, fieldsToCopy, groupLevelOneKey, groupLevelTwoKey, element, index) {
	return {
		type: 'MARK_FIELD',
		fields,
		fieldsToCopy,
		groupLevelOneKey,
		groupLevelTwoKey,
		element,
		index
	}
}

//**************************************************************************************************************************************

// Deleters
//*************************************************************************************************************************
export function deleteGroupLevelOne(groupsLevelOneToCopy, element, index) {
	return {
		type: 'DELETE_GROUP_L1',
		groupsLevelOneToCopy,
		element,
		index
	}
}

export function deleteGroupLevelTwo(subAccordionItems, groupsLevelTwoToCopy, groupLevelOneKey, element, index) {
	return {
		type: 'DELETE_GROUP_L2',
		subAccordionItems,
		groupsLevelTwoToCopy,
		groupLevelOneKey,
		element,
		index
	}
}

export function deleteField(fields, fieldsToCopy, groupLevelOneKey, groupLevelTwoKey, element, index) {
	return {
		type: 'DELETE_FIELD',
		fields,
		fieldsToCopy,
		groupLevelOneKey,
		groupLevelTwoKey, element,
		index
	}
}

//**************************************************************************************************************************


//import * as user from "../actionCreators";
//import { importJSON } from "../actionCreators"

//user.importJSON()