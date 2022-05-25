const AllCardsTemp = [
  {Isback: true, Id:0, Name:"test", Ability:"Throw an apple", Rareness:"Common", Info:"*", Img:""},
  {Isback: false, Id:1, Name:"test2", Ability:"Throw an apple", Rareness:"Common", Info:"*", Img:"Imgs/test.png"},
  {Isback: false, Id:2, Name:"test3", Ability:"Throw 2 apples", Rareness:"Common", Info:"*", Img:"Imgs/test1.png"},
  {Isback: true, Id:3, Name:"test4", Ability:"Throw a stack of apples", Rareness:"UnCommon", Info:"**", Img:""},
  {Isback: false, Id:4, Name:"test5", Ability:"Throw a stack of apples", Rareness:"UnCommon", Info:"**", Img:"Imgs/bill cipher.gif"},
  {Isback: false, Id:5, Name:"test6", Ability:"Throw 2 stacks of apples", Rareness:"UnCommon", Info:"**", Img:"Imgs/bill cipher wheel.PNG"},
  {Isback: true, Id:6, Name:"test7", Ability:"Throw a tower of apples", Rareness:"Rare", Info:"***", Img:""},
  {Isback: false, Id:7, Name:"test8", Ability:"Throw a tower of apples", Rareness:"Rare", Info:"***", Img:""},
  {Isback: false, Id:8, Name:"test9", Ability:"Throw 2 towers of apples", Rareness:"Rare", Info:"***", Img:""}
];
function GetAllCardsJson(){
  var AllCards = JSON.stringify(AllCardsTemp);
  return AllCards;
}