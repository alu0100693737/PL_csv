"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
$(document).ready(function() {
// Cambiar los símbolos <% %> de underScore por los simbolos {{ }}
// para que no creen conflictos con express.js
_.templateSettings = {
evaluate : /\{\{([\s\S]+?)\}\}/g,
interpolate : /\{\{=([\s\S]+?)\}\}/g,
escape : /\{\{-([\s\S]+?)\}\}/g
};
$("button").click(function() {
calculateN ();
});
});
function calculateN () {
var original = document.getElementById("original");
var temp = original.value;
var linesI = temp.split(/\n+\s*/);
var lines = JSON.stringify(linesI);
if (window.localStorage) localStorage.original = temp;
$.ajax({
url: '/ajaxEx/'+ lines +'/',
type: 'GET',
async: false,
cache: false,
timeout: 30000,
dataType: 'JSON',
success: function (data) {
$('body').append(data);
render(data);
}
});
}
window.onload = function() {
// If the browser supports localStorage and we have some stored data
if (window.localStorage && localStorage.original) {
document.getElementById("original").value = localStorage.original;
}
};
function render(rows){
var resultTemplate = document.getElementById("resultTemplate").innerHTML;
$('#finaltable').html( _.template(resultTemplate, { rows: rows }));
}