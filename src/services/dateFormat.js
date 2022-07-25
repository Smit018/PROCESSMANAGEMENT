export const DateFormat = (myDate)=>{
    myDate = new Date(myDate)
    var month=new Array();
  month[0]="Jan";
  month[1]="Feb";
  month[2]="Mar";
  month[3]="Apr";
  month[4]="May";
  month[5]="Jun";
  month[6]="Jul";
  month[7]="Aug";
  month[8]="Sep";
  month[9]="Oct";
  month[10]="Nov";
  month[11]="Dec";
  var hours = myDate.getHours();
  var minutes = myDate.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  // e.g. "13 Nov 2016 11:00pm";
    return myDate.getDate()+" "+month[myDate.getMonth()]+" "+myDate.getFullYear();
}