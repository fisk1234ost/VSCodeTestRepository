/*Cards*/
//Load all cards from Json
function AddAllCards(Json){
  var AllCards = JSON.parse(Json);
  Array.prototype.forEach.call(AllCards, function(element) {
    AddCard(element.Isback, element.Id, element.Name, element.Ability, element.Rareness, element.Info, element.Img);
  });
}
//add card to page 
function AddCard(IsBack = false, Id = 0, Name = "", Ability = "", Rareness = "", Info = "", Img = ""){
  var cardGroup = document.getElementsByClassName("Cards "+ Rareness);
  if (cardGroup){
    var newCard = "";
    if (IsBack) {
      newCard += "<article class=\"Card "+Rareness+" Back\" id=\" "+Id+"\"  onclick=\"FlipCard(this.id)\">";
    } else {
      newCard += "<article class=\"Card "+Rareness+"\" id=\" "+Id+"\"  onclick=\"FlipCard(this.id)\">";
    }
    newCard += "<div class=\"circle\">"
        +"<div class=\"deg45\">"
        +"</div>"
      +"</div>"
      +"<div class=\"top\">"
        +"<p class=\"name\">"
          +Name
        +"</p>"
        +"<p>"
          +Info
        +"</p>"
      +"</div>";
      if (Img) {
        newCard += "<img class=\"Img\" src=\""+Img+"\"></img>";
      }
      else{
        newCard += "<div class=\"Img\"></div>";
      }
      newCard += "<div class=\"Ability\">"
        +"<p class=\"AbilityText\">"
          +Ability
        +"</p>"
        +"<p class=\"ID\">"
          +Id
        +"</p>"
      +"</div>"
    +"</article>";
    cardGroup[0].innerHTML += newCard;
    UpdateWidth(window.innerWidth, cardGroup[0])
  }
}
//flip Card by id
function FlipCard(id) {
  document.getElementById(id).classList.toggle("Back");
}

/*fix width*/
//calculate width
function UpdateWidth(Width, Cards) {
  var WidthRem = convertPixelsToRem(Width) - 4;
  var maxWidth = Math.floor((WidthRem) / 19);
  var count = Cards.getElementsByClassName("card").length;
  Cards.style.width = (Math.min(maxWidth, count) * 19) + "rem";
}
function UpdateWidths(Width) {
  var Cards = document.getElementsByClassName("Cards");
  Array.prototype.forEach.call(Cards, function(element) {
    UpdateWidth(Width, element);
  });
}
//listen for window resize event
window.addEventListener('resize', function(event){
  UpdateWidths(window.innerWidth);
});

/*run on page Load*/
//Add cards
var JsonCards = GetAllCardsJson();
AddAllCards(JsonCards);
//fixes width
//UpdateWidths(window.innerWidth);