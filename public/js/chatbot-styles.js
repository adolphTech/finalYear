    $(document).ready(function() {
        window.addEventListener('dfMessengerLoaded', function (event) {
            $r1 = document.querySelector("df-messenger");
            $r2 = $r1.shadowRoot.querySelector("df-messenger-chat");
            $r3 = $r2.shadowRoot.querySelector("df-messenger-user-input");
            var sheet = new CSSStyleSheet;
            // manage box height and width from here
           sheet.replaceSync(`
  div.chat-wrapper[opened="true"] {
    height: 385px;
    width: 54%;
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

            $r2.shadowRoot.adoptedStyleSheets = [ sheet ];
        });
    });





