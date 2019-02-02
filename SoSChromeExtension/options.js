$( document ).ready(function() {
  let budgetForm = $('#budget-form');
  let budgetAmt = $('#inlineFormInputGroup');
      budgetForm.submit(function(e) {
        e.preventDefault();
        console.log(budgetAmt.val());
        //stored as int
        let budget = parseInt(budgetAmt.val());
        chrome.storage.sync.set({budget: budget}, function() {
          console.log('budget has been set to: ' + budget.toString());
        })
      });
  });
