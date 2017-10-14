let statements = [
  'Your mind is always buzzing with unexplored ideas and plans.',
  'Generally speaking, you rely more on your experience than your imagination.',
  'You find it easy to stay relaxed and focused even when there is some pressure.',
  'You rarely do something just out of sheer curiosity.',
  'People can rarely upset you.',
  'It is often difficult for you to relate to other people’s feelings.',
  'In a discussion, truth should be more important than people’s sensitivities.',
  'You rarely get carried away by fantasies and ideas.',
  'You think that everyone’s views should be respected regardless of whether they are supported by facts or not.',
  'You feel more energetic after spending time with a group of people.'
];

$(document).ready(function () {
  for (let i = 0; i < statements.length; i++) {
    $('#questionnaire').append(createSelect(`${i+1}`, statements[i], 5));
  }
});

let createSelect = function (idNum, question, optNum) {
  let $li = $('<li>').addClass('list-group-item list-group-item form-group');
  $li.html(`<label for="q${idNum}"> ${idNum}. ${question}</label>`);

  let $select = $('<select>').addClass('form-control').attr('id', `q${idNum}`);
  $select.html(`<option value='' disabled selected>Select an option</option>`);
  for (let i = 0; i < optNum; i++) {
    if (i === 0) {
      $select.append(`<option value='${i+1}'>${i+1} (Strongly Disagree)</option>`);
    } else if (i === optNum - 1) {
      $select.append(`<option value='${i+1}'>${i+1} (Strongly Agree)</option>`);
    } else {
      $select.append(`<option>${i+1}</option>`);
    }
  }

  $li.append($select);
  return $li;
};

$(".submit").on("click", function(event) {
  event.preventDefault();

  if (validateForm()) {
    let scores = [];
    for (let i = 0; i < statements.length; i++) {
      scores.push($(`#q${i+1}`).val());
    }
     
    let newFriend = {
      name: $('#name').val().trim(),
      photo: $('#photo').val().trim(),
      scores: scores
    };

    $.post('/api/friends', newFriend,
    function(data) {
      $('#modal-title').html('<h2>Best Match!</h2>');
      $('#modal-body').html(`<h3 class="text-center">${data.name}</h3>`);
      $('#modal-body').append(`<img class="img-responsive center-block" src="${data.photo}">`);
    });
  } else {
    $('#modal-title').html('<h2>Error</h2>');
    $('#modal-body').html('<h3>All fields must be filled.</h3>');
  }

});

let validateForm = function () {
  if ($('#name').val().trim() === '' || $('#photo').val().trim() === '') return false; 

  for (let i = 0; i < statements.length; i++) {
    if ($(`#q${i+1}`).val() === null) return false;
  }

  return true;
};

