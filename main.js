const $arrayIn     = document.querySelector('#arrayIn');
const $concatArray = document.querySelector('#concatArray');
const $arrayLooped = document.querySelector('#arrayLooped');
const $arrayMerged = document.querySelector('#arrayMerged');
const $error       = document.querySelector('#error');


const fileJSON = new Promise(function(resolve, reject) {
  const arrayRequest = new XMLHttpRequest();
  arrayRequest.onload = function(){
    if(arrayRequest.status === 200){
      resolve(this.responseText);
    } else {
      reject('Error Number ' + arrayRequest.status);
    }
  }
  arrayRequest.open('GET', 'file/arrays.json');
  arrayRequest.send();
});

fileJSON.then(result => {
  const obj = checkArray(JSON.parse(result));
  displayObj($arrayIn, result);

  const newArray = concatArrays(obj);
  displayObj($concatArray, newArray);

  const sortedLoopArray = loopSort(newArray);
  displayObj($arrayLooped, sortedLoopArray);

  const sortedMergeArray = mergeSort(newArray);
  displayObj($arrayMerged, sortedMergeArray);


}).catch(error => {
  displayError($error, error);
  console.log(error);
});

function concatArrays(obj){
  let array = [];
  for(let key in obj){
    array.push(...obj[key]);
  }
  return array;
}

function loopSort(array){
  for(let i = 0; i < array.length; i++){
    let value = array[i];

    let j = i - 1;
    for(; j >= 0; j--){
      if(value < array[j]){
        array[j+1] = array[j];
      } else {
        break;
      }
    }
    array[j+1] = value;
  }
  return array;
}

function mergeSort(array) {
	if (array.length>1){
		let mid = Math.floor(array.length/2),
		lefthalf = array.slice(0,mid),
		righthalf = array.slice(mid);
		mergeSort(lefthalf)
		mergeSort(righthalf)

		let i = j = k = 0
		while (i<lefthalf.length && j<righthalf.length){
			if (lefthalf[i]<righthalf[j])
			{
				array[k]=lefthalf[i]
				i++;
			}
			else
			{
				array[k]=righthalf[j]
				j++
			}
			k++
		}
		while (i<lefthalf.length){
			array[k]=lefthalf[i]
			i++
			k++
		}
		while( j<righthalf.length){
			array[k]=righthalf[j]
			j++
			k++
		}
	}
	return array
}


/* ==== Utility functions */
function displayObj(elem, obj){
  elem.textContent = obj;
}

function displayError(elem, error){
  elem.style.display = 'block';
  elem.textContent = error;
}

function checkArray(obj){
  for(let key in obj){
    let index = 0;
    do {
      if(typeof(obj[key][index]) !== 'number'){
        obj[key].splice(index, 1);
        index--;
      }
      index++;
    } while (index < obj[key].length)

  }
  return obj;
}





