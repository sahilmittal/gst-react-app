export const highlighText = (str, highlightString) => {
  let find = highlightString 
  let replace = '<span class=\'highlight\'>'+highlightString+'</span>' 
  return replaceAll(str, find, replace)
}

const replaceAll = (str, find, replace) => {
  var re = new RegExp(find, 'gi');
  return str.replace(re, replace);
}