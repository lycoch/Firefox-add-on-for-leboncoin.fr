// @name         Leboncoin (saver)
// @description  Userscript pour enregistrer une annonce Leboncoin
// @author       Max1Truc

function modifyDOM() {
  function getAllElementsWithThisInnerTextValue(value) {
    var all = document.getElementsByTagName("*");
    var list = [];
    for (let x in all) {
      if (all[x].innerText == value) {
        list.push(all[x]);
      }
    }

    return list;
  }

  function getAllElementsWithAttributeValue(attribute, value) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
      if (allElements[i].getAttribute(attribute) == value) {
        matchingElements.push(allElements[i]);
      }
    }
    return matchingElements;
  }

  var modifyButton = getAllElementsWithThisInnerTextValue("Modifier l'annonce")[0];
  var modifyButtonText = getAllElementsWithThisInnerTextValue("Modifier l'annonce")[2];
  modifyButtonText.setAttribute("class", "");
  modifyButtonText.style.color = "green";
  modifyButton.removeAttribute("href");

  modifyButton.addEventListener("click", () => {
    var title = document.getElementsByClassName("_1KQme")[0].innerText,
      description = getAllElementsWithAttributeValue("data-qa-id", "adview_description_container")[0].children[0].innerText,
      price = document.getElementsByClassName("_1F5u3")[0].innerText;
    localStorage.setItem("save", JSON.stringify({title, description, price}));
  });
}

setInterval(modifyDOM, 500);