'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAcc;
let transferAcc;
let balancee

let updateValue=function(){
  displayMovements(currentAcc.movements)
  calcPrintbalance(currentAcc)
  displaySummary(currentAcc)
}



const displayMovements = function(movements,sort=false){
  containerMovements.innerHTML='';

  const movs = sort ? movements.slice().sort((a,b)=>a-b):movements;

  movs.forEach(function(mov,i){
    
    const type = mov>0?'deposit':'withdrawal';
     const html =`<div class="movements__row">
     <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
     <div class="movements__value">${mov}</div>
   </div>`
   containerMovements.insertAdjacentHTML('afterbegin',html);
  })
}


const creatUsername = function(acc){
  accounts.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(" ").map(function(name){
      return name[0];
    }).join(''); 
  })
};



creatUsername(accounts);

const calcPrintbalance = function(acc){
   acc.balance = acc.movements.reduce((acc,cur)=> acc+cur , 0);
  labelBalance.textContent=`${acc.balance}EUR`;
}


const displaySummary = function(acc){
  const income = acc.movements.filter(mov => mov >0).reduce((acc,mov)=> acc+mov,0);
  labelSumIn.textContent = `${income}EUR`

    const out = acc.movements.filter(mov => mov <0).reduce((acc,mov)=> acc+mov,0);
    labelSumOut.textContent = `${Math.abs(out)}EUR`
     
    const interest=acc.movements.filter(mov => mov>0).map(deposit => (deposit*acc.interestRate)/100).filter((int,i,arr)=>{
      return int >=1;
    }).reduce((acc,mov)=> acc+mov,0);
    labelSumInterest.textContent=interest;
}


btnLogin.addEventListener('click',function(e){
  //Prevent form from submitting
  e.preventDefault();
 currentAcc = accounts.find(acc=>acc.username===inputLoginUsername.value)

 if(currentAcc?.pin===Number(inputLoginPin.value)){
    document.querySelector('.app').style.opacity=1;
    labelWelcome.textContent=`Welcome back ${currentAcc.owner.split(' ')[0]}`;
    updateValue();
    
 }
 else{
  alert("Account does not exist");
 }
 inputLoginUsername.value=inputLoginPin.value='';



})
btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  transferAcc= accounts.find(acc=>acc.username === inputTransferTo.value)
  if(transferAcc){
    if(Number(inputTransferAmount.value)< currentAcc.balance && inputTransferAmount.value>0 && transferAcc!==currentAcc){
      transferAcc.movements.push(Number(inputTransferAmount.value))
      currentAcc.movements.push(Number(-inputTransferAmount.value))
      updateValue();
     
      labelWelcome.textContent=`Succesfully transferd to ${transferAcc.owner.split(' ')[0]}`
      setTimeout(function(){
      
        labelWelcome.textContent=`Hello, ${currentAcc.owner.split(' ')[0]}`
      },2300);
    }
    else{
      labelWelcome.textContent=`Improper Data transfer amout or reciver acc `;
      setTimeout(function(){
      
        labelWelcome.textContent=`Hello, ${currentAcc.owner.split(' ')[0]}`
      },2300);
    }
  }
  else{
    labelWelcome.textContent=`The account u wanna transfer does not exist`;
    setTimeout(function(){
      
      labelWelcome.textContent=`Hello, ${currentAcc.owner.split(' ')[0]}`
    },2300);
  }
  inputTransferTo.value=inputTransferAmount.value='';

})


btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value)
  if(amount>0 && currentAcc.movements.some(mov => mov>= amount*0.1)){
    labelWelcome.textContent=`Your loan will be approved soon ${currentAcc.owner.split(' ')[0]}`
    setTimeout(function(){
      currentAcc.movements.push(amount)
      updateValue();
      labelWelcome.textContent=`Congrats ${currentAcc.owner.split(' ')[0]} your Loan is approved of ${amount}EURO `
    },3000);
    setTimeout(function(){
      
      labelWelcome.textContent=`Hello, ${currentAcc.owner.split(' ')[0]}`
    },6300);
  }
  else{
    labelWelcome.textContent=`Your account is not approved for loan`;
    setTimeout(function(){
      
      labelWelcome.textContent=`Hello, ${currentAcc.owner.split(' ')[0]}`
    },2300);
  }
  inputLoanAmount.value='';
})

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value===currentAcc.username&& Number(inputClosePin.value)===currentAcc.pin){
    const index = accounts.findIndex(acc=> acc.username===currentAcc.username);
    labelWelcome.textContent=`Your Account will be deleted soon ${currentAcc.owner.split(' ')[0]}`
    setTimeout(function(){
      accounts.splice(index,1)
      labelWelcome.textContent=` ${currentAcc.owner.split(' ')[0]} accounts has been deleted`
      containerApp.style.opacity=0
      
    },1000);
    setTimeout(function(){
      
      labelWelcome.textContent=`Log in to get started`
    },1800);
  }
  else{
    labelWelcome.textContent=`Your credintial to close account are wrong   try again!!!!!!!`
    setTimeout(function(){
      
      labelWelcome.textContent=`Hello, ${currentAcc.owner.split(' ')[0]}`
    },2300);
  }
  inputClosePin.value=inputCloseUsername.value='';
})

