export const convertDate = (number:number)=>{
    let dateVal = new Date(number);
    return dateVal.getDate() + "/" + (dateVal.getMonth()+1);
}