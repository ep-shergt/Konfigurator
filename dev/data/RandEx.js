{
  "title": "Karpaltunnel Befunde",
  "valid_from": "2015-01-01",
  "valid_to": "2015-12-31",
  "groups": [
    {
      "key": "grp_1_1489408533320",
      "title": "Befundbogen 1",
      "type": "group",
      "groups": [
        {
          "key": "grp_2_1489408533321",
          "title": "Vorerkrankungen",
          "type": "group",
          "groups": []
        },
        {
          "key": "grp_2_1489408533322",
          "title": "Klinische Untersuchung (Indikationskriterien Kategorie 1)",
          "type": "group",
          "groups": []
        },
        {
          "key": "grp_2_1489408533323",
          "title": "Klinische Untersuchung (Handfunktion)",
          "type": "group",
          "groups": []
        },
        {
          "key": "grp_2_1489408533324",
          "title": "Klinische Untersuchung (Indikationskriterien Kategorie 2)",
          "type": "group",
          "groups": []
        }
      ]
    },
    {
      "key": "grp_1_1489408533321",
      "title": "Befundbogen 2",
      "type": "group",
      "groups": []
    },
    {
      "key": "grp_1_1489408533322",
      "title": "Befundbogen 3",
      "type": "group",
      "groups": []
    }
  ],
  "fields": [
    {
      "key": "fld_1489408533320",
      "title": "Code Vorerkrankungen",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Vorschaden/ Vorerkrankungen",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533321",
      "title": "Allg. Erkrankungen",
      "type": "select",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 8,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "multiple": true,
        "options": [
          {
            "title": "Diabetes mellitus",
            "value": "Diabetes mellitus",
            "type": "option",
            "default": false
          },
          {
            "title": "Hypothyreose",
            "value": "Hypothyreose",
            "type": "option",
            "default": false
          },
          {
            "title": "Längerfristige Kortisonbehandlung",
            "value": "Längerfristige Kortisonbehandlung",
            "type": "option",
            "default": false
          },
          {
            "title": "Postmenop. Östrogentherapie",
            "value": "Postmenop. Östrogentherapie",
            "type": "option",
            "default": false
          },
          {
            "title": "Allgemeine Osteoarthritis",
            "value": "Allgemeine Osteoarthritis",
            "type": "option",
            "default": false
          }
        ],
        "container": {
          "source": "",
          "sort": "ID",
          "desc": false,
          "value": "ID",
          "title": "New_Container_0_5_2_100_200_5",
          "default": [],
          "placeholder": "",
          "filter": []
        }
      }
    },
    {
      "key": "fld_1489408533322",
      "title": "Code_Tendovaginitis_stenosans",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Tendovaginitis stenosans",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533323",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "D1",
            "value": "D1",
            "type": "option",
            "default": false
          },
          {
            "title": "D2",
            "value": "D2",
            "type": "option",
            "default": false
          },
          {
            "title": "D3",
            "value": "D3",
            "type": "option",
            "default": false
          },
          {
            "title": "D4",
            "value": "D4",
            "type": "option",
            "default": false
          },
          {
            "title": "D5",
            "value": "D5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533324",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "D1",
            "value": "D1",
            "type": "option",
            "default": false
          },
          {
            "title": "D2",
            "value": "D2",
            "type": "option",
            "default": false
          },
          {
            "title": "D3",
            "value": "D3",
            "type": "option",
            "default": false
          },
          {
            "title": "D4",
            "value": "D4",
            "type": "option",
            "default": false
          },
          {
            "title": "D5",
            "value": "D5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533325",
      "title": "Code_Rhizarthrose",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Rhizarthrose",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533326",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "-",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533327",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "-",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533328",
      "title": "Code_Arthrose kleine Langfingergelenke",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Arthrose kleine Langfingergelenke",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533329",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "-",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533330",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "-",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533331",
      "title": "Code_Z_n_distaler_Vorderarmfraktur",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Z.n. distaler Vorderarmfraktur",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533332",
      "title": "rechts",
      "type": "check",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533333",
      "title": "links",
      "type": "check",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "x",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533334",
      "title": "Code_Z.n. Handwurzel-/ Mittelhandfraktur",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Z.n. Handwurzel-/ Mittelhandfraktur",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533335",
      "title": "rechts",
      "type": "check",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "x",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533336",
      "title": "links",
      "type": "check",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "x",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533337",
      "title": "Code_Cervicale  Degenerationen C6/C7",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Cervicale Degenerationen C6/C7",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533338",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533339",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533340",
      "title": "Sonstige",
      "type": "textarea",
      "group": "grp_1_1489408533320|grp_2_1489408533321",
      "cols": 12,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533341",
      "title": "Code Schmerzhafte Parästhesie",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Schmerzhafte Parästhesie",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533342",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533343",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533344",
      "title": "Code Störung Steroästhesie",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Störung Steroästhesie",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533345",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533346",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533347",
      "title": "Code Nächtlicher Handschmerz",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Nächtlicher Handschmerz",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533348",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533349",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533350",
      "title": "Code Schwäche Daumenmuskulatur",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Schwäche Daumenmuskulatur (Abspreizen/ Opposition/ Thenaratrophie)",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533351",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533352",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533353",
      "title": "Code Keine Besserung konservativ",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Keine Besserung unter konservativer Therapie",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533354",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533355",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533356",
      "title": "Code Klinische Untersuchung",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "<b>Klinische Untersuchung </b>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533357",
      "title": "Code Typische Parästhesie im autonomen Versorgungsgebiet des Nervus medianus",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Typische Parästhesie im autonomen Versorgungsgebiet des Nervus medianus",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533358",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533359",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533360",
      "title": "Code Stereoästhesie im Nervus medianus",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Hyp-/ u.-o. Stereoästhesie im autonomen Versorgungsgebiet des Nervus medianus",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533361",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533362",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533363",
      "title": "Code Thenaratrophie",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Thenaratrophie",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533364",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533365",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533366",
      "title": "Code Phalen-Test",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Phalen-Test",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533367",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533368",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533369",
      "title": "Code Tinnel-Hoffmann-Test",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Tinnel-Hoffmann-Test",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533370",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533371",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533322",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533372",
      "title": "Code Motorik",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "<b>Motorik</b>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533373",
      "title": "Code Faustschluss",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Faustschluss<br><i>Finger-Hohlhand-Abstand [cm]</i>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533374",
      "title": "rechts",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533375",
      "title": "Code Faustschluss Space 3",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 3,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533376",
      "title": "links",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533377",
      "title": "Code Daumenopposition",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Daumenopposition<br><i>Daumen-Kleinfinger-Probe (Abstand in cm) </i>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533378",
      "title": "rechts",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533379",
      "title": "Code Daumenopposition Space 3",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 3,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533380",
      "title": "links",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533381",
      "title": "Code Abspreizung Daumen in der Handebene",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Abspreizung Daumen in der Handebene<br><i>Neutral-0-Methode</i>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533382",
      "title": "rechts Wert 1",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533383",
      "title": "Wert 2",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533384",
      "title": "Wert 3",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533385",
      "title": "Code Abspreizung Daumen Space 1",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533386",
      "title": "links Wert 1",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533387",
      "title": "Wert 2",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533388",
      "title": "Wert 3",
      "type": "text",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 1,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "class": ""
      }
    },
    {
      "key": "fld_1489408533389",
      "title": "Code Spitzgriff intakt",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Spitzgriff intakt",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533390",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533391",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533392",
      "title": "Code Kraftentfaltung",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "<b>Kraftentfaltung</b>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533393",
      "title": "Code Abduktion des Daumens",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Abduktion des Daumens<br><i>Janda 1 - 5</i>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533394",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "J 1",
            "value": "Janda 1",
            "type": "option",
            "default": false
          },
          {
            "title": "J 2",
            "value": "Janda 2",
            "type": "option",
            "default": false
          },
          {
            "title": "J 3",
            "value": "Janda 3",
            "type": "option",
            "default": false
          },
          {
            "title": "J 4",
            "value": "Janda 4",
            "type": "option",
            "default": false
          },
          {
            "title": "J 5",
            "value": "Janda 5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533395",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "J 1",
            "value": "Janda 1",
            "type": "option",
            "default": false
          },
          {
            "title": "J 2",
            "value": "Janda 2",
            "type": "option",
            "default": false
          },
          {
            "title": "J 3",
            "value": "Janda 3",
            "type": "option",
            "default": false
          },
          {
            "title": "J 4",
            "value": "Janda 4",
            "type": "option",
            "default": false
          },
          {
            "title": "J 5",
            "value": "Janda 5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533396",
      "title": "Code Opposition des Daumens",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Opposition des Daumens<br><i>Janda 1 - 5</i>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533397",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "J 1",
            "value": "Janda 1",
            "type": "option",
            "default": false
          },
          {
            "title": "J 2",
            "value": "Janda 2",
            "type": "option",
            "default": false
          },
          {
            "title": "J 3",
            "value": "Janda 3",
            "type": "option",
            "default": false
          },
          {
            "title": "J 4",
            "value": "Janda 4",
            "type": "option",
            "default": false
          },
          {
            "title": "J 5",
            "value": "Janda 5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533398",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "J 1",
            "value": "Janda 1",
            "type": "option",
            "default": false
          },
          {
            "title": "J 2",
            "value": "Janda 2",
            "type": "option",
            "default": false
          },
          {
            "title": "J 3",
            "value": "Janda 3",
            "type": "option",
            "default": false
          },
          {
            "title": "J 4",
            "value": "Janda 4",
            "type": "option",
            "default": false
          },
          {
            "title": "J 5",
            "value": "Janda 5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533399",
      "title": "Code Grob-/ Kraftgriff",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Grob-/ Kraftgriff<br><i>Janda 1 - 5</i>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533400",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "J 1",
            "value": "Janda 1",
            "type": "option",
            "default": false
          },
          {
            "title": "J 2",
            "value": "Janda 2",
            "type": "option",
            "default": false
          },
          {
            "title": "J 3",
            "value": "Janda 3",
            "type": "option",
            "default": false
          },
          {
            "title": "J 4",
            "value": "Janda 4",
            "type": "option",
            "default": false
          },
          {
            "title": "J 5",
            "value": "Janda 5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533401",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "J 1",
            "value": "Janda 1",
            "type": "option",
            "default": false
          },
          {
            "title": "J 2",
            "value": "Janda 2",
            "type": "option",
            "default": false
          },
          {
            "title": "J 3",
            "value": "Janda 3",
            "type": "option",
            "default": false
          },
          {
            "title": "J 4",
            "value": "Janda 4",
            "type": "option",
            "default": false
          },
          {
            "title": "J 5",
            "value": "Janda 5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533402",
      "title": "Code Spitzgriff",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Spitzgriff<br><i>Janda 1 - 5</i>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533403",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "J 1",
            "value": "Janda 1",
            "type": "option",
            "default": false
          },
          {
            "title": "J 2",
            "value": "Janda 2",
            "type": "option",
            "default": false
          },
          {
            "title": "J 3",
            "value": "Janda 3",
            "type": "option",
            "default": false
          },
          {
            "title": "J 4",
            "value": "Janda 4",
            "type": "option",
            "default": false
          },
          {
            "title": "J 5",
            "value": "Janda 5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533404",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533323",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "J 1",
            "value": "Janda 1",
            "type": "option",
            "default": false
          },
          {
            "title": "J 2",
            "value": "Janda 2",
            "type": "option",
            "default": false
          },
          {
            "title": "J 3",
            "value": "Janda 3",
            "type": "option",
            "default": false
          },
          {
            "title": "J 4",
            "value": "Janda 4",
            "type": "option",
            "default": false
          },
          {
            "title": "J 5",
            "value": "Janda 5",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533405",
      "title": "Code Klinische_Untersuchung_Kategorie_2_Info",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 12,
      "clearBefore": false,
      "clearAfter": true,
      "parameters": {
        "css": "",
        "html": "<font color='#ff0000'><b>Indikation zur KTS-Operation  ist gegeben,  wenn  1 von 2 Zeichen der Kategorie 2 positiv ist.</b><br><i><ul>    <li>Elektrophysiologische Diagnostik: positiv        <ul>            <li>vorrangig: Motorische / Sensible Neurographie</li>        </ul>    </li>    <li>Bildgebung:        <ul>            <li>Neurosonographie: positiv</li>        </ul>    </li></ul></i></font>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533406",
      "title": "Code Elektrophysiologie",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "<b>Elektrophysiologie</b>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533407",
      "title": "Code Motorische Neurographie",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Motorische Neurographie",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533408",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533409",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533410",
      "title": "Code Sensible Neurographie",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Sensible Neurographie",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533411",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533412",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533413",
      "title": "Code Ggfs. Sonstige Neurographie",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Ggfs. Sonstige",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533414",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533415",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533416",
      "title": "Code Bildgebung",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "<b>Elektrophysiologie</b>",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533417",
      "title": "Code Neurosonographie_N_medianus",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Neurosonographie N. medianus",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533418",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533419",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533420",
      "title": "Code Bildgebung_Sonstige",
      "type": "code",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": true,
      "clearAfter": false,
      "parameters": {
        "css": "",
        "html": "Sonstige",
        "js": ""
      }
    },
    {
      "key": "fld_1489408533421",
      "title": "rechts",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    },
    {
      "key": "fld_1489408533422",
      "title": "links",
      "type": "radio",
      "group": "grp_1_1489408533320|grp_2_1489408533324",
      "cols": 4,
      "clearBefore": false,
      "clearAfter": false,
      "parameters": {
        "inline": true,
        "inlineBreak": true,
        "options": [
          {
            "title": "positiv",
            "value": "+",
            "type": "option",
            "default": false
          },
          {
            "title": "negativ",
            "value": "0",
            "type": "option",
            "default": false
          }
        ]
      }
    }
  ]
}