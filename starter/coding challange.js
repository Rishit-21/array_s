console.log("---coding challange---")
const dogsJulia =[9, 16, 6, 8, 3]
const dogskate =[10, 5, 6, 1, 4]

const  newDogsJulia = dogsJulia.slice(1,3);

const checkDogs = function(arr1,arr2){
    console.log('-----julia')
    arr1.forEach(function(age,i) {
        age>=3?console.log(`Dogs number ${i} is adult and is ${age} old `):console.log(`Dog number ${i} is still a puppy`);        
    });
    console.log("-----kate")
    arr2.forEach(function(age,i){
        age>=3?console.log(`Dogs number ${i} is adult and is ${age} old `):console.log(`Dog number ${i} is still a puppy`);        
    })

}
checkDogs(dogsJulia,dogskate)
checkDogs(newDogsJulia,dogskate)

const arr4 = [5, 2, 4, 1, 15, 8, 3];
// const dogskateN = [16, 6, 10, 5, 6, 1, 4];

    const dogHumanAge = arr4.map(function(age){
       return age<=2? 2*age:16+age*4

    })

    const bigDogs = dogHumanAge.filter(function(age){
        return age>=18;
    })

    const avgAge = bigDogs.reduce(function(acc,cur){
        return acc + cur;

    },0);


 
 console.log(`Human age of dogs are: ${dogHumanAge}`);
 console.log( `dogs above 18 are: ${bigDogs}`);
 console.log(`AVG age of adult dogs is: ${avgAge/bigDogs.length}`);

 
