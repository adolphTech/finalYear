    $(document).ready(function() {
        window.addEventListener('dfMessengerLoaded', function(event) {
            $r1 = document.querySelector("df-messenger");
            $r2 = $r1.shadowRoot.querySelector("df-messenger-chat");
            $r3 = $r2.shadowRoot.querySelector("df-messenger-user-input");
            var sheet = new CSSStyleSheet;
            // manage box height and width from here
            sheet.replaceSync(`
  div.chat-wrapper[opened="true"] {
    height: 385px;
    width: 35%;
    margin-right: 300px;
    
  }
  div.df-messenger-toggler {
    display: none !important;
  }
  @media (max-width: 767px) {
    div.chat-wrapper[opened="true"] {
      height: 75%;
      width: 90%;
      margin-right:30px;
      margin-bottom:5%;
    }
  }
`);

            $r2.shadowRoot.adoptedStyleSheets = [sheet];
        });
    });




    function searchFunction() {
        // Get the search query from the input field
        var input = document.getElementById("search");
        var query = input.value.toLowerCase();

        // Clear the previous search results
        var list = document.querySelector("#results ul");
        list.innerHTML = '';

        // Make a request to the API
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:3000/chat/symptoms', true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                // Parse the response into JSON
                var response = JSON.parse(this.response);
                // Filter the symptoms that match the search query
                var filteredSymptoms = response.filter(function(symptom) {
                    return symptom.Name.toLowerCase().includes(query);
                });
                // Add the filtered symptoms to the dropdown menu
                filteredSymptoms.forEach(function(symptom) {
                    var li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.textContent = symptom.Name;
                    list.appendChild(li);
                });
                // Show the results card if there are search results
                var resultsCard = document.getElementById("results");
                if (filteredSymptoms.length > 0) {
                    resultsCard.classList.remove("d-none");
                } else {
                    resultsCard.classList.add("d-none");
                }
            }
        };
        request.send();
    }