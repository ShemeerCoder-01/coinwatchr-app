export const convertDate = (number)=>{
    let dateVal = new Date(number);
    return dateVal.getDate() + "/" + (dateVal.getMonth()+1);
}