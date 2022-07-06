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

 
const calcavg = (arr4.map(age=> age<=2?2*age:16+age*4).filter(age=> age>=18).reduce((acc,cur,i,arr)=> acc+cur/arr.length,0));
console.log(calcavg)

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
    ];
    for(let [i,dog] of dogs.entries()){
        let recommendedFood = Math.trunc((Number(dog.weight))**0.75*28)
        console.log(recommendedFood)
        if(recommendedFood<Number(dog.curFood)){
            console.log(`your dog is eating to much ${dog.owners}`)
          }
          else if(recommendedFood>Number(dog.curFood)){
            console.log(`your dog is eating to little ${dog.owners}`)
            }
            else{
                console.log(`your  dog is eating in perfect amount ${dog.owners}`)
            }
            
    }
    const sarahDog= dogs.find(own=>own.owners.includes('Sarah'));
    console.log(sarahDog)
    if(sarahDog){
      let recommend =Math.trunc((Number(sarahDog.weight))**0.75*28)
      if(recommend<Number(sarahDog.curFood)){
        console.log('your dog is eating to much')
      }
      else if(recommend>Number(sarahDog.curFood)){
        console.log('your dog is eating to little')
        }
        else{
            console.log('your  dog is eating in perfect amount')
        }
    }

const ownerEatToMuch = dogs.filter(dog=>(Number((dog.weight))**0.75*28)<dog.curFood).flatMap(dog=>dog.owners)
console.log(ownerEatToMuch)
const ownerEatToLittle = dogs.filter(dog=>(Number((dog.weight))**0.75*28)>dog.curFood).flatMap(dog=>dog.owners)
console.log(ownerEatToLittle)

console.log(`${ownerEatToMuch[0]} and ${ownerEatToMuch[1]} and ${ownerEatToMuch[2]}'s dog eats to much`)
console.log(`${ownerEatToLittle[0]} and ${ownerEatToLittle[1]} and ${ownerEatToLittle[2]}'s dog eats to little`)

for(let [i,dog] of dogs.entries()){
    const yes = true;
    let recommendedFood = Math.trunc((Number(dog.weight))**0.75*28)
    console.log(recommendedFood)
    if(recommendedFood===Number(dog.curFood)){
       console.log(yes)
      }

        else{
           console.log(!yes)
           
        }
        if(dog.curFood>Math.trunc(recommendedFood*.90)&&dog.curFood<Math.trunc(recommendedFood*1.10)){
            console.log(`okay amount of food: ${yes}`)
        }
        else   console.log(`okay amount of food: ${!yes}`)
        
}

let okayAmount = dogs.filter(dog =>dog.curFood>Math.trunc(Math.trunc((Number(dog.weight))**0.75*28)*.90)&&dog.curFood<Math.trunc(Math.trunc((Number(dog.weight))**0.75*28)*1.10))
console.log(okayAmount)
let recommendedFood;

dogs.forEach(function(dog,i){
    dog.recommendedFood = Math.trunc((Number(dog.weight))**0.75*28)
})

const sortDog = dogs.sort((a,b)=>{
    return a.recommendedFood-b.recommendedFood
})
console.log(sortDog)
let emps=[{
    id:1,
    name:'Rishit'
},{
    id:2,
    name:'Sahil'
},
{
    id:3,
    name:'Hardi'
}]

let empAddress=[{
    id:1,
    age:20,
    address:[{city:'Rajkot',
            state:'Guj',
            country:'India'},
        {
            city:'Rajkot',
            state:'Guj',
            country:'India'

        }]

},
{
    id:2,
    age:25,
    address:[{city:'AHM',
    state:'Guj',
    country:'India'},
    {
        city:'Rajkot',
        state:'Guj',
        country:'India'

}]

},
{
    id:3,
    age:20,
    address:[{city:'AHM',
    state:'Guj',
    country:'India'},
    {
        city:'Rajkot',
        state:'Guj',
        country:'India'

}]

}
]
let name;
let id;


const fn = function(i){
    for(const e of emps){
        if(e.id==i){
            const empInfo= emps.map(e=>{
                const add =empAddress.filter(empa=>e.id===empa.id )
                //console.log(add[0])
               
         if(e.id===i){
            const final ={
                id:e.id,
                name:e.name,
                address:add[0].address
            }
            return final 
         }
               
            })
            console.log(empInfo[i-1])
            break;
        }
    }

}
fn(1)