let sorted = false;

btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAcc.movements,!sorted);
  sorted=!sorted;
})







  

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





/////////////////////////////////////////////////


let arr = ['a','b','c','d','e'];

console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1,-2));



//splice

arr.splice(-1);
console.log(arr);
arr.splice(1,2);
console.log(arr);

//reverse
arr=['a','b','c','d','e'];
const arr2 = ['j','i','h','g','f'];
console.log(arr2.reverse());
console.log(arr2)

//concat
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr,...arr2]);

//join
console.log(letters.join('-'));

//at method

 arr = [23,11,64]
console.log(arr[0])
console.log(arr.at[0]);

console.log(arr[arr.length-1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('rishit'.at(0));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for(const [i,movement] of movements.entries()){
  if(movement>0){
    console.log(`Movement ${i+1}: you deposited ${movement}`)
  }
  else{
    console.log(`Movement ${i+1}: you withdraw ${Math.abs(movement)}`);
  }
}

console.log('---FOREACH----')

movements.forEach(function (movement,i,arr){
  if(movement>0){
    console.log(`Movement ${i+1}: you deposited ${movement}`)
  }
  else{
    console.log(`Movement ${i+1}: you withdraw ${Math.abs(movement)}`);
  }


})

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, Map){
  console.log(`${key}: ${value}`);
})

const currenciesUnique = new Set(['USD','GBP','USD','EUR','EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value,_,map){
  console.log(`${value}: ${value}`);
})

const eurToUsd =1.1;

const movementsUSD = movements.map(function(mov){
  return mov*eurToUsd;
});

console.log(movements);

console.log(movementsUSD);

const movmentsDescription = movements.map((mov,i,arr)=>

    `Movment ${i+1}: You ${mov > 0 ? 'deposited':'withdrew'} ${Math.abs(mov)}`

  // if(mov>0){
  //   return`Movments ${i+1}: You deposited ${mov}`;
  // }
  // else{
  //   return`Movment ${i+1}: You withdraw ${Math.abs(mov)};`
  // }
)

console.log(movmentsDescription)

const deposits = movements.filter(function(mov){
  return mov>0;
})
console.log(movements);
console.log(deposits);
const withdrawals = movements.filter(function(mov){
  return Math.abs(mov<0);
})

console.log(withdrawals);

// const balance = movements.reduce(function(acc,cur,i,arr){
//   return acc+cur;
// },0);

const balance = movements.reduce((acc,cur)=>acc+cur,0);
console.log(balance);

const max = movements.reduce((acc,mov)=>{
  if(acc>mov) return acc;
  else return mov;
},movements[0]);

console.log(max);

const totalDepositsUSD = movements.filter(mov=> mov>0).map(mov=> mov* eurToUsd).reduce((acc,mov)=> acc + mov,0);
console.log(totalDepositsUSD);
const firstWithdrawal = movements.find(mov=>mov<0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

for(const [i,acc] of accounts.entries()){
  if(acc.owner==='Jessica Davis'){
    console.log(acc)
  }
  
}
console.log(movements)
const anyDeposits = movements.some(mov=>mov>1500);
console.log(anyDeposits);

const arr1 =[1,2,3,4,5,6,7]

const x= new Array(7);
x.fill(1,3,5);
console.log(x);

arr1.fill(23,2,6);
console.log(arr1);

const y = Array.from({length:7},()=>1);
console.log(y);

const z = Array.from({length: 7},(_,i)=>i+1)
console.log(z);

labelBalance.addEventListener('click',function(){
  const movementUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace("€","")))
  console.log(movementUI)
})

const numDeposits1000= accounts.flatMap(acc=> acc.movements).reduce((count,cur)=>(cur>=1000 ? count + 1: count),0);

console.log(numDeposits1000)

const {deposit,wwithdrawals}= accounts.flatMap(acc=>acc.movements).reduce((sums,cur)=>{
  //cur>0?(sums.deposits += cur):(sums.wwithdrawals += cur);
  sums[cur>0?'deposit':'wwithdrawals']+=cur;
  return sums;
},
{deposit:0,wwithdrawals:0})

console.log(deposit,wwithdrawals);

const convertTitleCase = function(title){
  const capitalize = str =>str[0].toUpperCase()+str.slice(1)
  const exceptions=['a','an','and','the','but','or','on','in','with'];

  const titleCase = title.toLowerCase().split(' ').map(word=>exceptions.includes(word)?word:word[0].toUpperCase() + word.slice(1)).join(' ')
  return capitalize(titleCase);
}
console.log(convertTitleCase('this is a nice title'))
console.log(convertTitleCase('this is a LONG title but not too LONG'))
console.log(convertTitleCase('and here is another title with an EXAMPLE'))