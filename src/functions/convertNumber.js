export const convertNumber = (number)=>{
    const numberString = number.toLocaleString();
    let numArr = numberString.split(",");
    let size = numArr.length;

    if(size === 5){
        return numArr[0] + "." + numArr[1].slice(0,2) + "T";
    }
    else if(size === 4){
        return numArr[0] + "." + numArr[1].slice(0,2) + "B";
    }
    else if(size === 3){
        return numArr[0] + "." + numArr[1].slice(0,2) + "M";
    }
    else if(size === 2){
        return numArr[0] + "." + numArr[1].slice(0,2) + "K";
    }
    else{
        return numberString;
    }
}