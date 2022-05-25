//rem pixel converter
function convertRemToPixels(rem) {    
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
function convertPixelsToRem(pixels) {
  return pixels / parseFloat(getComputedStyle(document.documentElement).fontSize);
}