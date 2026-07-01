export const convertNumber = (number:number| string): string|undefined =>{
    if(!number) return;
    const numberString = number.toLocaleString();
    const numArr = numberString?.split(",");
    const size = numArr.length;

    if (size >= 2 && numArr[1]) {
        if (size === 5) return `${numArr[0]}.${numArr[1].slice(0, 2)}T`;
        if (size === 4) return `${numArr[0]}.${numArr[1].slice(0, 2)}B`;
        if (size === 3) return `${numArr[0]}.${numArr[1].slice(0, 2)}M`;
        if (size === 2) return `${numArr[0]}.${numArr[1].slice(0, 2)}K`;
    }

  return numberString;
}