import { Observable, Http } from '@nativescript/core'
var getRequests = require("./shared/apiUrls");

// returns message
function getMessage(message) {
  var sentence = "ID: " + message.id + "\n Value: " + message.cost + "\n weight: " + message.weight + "\n fragile?: " + message.fragile + "\n quantity: " + message.quantity ;
  return sentence;
}

export function createViewModel() {
  const viewModel = new Observable()

  viewModel.onGet = () => {
    Http.getJSON(getRequests.apiGETRequest).then(result => {
      console.log(result);
      viewModel.set('message', getMessage(result));
    }, error => {
      console.log(error);
    });
  }

  viewModel.onPost = () => {
    Http.request({
      url: getRequests.apiPOSTRequest,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        Cost: 90,
        Weight: 39,
        Fragile: false,
        Quantity: 6465,
      }),
    }).then(response => {
      var result = response.content.toJSON();
      console.log(result)
      viewModel.set('message', getMessage(result));
    }, error => { 
        console.error(error);
    });
  }

  viewModel.onPut = () => {
    Http.request({
      url: getRequests.apiPUTRequest,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        Id: 5,
        Cost: 23,
        Weight: 11,
        Fragile: false,
        Quantity: 55,
      }),
    }).then(response => {
      var result = response.content.toJSON();
      console.log(result)
      viewModel.set('message', result.result);
    }, error => { 
        console.error(error);
    });
  }

  viewModel.onDelete = () => {
    Http.request({
      url: getRequests.apiDELETERequest,
      method: "DELETE"
    }).then(response => {
      var result = response.content.toJSON();
      console.log(result)
      viewModel.set('message', result.result);
    }, error => { 
        console.error(error);
    });  }

  return viewModel
}

