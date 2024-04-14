export const testWarnings=[
    {
      "id": 1,
      "normalProbability": true,
      "event": {
        "sv": "Vind",
        "en": "Wind",
        "code": "WIND",
        "mhoClassification": {
          "sv": "Meteorologi",
          "en": "Meteorology",
          "code": "MET"
        }
      },
      "descriptions": [],
      "warningAreas": [
        {
          "id": 1,
          "approximateStart": "2021-09-16T08:00:00.000Z",
          "approximateEnd": "2021-09-20T08:00:00.000Z",
          "published": "2021-09-16T08:47:36.540Z",
          "normalProbability": true,
          "areaName": {
            "sv": "TEST Västra Götalands län",
            "en": "TEST Västra Götaland County"
          },
          "warningLevel": { "sv": "Gul", "en": "Yellow", "code": "YELLOW" },
          "eventDescription": { "sv": "Vind", "en": "Wind", "code": "WIND" },
          "affectedAreas": [
            {
              "id": 14,
              "sv": "Västra Götalands län",
              "en": "Västra Götaland County"
            }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Händelsebeskrivning",
                "en": "Description of incident",
                "code": "INCIDENT"
              },
              "text": {
                "sv": "TESTMEDDELANDE Under torsdagen väntas tilltagande västlig vind med byvindar upp till stormstyrka som bland annat medför risk för nedfallna träd, begränsad framkomlighet i trafiken och risk för flygande föremål. Vinden avtar västerifrån under kvällen.",
                "en": "TEST PLEASE DISREGARD During Thursday, increasing westerly winds with village winds up to storm strength are expected, which among other things entails a risk of fallen trees, limited passability in traffic and a risk of flying objects. The wind decreases from the west during the evening."
              }
            },
            {
              "title": {
                "sv": "Hur kan det påverka mig",
                "en": "What to expect",
                "code": "AFFECT"
              },
              "text": {
                "sv": "TEST Begränsad framkomlighet på vägar på grund av nedfallna träd.\nRisk för förseningar inom buss-, tåg-, flyg- och färjetrafiken samt inställda avgångar.\nOmråden med luftburna elledningar kan påverkas och ge störningar i el- och teleförsörjningen.\nLösa föremål och tillfälliga konstruktioner riskerar att förflyttas eller skadas.\nVissa skador på skog (hyggeskanter och nygallrad skog). Enstaka träd eller grenar ramlar ner.",
                "en": "TEST Risk for road blockages due to fallen trees.\nRisk of delays in bus-, train-, air- and ferry traffic as well as canceled departures.\nAreas with overground power lines can be affected and cause disturbances in the electricity- and telecommunications supply.\nLoose objects and temporary constructions are at risk of being moved or damaged.\nSome damage to forest (felling edges and newly thinned forest). Single trees or branches may fall down."
              }
            },
            {
              "title": { "sv": "Var", "en": "Where", "code": "WHERE" },
              "text": {
                "sv": "TEST Hallands län, Skåne län, Kronobergs län, Blekinge län och Kalmar län, inklusive Öland.",
                "en": "TEST Halland County, Skåne County, Kronoberg County, Blekinge County and Kalmar County, including Öland."
              }
            },
            {
              "title": {
                "sv": "Vad händer",
                "en": "What happens",
                "code": "HAPPENS"
              },
              "text": {
                "sv": "TEST I samband med ett lågtryck som passerar österut kommer vinden under förmiddagen att öka västerifrån och byvinden väntas nå stormstyrka på många platser. I Halland och Skåne nås kulmen mitt på dagen. I Kronobergs län, Kalmar län och Blekinge län nås kulmen något senare på eftermiddagen. Under kvällen avtar vinden snabbt västerifrån.",
                "en": "TEST In connection with a low pressure that passes to the east, the wind will increase from the west during the morning and the village wind is expected to reach storm strength in many places. In Halland and Skåne, the peak is reached in the middle of the day. In Kronoberg County, Kalmar County and Blekinge County, the peak is reached somewhat later in the afternoon. During the evening the wind decreases rapidly from the west."
              }
            },
            {
              "title": {
                "sv": "Kommentar",
                "en": "Comments",
                "code": "COMMENTS"
              },
              "text": {
                "sv": "TEST Lågtryckets exakta utveckling är fortfarande svårbedömd. Små förändringar i lågtryckets bana och utveckling kan få stor påverkan på var det blir som blåsigast och hur blåsigt det blir.",
                "en": "TEST The exact development of low pressure is still difficult to assess. Small changes in the trajectory and development of low pressure can have a major impact on where it becomes most windy and how windy it becomes."
              }
            }
          ],
          "area": {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [[
                [15,56],
                [15,59],
                [17,59],
                [17,56],
                [15,56]
              ]]
            }
          }
        },
        {
          "id": 2,
          "approximateStart": "2021-09-16T08:00:00.000Z",
          "approximateEnd": "2021-09-20T08:00:00.000Z",
          "published": "2021-09-16T08:47:36.540Z",
          "normalProbability": true,
          "areaName": {
            "sv": "TEST Jönköpings län, Kronobergs län, Hallands län",
            "en": "TEST Jönköping County, Kronoberg County, Halland County"
          },
          "warningLevel": { "sv": "Gul", "en": "Yellow", "code": "YELLOW" },
          "eventDescription": { "sv": "Vind", "en": "Wind", "code": "WIND" },
          "affectedAreas": [
            { "id": 6, "sv": "Jönköpings län", "en": "Jönköping County" },
            { "id": 7, "sv": "Kronobergs län", "en": "Kronoberg County" },
            { "id": 13, "sv": "Hallands län", "en": "Halland County" }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Händelsebeskrivning",
                "en": "Description of incident",
                "code": "INCIDENT"
              },
              "text": {
                "sv": "TESTMEDDELANDE Under torsdagen väntas tilltagande västlig vind med byvindar upp till orkanstyrka som bland annat medför risk för nedfallna träd med risk för mycket begränsad framkomlighet på vägar och risk för flygande föremål. Vinden avtar västerifrån under kvällen.",
                "en": "TEST ANNOUNCEMENT During Thursday, increasing westerly winds and the wind gust is expected to reach hurricane strength, which among other things entails a risk of fallen trees, limited passability in traffic and a risk of flying objects. The wind decreases from the west during the evening."
              }
            },
            {
              "title": {
                "sv": "Hur kan det påverka mig",
                "en": "What to expect",
                "code": "AFFECT"
              },
              "text": {
                "sv": "TEST Begränsad framkomlighet på vägar på grund av nedfallna träd.\nRisk för förseningar inom buss-, tåg-, flyg- och färjetrafiken samt inställda avgångar.\nOmråden med luftburna elledningar kan påverkas och ge störningar i el- och teleförsörjningen.\nLösa föremål och tillfälliga konstruktioner riskerar att förflyttas eller skadas.\nVissa skador på skog (hyggeskanter och nygallrad skog). Enstaka träd eller grenar ramlar ner.",
                "en": "TEST Risk for road blockages due to fallen trees.\nRisk of delays in bus-, train-, air- and ferry traffic as well as canceled departures.\nAreas with overground power lines can be affected and cause disturbances in the electricity- and telecommunications supply.\nLoose objects and temporary constructions are at risk of being moved or damaged.\nSome damage to forest (felling edges and newly thinned forest). Single trees or branches may fall down."
              }
            },
            {
              "title": { "sv": "Var", "en": "Where", "code": "WHERE" },
              "text": {
                "sv": "TEST I kustlandet från området kring Falkenberg vidare söderut till området kring Helsingborg.",
                "en": "TEST In the coastal area from the area around Falkenberg further south to the area around Helsingborg."
              }
            },
            {
              "title": {
                "sv": "Vad händer",
                "en": "What happens",
                "code": "HAPPENS"
              },
              "text": {
                "sv": "TEST I samband med ett lågtryck som passerar österut kommer vinden under förmiddagen att öka västerifrån och byvinden väntas nå stormstyrka på många platser. I Halland och Skåne nås kulmen mitt på dagen. I Kronobergs län, Kalmar län och Blekinge län nås kulmen något senare på eftermiddagen och då kan det bli stormbyar även i dessa områden. Under kvällen avtar vinden snabbt västerifrån.",
                "en": "TEST In connection with a low pressure that passes to the east, the wind will increase from the west during the morning and the village wind is expected to reach storm strength in many places. In Halland and Skåne, the peak is reached in the middle of the day. In Kronoberg County, Kalmar County and Blekinge County, the peak is reached somewhat later in the afternoon and then there may be storm surges in these areas as well. During the evening the wind decreases rapidly from the west."
              }
            },
            {
              "title": {
                "sv": "Kommentar",
                "en": "Comments",
                "code": "COMMENTS"
              },
              "text": {
                "sv": "TEST Lågtryckets exakta utveckling är fortfarande svårbedömd. Små förändringar i lågtryckets bana och utveckling kan få stor påverkan på var det blir som blåsigast och hur blåsigt det blir.",
                "en": "TEST The exact development of low pressure is still difficult to assess. Small changes in the trajectory and development of low pressure can have a major impact on where it becomes most windy and how windy it becomes."
              }
            }
          ],
          "area": {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [13.007813, 56.920997],
                  [14.18335, 56.788845],
                  [14.029541, 57.42721],
                  [13.007813, 56.920997]
                ]
              ]
            }
          }
        },
        {
          "id": 3,
          "approximateStart": "2021-09-16T08:00:00.000Z",
          "approximateEnd": "2021-09-20T08:00:00.000Z",
          "published": "2021-09-16T08:47:36.540Z",
          "normalProbability": true,
          "areaName": { "sv": "TEST Gotland", "en": "TEST Gotland" },
          "warningLevel": { "sv": "Gul", "en": "Yellow", "code": "YELLOW" },
          "eventDescription": { "sv": "Vind", "en": "Wind", "code": "WIND" },
          "affectedAreas": [
            { "id": 9, "sv": "Gotlands län", "en": "Gotland County" }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Händelsebeskrivning",
                "en": "Description of incident",
                "code": "INCIDENT"
              },
              "text": {
                "sv": "TESTMEDDELANDE Torsdag kväll tilltagande vind med byvindar upp till stormstyrka som bland annat medför risk för nedfallna träd, begränsad framkomlighet i trafiken och risk för flygande föremål. Vinden avtar natt till fredag.",
                "en": "TEST PLEASE DISREGARD Thursday evening increasing wind with village winds up to storm strength which, among other things, entails a risk of fallen trees, limited passability in traffic and a risk of flying objects. The wind decreases night to Friday."
              }
            },
            {
              "title": {
                "sv": "Hur kan det påverka mig",
                "en": "What to expect",
                "code": "AFFECT"
              },
              "text": {
                "sv": "Begränsad framkomlighet på vägar på grund av nedfallna träd.\nRisk för förseningar inom buss-, tåg-, flyg- och färjetrafiken samt inställda avgångar.\nOmråden med luftburna elledningar kan påverkas och ge störningar i el- och teleförsörjningen.\nLösa föremål och tillfälliga konstruktioner riskerar att förflyttas eller skadas.\nVissa skador på skog (hyggeskanter och nygallrad skog). Enstaka träd eller grenar ramlar ner.",
                "en": "Risk for road blockages due to fallen trees.\nRisk of delays in bus-, train-, air- and ferry traffic as well as canceled departures.\nAreas with overground power lines can be affected and cause disturbances in the electricity- and telecommunications supply.\nLoose objects and temporary constructions are at risk of being moved or damaged.\nSome damage to forest (felling edges and newly thinned forest). Single trees or branches may fall down."
              }
            },
            {
              "title": { "sv": "Var", "en": "Where", "code": "WHERE" },
              "text": { "sv": "TEST Gotland", "en": "TEST Gotland" }
            },
            {
              "title": {
                "sv": "Vad händer",
                "en": "What happens",
                "code": "HAPPENS"
              },
              "text": {
                "sv": "TEST I samband med ett lågtryck som passerar österut kommer vinden under kvällen att öka västerifrån och byvinden väntas nå stormstyrka på många platser. Kulmen väntas kring midnatt och därefter avtar vinden långsamt.",
                "en": "TEST In connection with a low pressure that passes to the east, the wind will increase from the west during the evening and the village wind is expected to reach storm strength in many places. The peak is expected around midnight and then the wind slowly decreases."
              }
            },
            {
              "title": {
                "sv": "Kommentar",
                "en": "Comments",
                "code": "COMMENTS"
              },
              "text": {
                "sv": "TEST Lågtryckets exakta utveckling är fortfarande svårbedömd. Små förändringar i lågtryckets bana och utveckling kan få stor påverkan på var det blir som blåsigast och hur blåsigt det blir.",
                "en": "TEST The exact development of low pressure is still difficult to assess. Small changes in the trajectory and development of low pressure can have a major impact on where it becomes most windy and how windy it becomes."
              }
            }
          ],
          "area": {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [18.292236, 57.397624],
                  [18.709717, 57.385783],
                  [18.4021, 57.568888],
                  [18.292236, 57.397624]
                ]
              ]
            }
          }
        }
      ]
    },
    {
      "id": 2,
      "normalProbability": true,
      "event": {
        "sv": "Medelvind till havs",
        "en": "Wind at sea",
        "code": "WIND_SEA",
        "mhoClassification": {
          "sv": "Meteorologi",
          "en": "Meteorology",
          "code": "MET"
        }
      },
      "descriptions": [],
      "warningAreas": [
        {
          "id": 4,
          "approximateStart": "2021-09-16T08:00:00.000Z",
          "approximateEnd": "2021-09-17T08:00:00.000Z",
          "published": "2021-09-16T08:56:12.662Z",
          "normalProbability": true,
          "areaName": { "sv": "TEST Kattegatt", "en": "TEST Kattegatt" },
          "warningLevel": { "sv": "Gul", "en": "Yellow", "code": "YELLOW" },
          "eventDescription": {
            "sv": "Kuling 14-17 m/s",
            "en": "Near gale 14-17 m/s",
            "code": "GALE_LOW"
          },
          "affectedAreas": [{ "id": 56, "sv": "Kattegatt", "en": "Kattegat" }],
          "descriptions": [
            {
              "title": {
                "sv": "Händelsebeskrivning",
                "en": "Description of incident",
                "code": "INCIDENT"
              },
              "text": {
                "sv": "TESTMEDDELANDE Från torsdag förmiddag till torsdag eftermiddag sydväst ca 15 m/s.",
                "en": "TEST NOTICE From Thursday morning to Thursday afternoon southwest about 15 m / s."
              }
            },
            {
              "title": {
                "sv": "Hur kan det påverka mig",
                "en": "What to expect",
                "code": "AFFECT"
              },
              "text": {
                "sv": "TEST Problem för fritidsbåtar och små yrkesfartyg.",
                "en": "TEST Problem for leisure boats and small commercial vessels."
              }
            },
            {
              "title": {
                "sv": "Kommentar",
                "en": "Comments",
                "code": "COMMENTS"
              },
              "text": { "sv": "TEST", "en": "TEST" }
            },
            {
              "title": { "sv": "Var", "en": "Where", "code": "WHERE" },
              "text": {
                "sv": "TEST Västra delen av Kattegatt",
                "en": "TEST The western part of the Kattegat"
              }
            }
          ],
          "area": {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [15,56],
                [15,59],
                [17,59],
                [17,56],
                [15,56]
              ]
           
            }
          }
        }
      ]
    },
    {
      "id": 3,
      "normalProbability": true,
      "event": {
        "sv": "Brandrisk",
        "en": "Fire risk",
        "code": "FIRE",
        "mhoClassification": {
          "sv": "Meteorologi",
          "en": "Meteorology",
          "code": "MET"
        }
      },
      "descriptions": [],
      "warningAreas": [
        {
          "id": 5,
          "approximateStart": "2021-09-16T08:00:00.000Z",
          "approximateEnd": "2021-09-18T14:00:00.000Z",
          "published": "2021-09-20T08:58:12.173Z",
          "normalProbability": true,
          "areaName": {
            "sv": "TEST Södermanlands län, Stockholms län, Uppsala län",
            "en": "TEST Södermanland County, Stockholm County, Uppsala County"
          },
          "warningLevel": {
            "sv": "Meddelande",
            "en": "Message",
            "code": "MESSAGE"
          },
          "eventDescription": {
            "sv": "Risk för gräsbrand",
            "en": "Grass fire",
            "code": "GRASS_FIRE"
          },
          "affectedAreas": [
            { "id": 4, "sv": "Södermanlands län", "en": "Södermanland County" },
            { "id": 1, "sv": "Stockholms län", "en": "Stockholm County" },
            { "id": 3, "sv": "Uppsala län", "en": "Uppsala County" }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Händelsebeskrivning",
                "en": "Description of incident",
                "code": "INCIDENT"
              },
              "text": {
                "sv": "TESTMEDDELANDE Stor risk för att gräsbrand uppstår och lätt sprids i torrt fjolårsgräs. Stor försiktighet bör iakttas vid eldning utomhus.",
                "en": "TEST PLEASE DISREGARD High risk of grass fire occurring and spreading easily in dry last year's grass. Great care should be taken when lighting outdoors."
              }
            },
            {
              "title": {
                "sv": "Hur kan det påverka mig",
                "en": "What to expect",
                "code": "AFFECT"
              },
              "text": {
                "sv": "Stor risk för att gräsbrand uppstår och lätt sprids i torrt fjolårsgräs. \nStor försiktighet bör iakttas vid eldning utomhus.",
                "en": "High risk for fires in grasslands, especially in areas with dead grass from the previous season.\nTake great care when lighting fires outside."
              }
            },
            {
              "title": { "sv": "Var", "en": "Where", "code": "WHERE" },
              "text": {
                "sv": "TEST  Södermanlands, Stockholms och Uppsala län från området kring Eskilstuna och upp till området kring Uppsala och ned mot Stockholm.",
                "en": "TEST The counties of Södermanland, Stockholm and Uppsala from the area around Eskilstuna and up to the area around Uppsala and down towards Stockholm."
              }
            }
          ],
          "area": {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [15, 56],
                [15, 59],
                [17, 59],
                [17, 56],
                [15, 56]
              ]
            }
          }
        }
      ]
    },
    {
      "id": 4,
      "normalProbability": true,
      "event": {
        "sv": "Höga flöden",
        "en": "High water discharge",
        "code": "HIGH_FLOW",
        "mhoClassification": {
          "sv": "Hydrologi",
          "en": "Hydrology",
          "code": "HYD"
        }
      },
      "descriptions": [],
      "warningAreas": [
        {
          "id": 6,
          "approximateStart": "2021-09-16T11:36:00.000Z",
          "published": "2021-09-16T12:12:50.995Z",
          "normalProbability": true,
          "areaName": { "sv": "TEST Byälven", "en": "TEST Byälven" },
          "warningLevel": { "sv": "Gul", "en": "Yellow", "code": "YELLOW" },
          "eventDescription": {
            "sv": "Höga flöden",
            "en": "High water discharge",
            "code": "HIGH_FLOW"
          },
          "affectedAreas": [
            { "id": 6, "sv": "Jönköpings län", "en": "Jönköping County" },
            { "id": 8, "sv": "Kalmar län", "en": "Kalmar County" }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Händelsebeskrivning",
                "en": "Description of incident",
                "code": "INCIDENT"
              },
              "text": {
                "sv": "TEST Extremt höga flöden efter den senaste tidens regn.",
                "en": "TEST Extremely high flows due to large amounts of rain."
              }
            },
            {
              "title": {
                "sv": "Hur kan det påverka mig",
                "en": "What to expect",
                "code": "AFFECT"
              },
              "text": {
                "sv": "TEST Extremt höga strömhastigheter i vattendragen.\nFlöden som uppstår i genomsnitt vart 50:e år eller mer sällan.",
                "en": "TEST Extremely fast flowing water in rivers and smaller watercourses.\nFlows that occur every 50th year on average, or less."
              }
            },
            {
              "title": {
                "sv": "Kommentar",
                "en": "Comments",
                "code": "COMMENTS"
              },
              "text": {
                "sv": "TEST Osäkert på grund av regleringar.",
                "en": "TEST Uncertain due to regulation"
              }
            },
            {
              "title": { "sv": "Var", "en": "Where", "code": "WHERE" },
              "text": {
                "sv": "TEST Byälven nedströms Glafsfjorden",
                "en": "TEST River Byälven downstream Glafsfjorden"
              }
            }
          ],
          "area": {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "LineString",
                  "coordinates": [
                    [15, 56],
                    [15, 59],
                    [17, 59],
                    [17, 56],
                    [15, 56]
                  ]
                }
              }
            ]
          }
        }
      ]
    },
    {
      "id": 6,
      "areaName": { "sv": "TEST Vänern", "en": "TEST Lake Vänern" },
      "normalProbability": true,
      "event": {
        "sv": "Översvämning",
        "en": "Flooding",
        "code": "FLOODING",
        "mhoClassification": {
          "sv": "Hydrologi",
          "en": "Hydrology",
          "code": "HYD"
        }
      },
      "descriptions": [
        {
          "title": {
            "sv": "Händelsebeskrivning",
            "en": "Description of incident",
            "code": "INCIDENT"
          },
          "text": {
            "sv": "TESTMEDDELANDE Översvämningar förväntas kommande dagarna mellan Näs bruk och Gysinge i samband med snösmältning.",
            "en": "TEST PLEASE DISREGARD Flooding caused by snowmelt is expected the coming days between Näs bruk and Gysinge."
          }
        },
        {
          "title": { "sv": "Var", "en": "Where", "code": "WHERE" },
          "text": {
            "sv": "TEST Dalälven mellan Näs bruk och Gysinge",
            "en": "TEST River Dalälven between Näs bruk and Gysinge"
          }
        },
        {
          "title": {
            "sv": "Hur kan det påverka mig",
            "en": "What to expect",
            "code": "AFFECT"
          },
          "text": {
            "sv": "TEST Översvämning av regionalt viktiga och mindre vägar.\\nTEST Översvämning av permanentbostäder.\\nTEST Översvämning av fritidshus.\\nTEST Översvämning av jordbruksområden.",
            "en": "TEST Flooding of regional and local road infrastructure.\\nTEST Flooding of houses used for residential housing or commercial businesses.\\nTEST Flooding of houses that are not used for residential housing or commercial businesses. These can include summer houses, garages, sheds and agricultural buildings.\\nTEST Flooding of agricultural land."
          }
        }
      ],
      "warningAreas": [
        {
          "id": 54,
          "approximateStart": "2021-09-16T22:00:00.000Z",
          "approximateEnd": "2021-09-17T22:00:00.000Z",
          "published": "2021-09-16T12:56:49.033Z",
          "normalProbability": true,
          "areaName": { "sv": "Essunga kommun", "en": "Essunga municipality" },
          "warningLevel": { "sv": "Orange", "en": "Orange", "code": "ORANGE" },
          "eventDescription": {
            "sv": "Översvämning",
            "en": "Flooding",
            "code": "FLOODING"
          },
          "affectedAreas": [
            {
              "id": 14,
              "sv": "Västra Götalands län",
              "en": "Västra Götaland County"
            }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Vad händer",
                "en": "What happens",
                "code": "HAPPENS"
              },
              "text": {
                "sv": "Översvämning av regionalt viktiga vägar\nÖversvämning av mindre vägar",
                "en": "Flooding of regional road infrastructure\nFlooding of local road infrastructure"
              }
            }
          ],
          "area": {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [12.80222259174195, 58.28964987510611],
                  [12.810328446528846, 58.29652740979712],
                  [12.827375241329335, 58.29681823412965],
                  [12.829710680662497, 58.25867359966897],
                  [12.804168046395064, 58.25823715820963],
                  [12.80222259174195, 58.28964987510611]
                ]
              ]
            },
            "properties": {
              "dvoid": 10803,
              "baroid": 216,
              "baroNameEn": "Lake Vänern",
              "baroNameSv": "Vänern"
            }
          }
        },
        {
          "id": 55,
          "approximateStart": "2021-09-16T22:00:00.000Z",
          "approximateEnd": "2021-09-17T22:00:00.000Z",
          "published": "2021-09-16T12:56:49.033Z",
          "normalProbability": true,
          "areaName": { "sv": "Vara kommun", "en": "Vara municipality" },
          "warningLevel": { "sv": "Orange", "en": "Orange", "code": "ORANGE" },
          "eventDescription": {
            "sv": "Översvämning",
            "en": "Flooding",
            "code": "FLOODING"
          },
          "affectedAreas": [
            {
              "id": 14,
              "sv": "Västra Götalands län",
              "en": "Västra Götaland County"
            }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Vad händer",
                "en": "What happens",
                "code": "HAPPENS"
              },
              "text": {
                "sv": "Risk för påverkan på tågtrafik på grund av översvämning nära järnvägen (Älvsborgsbanan).",
                "en": "Risk of disruptions to rail traffic due to flooding close to rail infrastructure (Älvsborgsbanan)."
              }
            }
          ],
          "area": {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [12.80222259174195, 58.28964987510611],
                  [12.776658125737114, 58.28920779313419],
                  [12.774685929680938, 58.32061977407824],
                  [12.800133615446374, 58.32330613958539],
                  [12.808663356245237, 58.32345255636583],
                  [12.810328446528846, 58.29652740979712],
                  [12.80222259174195, 58.28964987510611]
                ]
              ]
            },
            "properties": {
              "dvoid": 10804,
              "baroid": 216,
              "baroNameEn": "Lake Vänern",
              "baroNameSv": "Vänern"
            }
          }
        }
      ]
    },
    {
      "id": 7,
      "normalProbability": true,
      "event": {
        "sv": "Risk för vattenbrist",
        "en": "Risk for water shortage",
        "code": "WATER_SHORTAGE",
        "mhoClassification": {
          "sv": "Hydrologi",
          "en": "Hydrology",
          "code": "HYD"
        }
      },
      "descriptions": [],
      "warningAreas": [
        {
          "id": 56,
          "approximateStart": "2021-09-16T12:57:17.887Z",
          "published": "2021-09-16T12:58:50.586Z",
          "normalProbability": true,
          "areaName": { "sv": "Kalmar län" },
          "warningLevel": {
            "sv": "Meddelande",
            "en": "Message",
            "code": "MESSAGE"
          },
          "eventDescription": {
            "sv": "Risk för vattenbrist",
            "en": "Risk for water shortage",
            "code": "WATER_SHORTAGE"
          },
          "affectedAreas": [
            { "id": 8, "sv": "Kalmar län", "en": "Kalmar County" }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Vattendrag",
                "en": "Watercourses",
                "code": "WATERCOURSE"
              },
              "text": {
                "sv": "TEST Låga flöden i Emån, Alsterån och Virån.",
                "en": "TEST Low flows in rivers Emån, Alsterån and Virån."
              }
            },
            {
              "title": {
                "sv": "Grundvatten - små magasin",
                "en": "Minor groundwater resources",
                "code": "GROUNDWATER_MINOR"
              },
              "text": {
                "sv": "TEST Låga grundvattennivåer i små magasin.",
                "en": "TEST Low groundwater levels in small groundwater reservoirs."
              }
            }
          ],
          "area": {
            "crs": { "type": "name", "properties": { "name": "EPSG:4326" } },
            "type": "Feature",
            "geometry": {
              "type": "MultiPolygon",
              "coordinates": [
                [
                  [
                    [16.78858, 57.91881],
                    [16.79266, 57.87528],
                    [16.78435, 57.85991],
                    [16.77119, 57.86001],
                    [16.76667, 57.86126],
                    [16.7175, 57.88856],
                    [16.637, 57.88785],
                    [16.58562, 57.86895],
                    [16.5843, 57.82603],
                    [16.70527, 57.7566],
                    [16.7134, 57.71665],
                    [16.71057, 57.69685],
                    [16.71011, 57.69366],
                    [16.68256, 57.67303],
                    [16.66826, 57.66165],
                    [16.65822, 57.64616],
                    [16.6573, 57.60689],
                    [16.64375, 57.58593],
                    [16.62541, 57.58325],
                    [16.60725, 57.58898],
                    [16.56542, 57.58782],
                    [16.56258, 57.57662],
                    [16.56765, 57.56957],
                    [16.59091, 57.55821],
                    [16.62217, 57.55521],
                    [16.6454, 57.54383],
                    [16.64877, 57.54127],
                    [16.6659, 57.52826],
                    [16.67837, 57.50432],
                    [16.69299, 57.46212],
                    [16.67881, 57.41311],
                    [16.66262, 57.38797],
                    [16.63369, 57.37273],
                    [16.61023, 57.36867],
                    [16.58922, 57.35758],
                    [16.58337, 57.32675],
                    [16.56752, 57.31281],
                    [16.54661, 57.30452],
                    [16.50466, 57.2795],
                    [16.47177, 57.27662],
                    [16.49172, 57.26297],
                    [16.50389, 57.23882],
                    [16.49336, 57.22906],
                    [16.4772, 57.19407],
                    [16.47687, 57.17583],
                    [16.50729, 57.14311],
                    [16.52777, 57.12105],
                    [16.5502, 57.09684],
                    [16.57548, 57.07284],
                    [16.57636, 57.06862],
                    [16.57479, 57.0412],
                    [16.54819, 56.99583],
                    [16.54042, 56.99306],
                    [16.52497, 56.99175],
                    [16.51199, 56.98481],
                    [16.50401, 56.97082],
                    [16.46962, 56.91488],
                    [16.42136, 56.81319],
                    [16.41774, 56.79836],
                    [16.41624, 56.78747],
                    [16.42379, 56.78041],
                    [16.43404, 56.78177],
                    [16.44699, 56.79152],
                    [16.47258, 56.7928],
                    [16.48526, 56.78712],
                    [16.49257, 56.76743],
                    [16.4796, 56.75627],
                    [16.44383, 56.75646],
                    [16.40552, 56.75665],
                    [16.40194, 56.75536],
                    [16.3974, 56.75373],
                    [16.39011, 56.75111],
                    [16.39008, 56.75107],
                    [16.37961, 56.73292],
                    [16.38247, 56.7007],
                    [16.38397, 56.68379],
                    [16.37076, 56.65298],
                    [16.33753, 56.6447],
                    [16.31962, 56.63917],
                    [16.30689, 56.63922],
                    [16.27112, 56.62953],
                    [16.2455, 56.6156],
                    [16.23515, 56.6002],
                    [16.22669, 56.52586],
                    [16.22153, 56.51886],
                    [16.20626, 56.5147],
                    [16.19095, 56.50632],
                    [16.16982, 56.47946],
                    [16.14908, 56.45168],
                    [16.1191, 56.4097],
                    [16.11594, 56.40452],
                    [16.10459, 56.38592],
                    [16.09859, 56.37608],
                    [16.08083, 56.33208],
                    [16.08065, 56.33208],
                    [16.07943, 56.3286],
                    [16.07662, 56.32162],
                    [16.07316, 56.31302],
                    [15.89809, 56.32319],
                    [15.77431, 56.36674],
                    [15.64578, 56.45278],
                    [15.52702, 56.49245],
                    [15.3635, 56.48238],
                    [15.40929, 56.65532],
                    [15.41039, 56.72998],
                    [15.38207, 56.76401],
                    [15.41023, 56.7871],
                    [15.49488, 56.79926],
                    [15.5383, 56.83579],
                    [15.5405, 56.8967],
                    [15.61472, 56.93151],
                    [15.76096, 56.94024],
                    [15.75469, 57.00882],
                    [15.51653, 57.20145],
                    [15.47199, 57.25304],
                    [15.46557, 57.31072],
                    [15.48242, 57.39171],
                    [15.52173, 57.43477],
                    [15.62437, 57.45738],
                    [15.64429, 57.48717],
                    [15.63464, 57.51342],
                    [15.5954, 57.53613],
                    [15.59827, 57.56042],
                    [15.64326, 57.58631],
                    [15.60458, 57.62566],
                    [15.42105, 57.70488],
                    [15.55458, 57.81664],
                    [15.68489, 57.84124],
                    [15.8565, 57.81594],
                    [15.97309, 57.82103],
                    [16.03465, 57.85652],
                    [16.05346, 57.89133],
                    [16.02952, 57.92545],
                    [16.03617, 57.95122],
                    [16.07341, 57.96866],
                    [16.07061, 58.00467],
                    [16.02775, 58.05927],
                    [16.13759, 58.09387],
                    [16.40011, 58.10847],
                    [16.57453, 58.08521],
                    [16.71105, 57.99769],
                    [16.70402, 57.99354],
                    [16.70185, 57.99226],
                    [16.69795, 57.98995],
                    [16.6933, 57.98721],
                    [16.69292, 57.98698],
                    [16.69271, 57.98686],
                    [16.69257, 57.98615],
                    [16.69251, 57.98583],
                    [16.69215, 57.98397],
                    [16.69164, 57.98138],
                    [16.68969, 57.97144],
                    [16.70285, 57.96995],
                    [16.72715, 57.96378],
                    [16.73791, 57.96064],
                    [16.77066, 57.93858],
                    [16.78858, 57.91881]
                  ]
                ],
                [
                  [
                    [17.09459, 57.33238],
                    [17.1127, 57.33078],
                    [17.12866, 57.34184],
                    [17.13629, 57.33756],
                    [17.15099, 57.31354],
                    [17.1429, 57.30521],
                    [17.1141, 57.29709],
                    [17.08228, 57.27638],
                    [17.07422, 57.26804],
                    [17.07608, 57.24697],
                    [17.08751, 57.20336],
                    [17.08434, 57.18655],
                    [17.07071, 57.16564],
                    [17.01696, 57.10162],
                    [16.98505, 57.07106],
                    [16.95289, 57.03067],
                    [16.94226, 57.01954],
                    [16.93403, 57.00277],
                    [16.9197, 56.98566],
                    [16.90669, 56.94755],
                    [16.90634, 56.93567],
                    [16.90518, 56.93247],
                    [16.90076, 56.92028],
                    [16.88992, 56.90072],
                    [16.88407, 56.87552],
                    [16.8831, 56.84185],
                    [16.86719, 56.82234],
                    [16.81008, 56.79194],
                    [16.77853, 56.75851],
                    [16.76249, 56.73057],
                    [16.75469, 56.72502],
                    [16.72976, 56.64522],
                    [16.7028, 56.58227],
                    [16.65359, 56.54192],
                    [16.63178, 56.47331],
                    [16.61078, 56.43977],
                    [16.59233, 56.40481],
                    [16.59217, 56.40456],
                    [16.5503, 56.33724],
                    [16.54896, 56.33439],
                    [16.54481, 56.33447],
                    [16.54416, 56.33381],
                    [16.54332, 56.33247],
                    [16.54378, 56.33157],
                    [16.54198, 56.33024],
                    [16.53951, 56.3282],
                    [16.53833, 56.32642],
                    [16.53748, 56.32464],
                    [16.53617, 56.32358],
                    [16.53484, 56.32207],
                    [16.53402, 56.32162],
                    [16.53237, 56.32003],
                    [16.53121, 56.31869],
                    [16.5312, 56.31825],
                    [16.53038, 56.3178],
                    [16.52957, 56.31781],
                    [16.5294, 56.31719],
                    [16.52987, 56.31674],
                    [16.52903, 56.3154],
                    [16.52771, 56.3138],
                    [16.52653, 56.31202],
                    [16.52518, 56.30935],
                    [16.52435, 56.30846],
                    [16.52269, 56.30632],
                    [16.52086, 56.3041],
                    [16.51918, 56.30116],
                    [16.51882, 56.29982],
                    [16.5175, 56.29831],
                    [16.51618, 56.29716],
                    [16.51453, 56.2952],
                    [16.51367, 56.29316],
                    [16.51332, 56.29208],
                    [16.5125, 56.29119],
                    [16.5115, 56.29004],
                    [16.50985, 56.28826],
                    [16.50901, 56.28675],
                    [16.50804, 56.2855],
                    [16.50898, 56.25852],
                    [16.50085, 56.24537],
                    [16.48034, 56.22584],
                    [16.45494, 56.21334],
                    [16.42944, 56.19383],
                    [16.41432, 56.19251],
                    [16.40699, 56.20657],
                    [16.40037, 56.26695],
                    [16.40936, 56.30428],
                    [16.41386, 56.32301],
                    [16.40493, 56.39743],
                    [16.37792, 56.45229],
                    [16.37887, 56.51542],
                    [16.43594, 56.58952],
                    [16.43855, 56.59332],
                    [16.4535, 56.61508],
                    [16.47248, 56.64265],
                    [16.48286, 56.65382],
                    [16.50391, 56.69019],
                    [16.54966, 56.74764],
                    [16.55299, 56.75183],
                    [16.5869, 56.79428],
                    [16.60083, 56.81169],
                    [16.63238, 56.85077],
                    [16.66106, 56.87303],
                    [16.68432, 56.88129],
                    [16.70478, 56.87974],
                    [16.72272, 56.87961],
                    [16.76566, 56.95506],
                    [16.81324, 57.0052],
                    [16.89029, 57.09015],
                    [16.91178, 57.11943],
                    [16.92108, 57.17127],
                    [16.94001, 57.19917],
                    [16.95872, 57.21864],
                    [16.96306, 57.27472],
                    [16.9819, 57.297],
                    [17.01924, 57.32892],
                    [17.04305, 57.34271],
                    [17.07212, 57.35786],
                    [17.08245, 57.35636],
                    [17.09459, 57.33238]
                  ]
                ]
              ]
            },
            "properties": {
              "en": "Kalmar County",
              "id": 8,
              "sv": "Kalmar län",
              "code": "SWE_COUNTIES",
              "tovepolygon": true
            }
          }
        }
      ]
    },
    {
      "id": 8,
      "normalProbability": true,
      "event": {
        "sv": "Högt vattenstånd",
        "en": "High sea level",
        "code": "HIGH_SEALEVEL",
        "mhoClassification": {
          "sv": "Oceanografi",
          "en": "Oceanography",
          "code": "OCE"
        }
      },
      "descriptions": [],
      "warningAreas": [
        {
          "id": 57,
          "approximateStart": "2021-09-20T08:00:00.000Z",
          "approximateEnd": "2021-09-24T08:00:00.000Z",
          "published": "2021-09-20T08:51:42.240Z",
          "normalProbability": true,
          "warningLevel": { "sv": "Gul", "en": "Yellow", "code": "YELLOW" },
          "eventDescription": {
            "sv": "Högt vattenstånd",
            "en": "High sea level",
            "code": "HIGH_SEALEVEL"
          },
          "affectedAreas": [
            { "id": 13, "sv": "Hallands län", "en": "Halland County" }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Vad händer",
                "en": "What happens",
                "code": "HAPPENS"
              },
              "text": {
                "sv": "TEST Vattenståndet stiger under torsdag och kulminerar sent på kvällen mellan 90 och 110 cm. Främst i Apelviken kan vattenståndet bli något högre. Angiven nivå i RH 2000 motsvarar ca 85-115 cm över årets medelvattenstånd i detta område.",
                "en": "TEST The water level rises during Thursday and culminates late in the evening between 90 and 110 cm. Especially in Apelviken, the water level can be slightly higher. The stated level in RH 2000 corresponds to approximately 85-115 cm above this year's average water level in this area."
              }
            },
            {
              "title": {
                "sv": "Händelsebeskrivning",
                "en": "Description of incident",
                "code": "INCIDENT"
              },
              "text": {
                "sv": "TESTMEDDELANDE Risk för översvämningar längs kusten när vattenståndet stiger under torsdagen.",
                "en": "TEST PLEASE DISREGARD Risk of flooding along the coast when the water level rises on Thursday."
              }
            },
            {
              "title": {
                "sv": "Hur kan det påverka mig",
                "en": "What to expect",
                "code": "AFFECT"
              },
              "text": {
                "sv": "TEST Risk att lågt liggande kajer, bryggor, vägar eller byggnader översvämmas.\nDen segelfria höjden under broar minskar, och förtöjda båtar eller fartyg kan skadas.\nKänsliga kuststräckor kan utsättas för erosionsskador. \nI isbelagda områden kan skador uppstå på t.ex isvägar eller på byggnader och konstruktioner vid strandkanten. Att vistas på isen nära kusten är riskabelt.",
                "en": "TEST  Low lying wharfs, jetties, roads or buildings may be exposed to flooding.\nVertical clearance under brigdes decreases, and moored vessels may be damaged.\nVulnerable coastal areas may suffer damage from erosion\nIn sea ice covered areas, damage may occur on ice roads, buildings and constructions at the shoreline. Sea ice close to shore may not be not safe to walk on."
              }
            },
            {
              "title": {
                "sv": "Kommentar",
                "en": "Comments",
                "code": "COMMENTS"
              },
              "text": {
                "sv": "TEST Det finns osäkerheter i hur kraftig vinden kan bli över Kattegatt. Kraftigare vindar kan leda till att vattenståndet blir högre i de södra delarna.",
                "en": "TEST There are uncertainties in how strong the wind can be over the Kattegat. Stronger winds can lead to higher water levels in the southern parts."
              }
            },
            {
              "title": { "sv": "Var", "en": "Where", "code": "WHERE" },
              "text": {
                "sv": "TEST Från Varberg till Träslövsläge",
                "en": "TEST Från Varberg till Träslövsläge"
              }
            }
          ],
          "area": {
            "type": "Feature",
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [12.254904823582532, 57.06149848097417],
                [12.24023, 57.09664],
                [12.24096907473607, 57.10173140373737]
              ]
            }
          }
        }
      ]
    },
    {
      "id": 9,
      "normalProbability": true,
      "event": {
        "sv": "Höga temperaturer",
        "en": "High temperatures",
        "code": "HIGH_TEMPERATURES",
        "mhoClassification": {
          "sv": "Meteorologi",
          "en": "Meteorology",
          "code": "MET"
        }
      },
      "descriptions": [],
      "warningAreas": [
        {
          "id": 58,
          "approximateStart": "2021-09-20T08:00:00.000Z",
          "approximateEnd": "2021-09-24T08:00:00.000Z",
          "published": "2021-09-20T08:57:55.413Z",
          "normalProbability": true,
          "areaName": {
            "sv": "Östergötlands län, Södermanlands län, Örebro län",
            "en": "Östergötland County, Södermanland County, Örebro County"
          },
          "warningLevel": {
            "sv": "Meddelande",
            "en": "Message",
            "code": "MESSAGE"
          },
          "eventDescription": {
            "sv": "Höga temperaturer",
            "en": "High temperatures",
            "code": "HIGH_TEMPERATURES"
          },
          "affectedAreas": [
            { "id": 5, "sv": "Östergötlands län", "en": "Östergötland County" },
            { "id": 4, "sv": "Södermanlands län", "en": "Södermanland County" },
            { "id": 18, "sv": "Örebro län", "en": "Örebro County" }
          ],
          "descriptions": [
            {
              "title": {
                "sv": "Vad händer",
                "en": "What happens",
                "code": "HAPPENS"
              },
              "text": {
                "sv": "TEST Den maximala dagstemperaturen väntas bli 26 grader eller högre fram till början av nästa vecka.",
                "en": "TEST The maximum daytime temperature is expected to be 26 degrees or higher until the beginning of next week."
              }
            },
            {
              "title": {
                "sv": "Händelsebeskrivning",
                "en": "Description of incident",
                "code": "INCIDENT"
              },
              "text": {
                "sv": "TEST Under slutet av veckan strömmar varm luft in över södra Sverige. I östra Götaland och östra Svealand väntas höga dagstemperaturer under flera dagar framöver. Det kan ge ökad påfrestning på kroppen och problem för framför allt riskgrupper",
                "en": "TEST At the end of the week, warm air flows in over southern Sweden. In eastern Götaland and eastern Svealand, high daytime temperatures are expected for several days to come. It can cause increased strain on the body and problems, especially for risk groups"
              }
            },
            {
              "title": {
                "sv": "Hur kan det påverka mig",
                "en": "What to expect",
                "code": "AFFECT"
              },
              "text": {
                "sv": "TEST Stor ökad påfrestning på kroppen vilket kan ge problem för framförallt riskgrupper.",
                "en": "TEST Large increased stress on the body, which can cause problems, especially for risk groups."
              }
            },
            {
              "title": { "sv": "Var", "en": "Where", "code": "WHERE" },
              "text": {
                "sv": "TEST Södra delarna av Örebro- och Södermanlandslän samt norra delen av Östergötlandslän.",
                "en": "TEST The southern parts of Örebro and Södermanland counties and the northern part of Östergötland counties."
              }
            }
          ],
          "area": {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [15.205078, 59.023595],
                  [15.776367, 58.596887],
                  [16.237793, 59.080094],
                  [15.205078, 59.023595]
                ]
              ]
            }
          }
        }
      ]
    }
  ]