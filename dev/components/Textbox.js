import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Textbox extends Component {

  constructor(props) {
    super(props);

    this.saveTextAsFile = this.saveTextAsFile.bind(this);
    this.destroyClickedElement = this.destroyClickedElement.bind(this);
    this.loadFileAsText = this.loadFileAsText.bind(this);
    this.clearJSONForExport = this.clearJSONForExport.bind(this);
    this.initializeJSON = this.initializeJSON.bind(this);
    this.loadFromStorage = this.loadFromStorage.bind(this);

    //getinitialState
    this.state = {
      jsonData: this.props.store.database.jsonData,
      jsonForExport: {}
    };
  }

  loadFromStorage(event) {
    let jsonDataString = localStorage.getItem('jsonData'),
        jsonData = JSON.parse(jsonDataString);

    this.setState({
      jsonData
    });

    $('#mainArea').val(jsonDataString);
    this.props.initializeJSON(jsonData);
  }

  saveTextAsFile(event) {
    var textToSave = document.getElementById("mainArea").value,
        textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"}),
        textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob),
        fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value,
        downloadLink = document.createElement("a");

    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = this.destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
  }

  clearJSONForExport(event) {
    let jsonCopy = {...this.state.jsonData},
        jsonForExport = {...this.state.jsonForExport};

    jsonCopy.groups.forEach((elem) => {
        delete elem['marked'];
        delete elem['open'];
        delete elem['marked'];
        if ($.isEmptyObject(elem.validation)) {
          delete elem['validation'];
        }
      elem.groups.forEach((i) => {
        delete i['fields'];
        delete i['marked'];
        delete i['open'];
        delete i['marked'];
        if ($.isEmptyObject(i.validation)) {
          delete i['validation'];
        }
      });
    });

    jsonCopy.fields.forEach((field) => {
      delete field['marked'];
      if ($.isEmptyObject(field.validation)) {
          delete field['validation'];
      }

      if ($.isEmptyObject(field.access)) {
          delete field['access'];
      }
    });

    jsonForExport = jsonCopy;

    this.setState({
      jsonForExport
    });

    $('#mainArea').val(JSON.stringify(jsonForExport, null, 2));
  }
 
  destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }

  initializeJSON(event) {
    let initJSON = {
       "title" :   "Titel Fallpauschale",
       "valid_from" :   "2015-01-01",
       "valid_to" :   "2015-12-31",
       "groups" :   [
          {
             "key" :   "grp_1_Gruppe_Level_1",
             "title" :   "Gruppe Level 1",
             "type" :   "group",
             "marked" :  false,
             "validation" : {},
             "groups" :   [
                {
                   "key" :   "grp_2_Gruppe_Level_2",
                   "title" :   "Gruppe Level 2",
                   "type" :   "group",
                   "validation" : {},
                   "marked" :  false
                }
             ]
          },
       ],
       "fields" :   [
          {
             "key" :   "fld_feld_titel",
             "title" :   "Feld Titel",
             "type" :   "code",
             "group" :   "grp_1_Gruppe_Level_1|grp_2_Gruppe_Level_2",
             "cols" :   "",
             "clearBefore" :  false,
             "clearAfter" :   false,
             "edited" : false,
             "parameters" :   {
                "css" :   "",
                "html" :   "",
                "js" :   ""
             },
             "validation" : {},
             "access" : {}
          }
       ]
    };

    this.setState({
      jsonData: initJSON
    });

    $('#mainArea').val(JSON.stringify(initJSON, null, 2));
    this.props.initializeJSON(initJSON);
  }
 
  loadFileAsText(event) {
    if (!($('#fileError').hasClass('display-hidden'))) {
      $('#fileError').addClass('display-hidden');
    }

    try {
      var fileToLoad = document.getElementById("fileToLoad").files[0],
          fileReader = new FileReader(),
          jsonData,
          self = this;

      fileReader.onload = function(fileLoadedEvent)  {
          var textFromFileLoaded = fileLoadedEvent.target.result;

          document.getElementById("mainArea").value = textFromFileLoaded;
          jsonData = JSON.parse(JSON.stringify(eval("(" + textFromFileLoaded + ")")));

          jsonData.groups.forEach((groupOne) => {
            groupOne.validation = groupOne.validation !== undefined ? groupOne.validation : {};
            groupOne.groups.forEach((groupTwo) => {
              groupTwo.validation = groupTwo.validation !== undefined ? groupTwo.validation : {};
            });
          });

          jsonData.fields.forEach((field) => {
            field.validation = field.validation !== undefined ? field.validation : {};
            field.access = field.access !== undefined ? field.access : {};
          });

          self.setState({
            jsonData
          });
      };
      fileReader.readAsText(fileToLoad, "UTF-8");

    } catch (err) {
      console.log('%c Fehler: Keine Datei ausgewählt!', 'color: red; font-weight: bold');
      $('#fileError').removeClass('display-hidden');
    }
  }

  handleChange(event){
    let jsonData = JSON.parse(JSON.stringify(eval("(" + event.target.value + ")")));
    this.setState({
      jsonData
    });
  }

  componentDidMount() {
    let jsonCopy = {...this.state.jsonData};

    $('#mainArea').val(JSON.stringify(jsonCopy, null, 2));
  }

  componentWillReceiveProps(nextProps) {
    let newJsonData = nextProps.store.database.jsonData,
        jsonData = {...this.state.jsonData};

    jsonData = newJsonData;

    this.setState({
      jsonData
    });

    setTimeout(() => {
      $('#mainArea').val(JSON.stringify(this.state.jsonData, null, 2));
    }, 200);
  }


  render() {
    return (
      <div className="margin-around">  
        <h3 id="headerEditJSON">Anzeige für JSON</h3>
        <textarea id="mainArea" className="jsonbox" onChange={this.handleChange.bind(this)}></textarea>     
            <div>Dateinamen zum Speichern festlegen:</div>
            <input type="text" id="inputFileNameToSaveAs" />
            <input type="button" onClick={(e) => this.saveTextAsFile(e)} value="Text speichern als"/>
            <input type="button" onClick={(e) => this.clearJSONForExport(e)} value="JSON für den Export bereinigen"/>
            <div>Datei auswählen:</div>
            <input type="file" id="fileToLoad" />
            <input type="button" onClick={(e) => this.loadFileAsText(e)} value="Ausgewählte Datei laden"/>
            <div id="fileError" className="display-hidden error-style">Warnung: Keine Datei ausgewählt!</div>
            <input type="button" onClick={this.props.changeJSON.bind(null, this.state.jsonData)} value="JSON aktualisieren"/>
            <input type="button" onClick={(e) => this.initializeJSON(e)} value="NEU"/>
            <input type="button" onClick={(e) => this.loadFromStorage(e)} value="Zuletzt gespeichertes JSON laden"/>      
      </div>
    );
  };
}