export function mergeSort(array, start = 0, end = array.length - 1) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    let left = mergeSort(array, start, mid);
    let right = mergeSort(array, mid + 1, end);
    let temp = merge([...left, ...right]);
    return temp;
  } else {
    return [array[start]];
  }
}

export function merge(array) {
  let temp = [];
  let start = 0;
  let end = array.length - 1;
  let mid = Math.floor((start + end) / 2);
  let i = start;
  let j = mid + 1;
  let k = 0;
  while (i <= mid && j <= end) {
    if (array[i] <= array[j]) {
      temp[k++] = array[i++];
    } else {
      temp[k++] = array[j++];
    }
  }

  while (i <= mid) {
    temp[k++] = array[i++];
  }

  while (j <= end) {
    temp[k++] = array[j++];
  }

  return temp;
}

export function removeDuplicates(array) {
  let i = 0;
  let j = 1;
  while (array[j]) {
    if (array[i] == array[j]) array.splice(j, 1);
    else {
      i += 1;
      j += 1;
    }
  }
}
