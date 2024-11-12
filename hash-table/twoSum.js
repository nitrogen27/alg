function twoSum(array, target){
 const map = new Map();
 for(let i = 0; i < array.length; i++){
   const index = target - array[i];
   map.set(index, i);
 }
 let j = 0;
 while(j !== array.length){
   if(map.has(array[j]) && j !== map.get(array[j])){
     return [j,map.get(array[j])]
   }
   j++;
 }
  return []
}
function optTwoSum(array, target){
  const map = new Map();
  for(let i = 0; i < array.length; i++){
    const index = target - array[i];
    if(map.has(array[i])){
      return [i, map.get(array[i])]
    }
    else{
      map.set(index, i)
    }
  }
  return []
}
