Stripe.setPublishableKey('pk_test_LTr6gQDMbMAcaJRzahfFGi9N');
// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  
  // Hide errors on page load
  $('#form-errors').hide();
  
  
  $('#product-form').on('submit', function() {
    
    // Hide errors on submission
    $('#form-errors').hide();
    
    Stripe.card.createToken({
      number : $('#card-number').val(),
      cvc : $('#cvv').val(),
      exp_month : $('#expiry-month').val(),
      exp_year : $('#expiry-year').val()
    }, 
    stripeResponseHandler);
    
    // Disable the submit button to prevent multiple submissions
    $('#submit-button').prop('disabled', true);
    
  });
  
  function stripeResponseHandler(status, response) {
    var $form = $('#product-form');
  
    if (response.error) {
      // Show the errors on the form
      $('#form-errors').show();
      $('#form-errors').html(response.error.message);
      //Reenable the submission button
      $('#submit-button').prop('disabled', false);
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      $form.get(0).submit();
    }
  };
  
  
  
});

