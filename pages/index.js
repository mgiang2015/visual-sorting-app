import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import SortWindow from '../components/sortWindow';
import { bubbleSort, insertionSort, selectionSort, mergeSort, quickSort} from '../public/algorithms'
import { useState, useEffect } from 'react';

export default function Home() {
  const [sortTypes, setSortTypes] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [toggleChange, setToggleChange] = useState(true);

  // Elements in the array is an object with 2 fields: value and isChose. value is the numeric value of the element, isChosen signifies whether value isChosen.
  function getSortFunction(sortType) {
    let sortFunction;
    switch (sortType) {
      case "Bubble":
        sortFunction = bubbleSort;
        break;
      case "Insertion":
        sortFunction = insertionSort;
        break;
      case "Selection":
        sortFunction = selectionSort;
        break;
      case "Merge":
        sortFunction = mergeSort;
        break;
      case "Quick":
        sortFunction = quickSort;
        break;
      default:
        sortFunction = bubbleSort;
        break;
    }
    return sortFunction;
  }

  function resetInputArr() {
    let tempArr = inputArray;
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i].isSorted = false;
    }
    setInputArray(tempArr);
  }

  var displayStr = "[ ";
  for (let i = 0; i < inputArray.length; i++) {
    displayStr += inputArray[i].value + " ";
  }
  displayStr += "]";

  var displaySortTypes = "[ ";
  for (let i = 0; i < sortTypes.length; i++) {
    displaySortTypes += sortTypes[i] + " ";
  }
  displaySortTypes += "]";
  
  const setInputToggleReady = function(newArray) {
    if (isReady) {
      setIsReady(false);
    }

    if (isRunning) {
      setIsRunning(false);
    }

    setInputArray(newArray);
    if (newArray.length > 0) {
      setIsReady(true);
    }
  }

  const setSortTypeToggleReady = function(arr) {
    if (isRunning) {
      setIsRunning(false);
    }

    if (isReady) {
      setIsReady(false);
    }

    setSortTypes(arr);
  }

  const setRunningToggleReady = function(bool) {
    if (!isReady) {
      setIsReady(true);
    }

    resetInputArr();
    
    setIsRunning(bool);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Visual Sorting App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header sortTypes={sortTypes} setSortTypes={setSortTypeToggleReady} setInputArray={setInputToggleReady} setRunning={setRunningToggleReady} inputArray={inputArray} />
      <p>{displayStr}</p>
      <p>{displaySortTypes}</p>
      {isReady 
        ? sortTypes.map((sortType) => 
          <SortWindow sortMethodName={sortType} sortMethodFunction={getSortFunction(sortType)} elementArray={inputArray} setArray={setInputArray} isRunning={isRunning} />
          )
        : <div></div>}
    </div>
  ) 
}
