function doCrypt(isDecrypt) {

  var key = filterKey(document.getElementById("key_input").value);
  if (isDecrypt) {
		for (var i = 0; i < key.length; i++)
			key[i] = (26 - key[i]) % 26;
	var textElem = document.getElementById("enc_message").value;
	textElem = crypt(textElem, key);
  document.getElementById("message").value = textElem;
  if (document.getElementById("enc_message").value.length == 0) {
	  	alert("No message to decrypt");
  		return;
	 }
  }

  else{
    if (document.getElementById("message").value.length == 0) {
	  	alert("No message to encrypt");
  		return;
	 }
   if (document.getElementById("key_input").value.length == 0) {
	 	 alert("Key is empty");
		 return;
	 }
	 if (key.length == 0) {
  		alert("Key has no letters");
		 return;
	 }
	var textElem = document.getElementById("message").value;
	textElem = crypt(textElem, key);
  document.getElementById("enc_message").value = textElem;
  }

  }

/*
 * Returns the result the VigenÃ¨re encryption on the given text with the given key.
 */
function crypt(input, key) {
	var output = "";
	for (var i = 0, j = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isUppercase(c)) {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			j++;
		} else if (isLowercase(c)) {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		} else if (c==32){
      output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
    }
    else {
			output += input.charAt(i);
		}
	}
	return output;
}

/*
 * Returns an array of numbers, each in the range [0, 26), representing the given key. The key is case-insensitive, and non-letters are ignored.
 * Examples:
 *   filterKey("AAA") = [0, 0, 0]
 *   filterKey("abc") = [0, 1, 2]
 *   filterKey("the $123# EHT") = [19, 7, 4, 4, 7, 19]
 */
function filterKey(key) {
	var result = [];
	for (var i = 0; i < key.length; i++) {
		var c = key.charCodeAt(i);
		if (isLetter(c)){
			result.push((c - 65) % 32);
    }
	}
	return result;
}
 //basically it checks all the cases of uppercase and lowercase.
// Tests whether the specified character code is a letter.
function isLetter(c) {
	return isUppercase(c) || isLowercase(c) || c==32;
}

// Tests whether the specified character code is an uppercase letter.
function isUppercase(c) {
	return c >= 65 && c <= 90;  // 65 is the character code for 'A'. 90 is for 'Z'.
}

// Tests whether the specified character code is a lowercase letter.
function isLowercase(c) {
	return c >= 97 && c <= 122;  // 97 is the character code for 'a'. 122 is for 'z'.
}
//Function to input the random key .
document.getElementById("encrypt_button2").onclick = function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var numberofchar = Math.floor(Math.random() * 40) + 10;
    for(var i=0;i<numberofchar;i++)
    {
      text+= possible.charAt(Math.floor(Math.random() * possible.length));
    }
    document.getElementById("key_input").value = text;
}
