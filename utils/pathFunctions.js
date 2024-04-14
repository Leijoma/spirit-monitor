

export function getValueByPath(arr, inputPath) {
    // Find the object in the array where the path matches the inputPath
    const obj = arr.find(element => element.path === inputPath);
  // console.log(JSON.stringify(obj))
    // If the object is found, return its value; otherwise, return null
    if (obj) {
        return obj
    }
    else {
        return null
    }
   
}

export function calculateTimeDifference(date1, date2) {
    // Calculate the difference in milliseconds
    //console.log(date1)
    //console.log(date2)
    
    const differenceInMilliseconds = date1.getTime() - date2.getTime();
    
    // Convert the difference to various units
    const seconds = differenceInMilliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    
    // Return the differences in an object
    return {
        milliseconds: differenceInMilliseconds,
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days
    };
}


export function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }