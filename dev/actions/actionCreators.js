
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
export function markGroupLevelOneForCopy(element, groupIndexInJson) {
	return {
		type: 'MARK_GROUP_L1',
		element,
		groupIndexInJson
	}
}

export function markGroupLevelTwoForCopy(element, groupOneIndex, indexInGroupOne) {
	return {
		type: 'MARK_GROUP_L2',
		element,
		groupOneIndex,
		indexInGroupOne
	}
}

export function markFieldToCopy(field, indexInJson) {
	return {
		type: 'MARK_FIELD',
		field,
		indexInJson
	}
}

//**************************************************************************************************************************************

// Deleters
//*************************************************************************************************************************
export function deleteGroupLevelOne(groupOneIndex, element) {
	return {
		type: 'DELETE_GROUP_L1',
		groupOneIndex,
		element
	}
}

export function deleteGroupLevelTwo(groupOneKey, element, indexInGroupOne, subAccLength) {
	return {
		type: 'DELETE_GROUP_L2',
		groupOneKey,
		element,
		indexInGroupOne,
		subAccLength
	}
}

export function deleteField(element, indexInJson) {
	return {
		type: 'DELETE_FIELD',
		element,
		indexInJson
	}
}

//**************************************************************************************************************************

//Creators
//**************************************************************************************************************************

export function createField(fieldIndex, groupKeys, randomInt) {
	return {
		type: 'CREATE_FIELD',
		fieldIndex,
		groupKeys,
		randomInt
	}
}

export function createGroupOne(groupOneIndexInJson, randomInt) {
	return {
		type: 'CREATE_GROUP_ONE',
		groupOneIndexInJson,
		randomInt
	}
}

export function createGroupTwo(groupOneKey, indexInGroupOne, randomInt) {
	return {
		type: 'CREATE_GROUP_TWO',
		groupOneKey,
		indexInGroupOne,
		randomInt
	}
}

//import * as user from "../actionCreators";
//import { importJSON } from "../actionCreators"

//user.importJSON()