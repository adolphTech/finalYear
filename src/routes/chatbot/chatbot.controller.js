const CryptoJS = require("crypto-js");
const axios = require("axios");
const { WebhookClient } = require("dialogflow-fulfillment");
const {
  Card,
  Suggestion,
  RichResponse,
  Payload,
} = require("dialogflow-fulfillment");
require("dotenv").config();

const uri = process.env.API_MEDIC_AUTH_LINK;
const secret_key = process.env.API_MEDIC_SECRET_KEY;
const api_key = process.env.API_MEDIC_API_KEY;

const agentId = process.env.DIALOGFLOW_AGENT_ID;

var computedHash = CryptoJS.HmacMD5(uri, secret_key);

var computedHashString = computedHash.toString(CryptoJS.enc.Base64);
let username = "";
async function httpRenderChatbot(req, res) {
  try {
    res.render("chatbot.hbs", { agentId });

    username = req.user.name;
  } catch (e) {
    res.status(500).send(e);
  }
}

async function httpDialogflowFullfilment(request, response) {
  const agent = new WebhookClient({ request, response });

  function welcome(agent) {
    agent.add(``);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  async function getSymptoms(agent) {
    const userInputArr = agent.parameters.symptomInput;

    const userInput = userInputArr[0].split(","); //addedto split

    let symptomsArray = [];
    let selectedSymptomsIdArray = [];
    let search = (array, value) => {
      return array.find((object) => object.Name === value);
    };
    const symptoms = process.env.API_MEDIC_SYMPTOMS_URL;

    // function to return token
    async function getToken() {
      try {
        const responseTok = await axios.post(
          uri,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${api_key}:${computedHashString}`,
            },
          }
        );
        return responseTok.data.Token;
      } catch (e) {
        console.log("token error");
        throw e;
      }
    }

    try {
      const auth = await getToken();
      const response = await axios.get(symptoms, {
        params: { token: auth, language: "en-gb" },
      });
      const apiSymptomsArray = response.data;

      apiSymptomsArray.forEach((element) => {
        symptomsArray.push(element.Name.toLowerCase());
      });

      for (const symptom of userInput) {
        if (!symptomsArray.includes(symptom)) {
          throw new Error(
            // TODO :CREATE LINKTO VALID SYMPTOMS
            `${symptom} not found in the list of symptoms please click here to check valid symptoms`
            
          );
        }
      }

      // proceed with next API call
      userInput.forEach((element) => {
        const value = element;
        const valueUppercase = value.charAt(0).toUpperCase() + value.slice(1);
        const symptomId = search(apiSymptomsArray, `${valueUppercase}`);
        selectedSymptomsIdArray.push(symptomId.ID);
      });

      console.log(selectedSymptomsIdArray);

      const diagnosisUrl = process.env.API_MEDIC_DIAGNOSIS_URL;
      const selectedSymptomsArrayString = JSON.stringify(
        selectedSymptomsIdArray
      );
      const responseDiagnosis = await axios.get(diagnosisUrl, {
        params: {
          token: auth,
          language: "en-gb",
          format: "json",
          symptoms: selectedSymptomsArrayString,
          gender: "male",
          year_of_birth: 2000,
        },
      });
      // console.log(responseDiagnosis.data);
      // TODO : MAKE THE  DISEASE IN A CARD
      // let ugonjwa ;
      let issueArray = [];

      // const diagnosisArray = responseDiagnosis.data[0].Issue.Name;
      const diagnosisArray = responseDiagnosis.data;
      diagnosisArray.forEach((diag) => {
        issueArray.push(diag.Issue);
      });

      // console.log(issueArray)
      if (issueArray.length === 0) {
        agent.add(
          `I'm sorry ${username},but the symptoms you entered don't much any disease in my database, please see a doctor`
        );
        const payload = {
          richContent: [
            [
              {
                type: "chips",
                options: [
                  {
                    text: "See valid symptoms",
                  },
                ],
              },
            ],
          ],
        };
        return agent.add(
          new Payload(agent.UNSPECIFIED, payload, {
            rawPayload: true,
            sendAsMessage: true,
          })
        );
      } else if (issueArray.length > 5) {
        issueArray = issueArray.slice(0, 1);

        

        issueArray.forEach((issue) => {
          let payload = {
            richContent: [
              [
                {
                  type: "description",
                  title: issue.Name,
                  text: [
                    
                    `Hey ${username} you are mostly likely to be having ${issue.Name} please see a Doctor for further medication`,
                    `Accuracy: ${issue.Accuracy}`,
                    `Disease Professional name: ${issue.ProfName}`,
                  ],
                },
              ],
            ],
          };
  
          return agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true,sendAsMessage: true,}));
        
        });

       

      
        // return agent.add(issue)
      } else {
        console.log(issueArray);
        issueArray.forEach((issue) => {
          let payload = {
            richContent: [
              [
                {
                  type: "description",
                  title: issue.Name,
                  text: [
                    `Hey ${username}  you are mostly likely to be  having ${issue.Name} please see a Doctor for further medication`,
                    `Accuracy : ${issue.Accuracy}`,
                    `Disease Proffesional name : ${issue.ProfName}`,
                  ],
                },
              ],
            ],
          };

          return agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
              rawPayload: true,
              sendAsMessage: true,
            })
          );
        });
      }

      //  return agent.add( "ugonjwa");
    } catch (e) {
      console.log(e);
      // agent.add(`${e}`);
      const payload = {

      
          "richContent": [
            [
              {
                "type": "chips",
                "options": [
                  {
                    "text": `${e}`,
                    "link": "https://example.com"
                  },
                ]
              }
            ]
          ]
        
        
      
          };
         return agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
    

    }
  }

  function diagnosisHandler(agent) {
    agent.add(`should i ask you some questions`);
    //  agent.setFollowupEvent('diagnosis-yes');
  }

  function diagnosisAgeHandler(agent) {
    agent.add(`How old are you ?`);
  }

  // function yesNoHandler(agent){
  //   agent.add(`which one u want`);
  //   const payload = {

  //     "richContent":[
  //       [
  //         {
  //           "type": "button",
  //           "icon": {
  //             "type": "chevron_right",
  //             "color": "#FF9800"
  //           },
  //           "text": "Button text",
  //           "link": "https://example.com",
  //           "event": {
  //             "name": "",
  //             "languageCode": "",
  //             "parameters": {}
  //           }
  //         }
  //       ]

  //     ]

  //   };
  //   agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
  // }

  function yesNoHandler(agent) {
    // agent.add(`which one u want`);
    const payload = {
      richContent: [
        [
          {
            type: "chips",
            options: [
              {
                text: "Yes",
              },
              {
                text: "No",
              },
            ],
          },
        ],
      ],
    };
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  }

  function welcome(agent) {
    agent.add(
      `Hello ${username}, i am your medical Bot are you having any symptoms ?`
    );
    const payload = {
      richContent: [
        [
          {
            type: "chips",
            options: [
              {
                text: "Yes",
              },
              {
                text: "No",
              },
            ],
          },
        ],
      ],
    };
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  }

  // if user says YES
  function yesWelcomeInputSymptoms(agent) {
    agent.add("Please input all your symptoms separated by a comma");
  }
  // IF USER SAYS NO
  function noWelcome(agent) {
    agent.add(
      `Thank you, ${username},for now i can only help with symptoms have a nice day`
    );
    const payload = {
      richContent: [
        [
          {
            type: "chips",
            options: [
              {
                text: "Yes I have symptoms",
              },
            ],
          },
        ],
      ],
    };
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  }

  // TODO: TESTING TU

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);

  intentMap.set("yesNo", yesNoHandler);

  intentMap.set("followupForYesAfterWelcome", yesWelcomeInputSymptoms);
  // intentMap.set("symptomsIntent-followUp",getSymptoms)

  intentMap.set("Default Welcome Intent - no", noWelcome);

  //symptoms
  intentMap.set("symptom-dev", getSymptoms);

  // dev
  intentMap.set("diagnosis", diagnosisHandler);
  intentMap.set("diagnosis - yes", diagnosisAgeHandler);

  //dev--button
  intentMap.set("button", welcome);

  agent.handleRequest(intentMap);
}

module.exports = { httpRenderChatbot, httpDialogflowFullfilment };
