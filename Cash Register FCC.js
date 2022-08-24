function checkCashRegister(price, cash, cid) {
    let result = {
      status : undefined,
      change : []
    };
    
    // currency units
    let currency = [
      ["PENNY", 0.01], 
      ["NICKEL", 0.05], 
      ["DIME", 0.1], 
      ["QUARTER", 0.25], 
      ["ONE", 1], 
      ["FIVE", 5], 
      ["TEN", 10], 
      ["TWENTY", 20], 
      ["ONE HUNDRED", 100]
      ];
    
    // total of cash-in-drawer
    let cidTotalAmount = 0;
    for (let i = 0; i < cid.length; i++) {
      cidTotalAmount += cid[i][1];
    };
    
    // cash to pay back
    let changeDue = cash - price;
    
    // change in coins and bills, from highest to lowest value
    let changeDueInCash = [];
    
    // when cash-in-drawer is equal to the changeDue
    if( changeDue === cidTotalAmount ) {
      result.status = "CLOSED";
      result.change = cid;
      return result;
    };
    
    // when cash-in-drawer is less than the change due
    if ( cidTotalAmount < changeDue ) {
          return {
      status : "INSUFFICIENT_FUNDS",
      change : []
        };
      };
   
    // function to calculate how many bills or coins
    function numOfBillsOrCoins(i) {
      if( cid[i][1] >= Math.floor(changeDue / currency[i][1]) * currency[i][1] ) {
        return Math.floor(changeDue / currency[i][1]);
      } else {
        return Math.floor(cid[i][1] / currency[i][1]);;
      };
    };
  
    // iterate through cid, from end to start of the array, going through all the different currency
    for (let i = 7; i >= 0; i--) {
      // currency[7] ["TWENTY", 20]
      if( changeDue - currency[i][1] >= 0 && i === 7) {
        let numberOfCoinsOrBills = numOfBillsOrCoins(i)
        changeDueInCash.push([currency[i][0], currency[i][1] * numberOfCoinsOrBills]);
        changeDue -= currency[i][1] * numberOfCoinsOrBills;
        };
        
      // currency[6] ["TEN", 10]
      if( changeDue - currency[i][1] >= 0 && i === 6) {
        let numberOfCoinsOrBills = numOfBillsOrCoins(i)
        changeDueInCash.push([currency[i][0], currency[i][1] * numberOfCoinsOrBills]);
        changeDue -= currency[i][1] * numberOfCoinsOrBills;
        };
        
      // currency[5] ["FIVE", 5]
      if( changeDue - currency[i][1] >= 0 && i === 5) {
        let numberOfCoinsOrBills = numOfBillsOrCoins(i)
        changeDueInCash.push([currency[i][0], currency[i][1] * numberOfCoinsOrBills]);
        changeDue -= currency[i][1] * numberOfCoinsOrBills;
        };
  
      // currency[4] ["ONE", 1]
      if( changeDue - currency[i][1] >= 0 && i === 4) {
        let numberOfCoinsOrBills = numOfBillsOrCoins(i)
        changeDueInCash.push([currency[i][0], currency[i][1] * numberOfCoinsOrBills]);
        changeDue -= currency[i][1] * numberOfCoinsOrBills;
        };
  
      // currency[3] ["QUARTER", 0.25]
      if( changeDue - currency[i][1] >= 0 && i === 3) {
        let numberOfCoinsOrBills = numOfBillsOrCoins(i)
        changeDueInCash.push([currency[i][0], currency[i][1] * numberOfCoinsOrBills]);
        changeDue -= currency[i][1] * numberOfCoinsOrBills;
        };
  
      // currency[2] ["DIME", 0.1]
      if( changeDue - currency[i][1] >= 0 && i === 2) {
        let numberOfCoinsOrBills = numOfBillsOrCoins(i)
        changeDueInCash.push([currency[i][0], currency[i][1] * numberOfCoinsOrBills]);
        changeDue -= currency[i][1] * numberOfCoinsOrBills;
        };
  
      // currency[1] ["NICKEL", 0.05]
      if( changeDue - currency[i][1] >= 0 && i === 1) {
        let numberOfCoinsOrBills = numOfBillsOrCoins(i)
        changeDueInCash.push([currency[i][0], currency[i][1] * numberOfCoinsOrBills]);
        changeDue -= currency[i][1] * numberOfCoinsOrBills;
        };
  
      // currency[0] ["PENNY", 0.01]
      if( changeDue - currency[i][1] >= 0 && i === 0) {
        let numberOfCoinsOrBills = numOfBillsOrCoins(i) + 1
        changeDueInCash.push([currency[i][0], currency[i][1] * numberOfCoinsOrBills]);
        changeDue -= currency[i][1] * numberOfCoinsOrBills;
        };
      
      // when exact change cannot be returned
      if( i === 0 && changeDue > 0) {
        return {
      status : "INSUFFICIENT_FUNDS",
      change : []
        };
      };
    };
  
   result.status = "OPEN";
   result.change = changeDueInCash;
   return result;
  };


/*

Cash Register
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
Tests
Passed:checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.
Passed:checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
Passed:checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
Passed:checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
Passed:checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
Passed:checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

*/