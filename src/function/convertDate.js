export const ConvertDate = (timestamp) => {
  var myDate = new Date(timestamp);
  return myDate.getDate() + "/" + (myDate.getMonth() + 1);
};
