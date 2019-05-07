'use strict';

const store = {
  input: 3
};

function getDogImages() {
  console.log(`https://dog.ceo/api/breeds/image/random/${store.input}`);
  fetch(`https://dog.ceo/api/breeds/image/random/${store.input}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  let htmlStr = '';
  responseJson.message.map(src => {
    htmlStr += `<img src="${src}" class="results-img">`;
  });
  $('.img-container').html(
    htmlStr
  );
  console.log('rendering');
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let input = $('.pic-number-input').val();
    verifyInput(input);
  });
}

function verifyInput(input) {
  console.log('Verifying');
  try {
    if (input < 1 || input > 50) {
      throw 'Input must be between 1 and 50';
    }
  } catch(error) {
    console.log('error');
    alert(error);
    throw error;
  }
  store.input = input;
  getDogImages();
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});