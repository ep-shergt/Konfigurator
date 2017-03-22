export function extractContent(html) {
  return (new DOMParser).parseFromString(html, "text/html").documentElement.textContent;
}

export function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}

export function removeArrayElement(oldArray, index) {
  const newIndex = index + 1;
	let newArray = [...oldArray.slice(0, index), ...oldArray.slice(newIndex)];
	return newArray;
}

export function insertArrayElement(oldArray, element, index) {
  let newArray = [...oldArray.slice(0, index + 1), element, ...oldArray.slice(index + 1)];

  return newArray;
}

export function isInRange(number, range) {
  if(typeof number === "number" && Number.isInteger(number)) {
    return number > 0 && number < range;
  } else {
    return false;
  }
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function splitValidation(validation) {
  let values = [];

  if (validation.required !== undefined) {
    values.push(validation.required);
    delete validation['required'];
  } else {
    values.push(false);
  }

  values.push(validation)

  return values;
}

export function completeValidation(required, validation) {
  if (validation.required !== undefined) {
    validation.required = required;
  } else {
    delete validation['required'];
    validation.required = required;
  }

  return validation;
}

export function setAccordionItems(jsonDataCopy) {
    let accordion = [],
        jsonDataNew = Object.assign({}, jsonDataCopy),
        groups = [...jsonDataNew.groups];
   
    groups.forEach((group) => {
      if (group.groups[0] !== undefined) {
        let groupLevelOneKey = group.key;

        group.groups.forEach((i) => {
          let groupLevelTwoKey = i.key,
              fieldGroupKey = groupLevelOneKey + '|' + groupLevelTwoKey,
              fieldsPerGroup = [];

          jsonDataNew.fields.forEach((field) => {
            if (field.group === fieldGroupKey) {
              fieldsPerGroup.push(field);
            }
          });

          i['fields'] = fieldsPerGroup;
        });
      }
    });



    groups.forEach((i) => {
      accordion.push({
        key: i.key,
        title: i.title,
        content: i.groups,
        open: i.open,
        marked: i.marked
      });
    });

    return accordion;
}