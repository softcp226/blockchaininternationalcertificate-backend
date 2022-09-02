// const getDate = () => {
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, "0");
//     var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//     var yyyy = today.getFullYear();

//     today = mm + "/" + dd + "/" + yyyy;
//     return today
// };

const nth = function(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}
const getDate=()=>{
     var today = new Date();
     var dd = String(today.getDate())
     var mm = String(today.getMonth() + 1)
     var yyyy = today.getFullYear();

     const month = today.toLocaleString("default", { month: "long" });
    console.log(`${dd}${nth(dd)}`);
    //  today = mm + "/" + dd + "/" + yyyy;
  today = `${dd}${nth(dd)} ${month} ${yyyy}`;
     return today;
}

module.exports = getDate;
