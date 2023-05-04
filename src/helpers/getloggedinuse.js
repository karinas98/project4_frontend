export const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const middle = token.split(".")[1];
  const decodedString = window.atob(middle);
  const decodedObject = JSON.parse(decodedString);
  console.log(decodedObject);
  console.log(decodedObject.sub);
  return decodedObject.sub;
};
