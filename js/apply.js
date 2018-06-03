var ref;
var conversationalForm

window.onload = function() {
    $( "#signup" ).sisyphus();
    console.log("Form data saved.");

    // disable autocomplete completely
    $("input, select, textarea").on("focus click", function() {
      $(this).attr("autocomplete", "new-" + Math.random().toString(36).replace(/[^a-z]+/g, ''));
    });

    // check referral
    checkRef();
};

function checkRef() {
  let urlRef = getParam('ref');
  if (urlRef != null && urlRef !== "" && urlRef !== "null" && urlRef != undefined) Cookies.set('ref', urlRef, { expires: 180 });
  let cookieRef = Cookies.get('ref');
  if (cookieRef != null && cookieRef != "" && cookieRef != "null" && cookieRef != undefined) {
    $("#ref-fill").html('<label class="desc">Referred by '+ cookieRef +'</span><br/><input type="hidden" name="REF" id="refcode">');
    $("#refcode").val(cookieRef);
  } else {
    $("#ref-fill").html('<label for="refcode">Who did you hear about Hack Chicago from? <span class="desc">First and last name</span></label><input type="text" id="REF" name="REF" cf-questions="Just by chance, who told you about Hack Chicago? Simply reply with their full name.<br />If you were not referred by anyone, simply reply “no”."/>');
  }
}

var emailCheck = function(dto, success, error){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(dto.text.toLowerCase()))
  return success();
  return error();
};

// get parameter
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
