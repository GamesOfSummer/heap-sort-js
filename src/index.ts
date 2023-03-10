import {
    consoleBuffer,
    consoleEnd,
    consoleStart,
    validateFxn,
} from './helpers';

const heapSort = (array: number[]): number[] => {
    array = createMaxHeap(array);

    for (let i = array.length - 1; i > 0; i--) {
        swapPlace(0, i, array);
        heapify(array, 0, i);
    }

    return array;
};

const createMaxHeap = (array) => {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapify(array, i, array.length);
    }
    return array;
};

const heapify = (array: number[], index: number, heapSize: number) => {
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    let largestValueIndex = index;

    if (heapSize > left && array[largestValueIndex] < array[left]) {
        largestValueIndex = left;
    }

    if (heapSize > right && array[largestValueIndex] < array[right]) {
        largestValueIndex = right;
    }

    if (largestValueIndex !== index) {
        swapPlace(index, largestValueIndex, array);
        heapify(array, largestValueIndex, heapSize);
    }
};

const swapPlace = (
    index1: number,
    index2: number,
    array: number[]
): number[] => {
    const holder = array[index1];
    array[index1] = array[index2];
    array[index2] = holder;
    return array;
};

consoleStart();

const nums = [4, 5, 3, 2, 1];

validateFxn(heapSort(nums), [1, 2, 3, 4, 5]);
consoleEnd();
consoleBuffer();

export {};
