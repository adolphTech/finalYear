const CryptoJS = require("crypto-js");
const axios = require("axios");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion, RichResponse,Payload } = require("dialogflow-fulfillment");
require("dotenv").config()

const uri = process.env.API_MEDIC_AUTH_LINK;
const secret_key = process.env.API_MEDIC_SECRET_KEY;
const api_key = process.env.API_MEDIC_API_KEY;

const agentId = process.env.DIALOGFLOW_AGENT_ID

var computedHash = CryptoJS.HmacMD5(uri, secret_key);

var computedHashString = computedHash.toString(CryptoJS.enc.Base64);

async function httpRenderChatbot(req,res){
    try{
        res.render("chatbot",{agentId})


    }catch(e){
        res.status(500).send(e)
    } 
}

async function httpDialogflowFullfilment(request,response){

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
            `${symptom} not found in the list of symptoms please click <a href="me.com"></a>here to check`
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
      let issueObj = {};
      let issueArray = [];

      const diagnosisArray = responseDiagnosis.data[0].Issue.Name;
      const diagnosisArray2 = responseDiagnosis.data;
      diagnosisArray2.forEach((diag) => {
        console.log(diag.Issue.Name);
      });
      // issueArray.push(issueObj)
      // console.log(issueArray)
       return agent.add(diagnosisArray);
      
    } catch (e) {
      // console.log(e);
      
      return agent.add(`${e}`);
      
    }
  }

  function diagnosisHandler(agent) {
    agent.add(`should i ask you some questions`);
    //  agent.setFollowupEvent('diagnosis-yes');
  }

  function diagnosisAgeHandler(agent) {
    agent.add(`How old are you ?`);
  }

  function yesNoHandler(agent){
    agent.add(`which one u want`);
    const payload = {
     
      "richContent":[
        [
          {
            "type": "button",
            "icon": {
              "type": "chevron_right",
              "color": "#FF9800"
            },
            "text": "Button text",
            "link": "https://example.com",
            "event": {
              "name": "",
              "languageCode": "",
              "parameters": {}
            }
          }
        ]

      ]
     
    };
    agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
  }

  function welcome(agent) {
    agent.add(
      "Hello John Doe, i am your medical Bot are you having any symptoms ?"
    );
  }

  function yesWelcome(agent){
    agent.add("Please input all your symptoms separated by a comma")
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);

  intentMap.set("yesNo", yesNoHandler);
  intentMap.set("Default Welcome Intent - yes",yesWelcome)


  //symptoms
  intentMap.set("symptom-dev", getSymptoms);

  // dev
  intentMap.set("diagnosis", diagnosisHandler);
  intentMap.set("diagnosis - yes", diagnosisAgeHandler);

  //dev--button
  intentMap.set("button", welcome);

  agent.handleRequest(intentMap);
}





module.exports = {httpRenderChatbot,httpDialogflowFullfilment}