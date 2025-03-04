import mockData from './mock-data';


/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

/**
 *
 * This function will fetch the list of all events
 */

export const testing = async () => {
  return mockData;
}
export const getEvents = async () => {
  /*if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }*/

  const token = await getAccessToken();


  if (token) {
    const url =  "https://lhtolj50fl.execute-api.us-east-2.amazonaws.com/dev/api/get-events" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
 };

export const getAccessToken = async () => {
  /*const accessToken = localStorage.getItem('access_token');

  const tokenCheck = accessToken && (await checkToken(accessToken));
  if(!accessToken || tokenCheck.error){
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if(!code) {
      const response = await fetch(
        "https://lhtolj50fl.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authURL } = result;
      return (window.location.href = authURL);
    }
    return code && getToken(code);
  }
  return accessToken;*/
  try {
    const token = localStorage.getItem('access_token');
    console.log("Stored token:", token); // Debugging log

    if (!token) {
      console.log("No token in localStorage. Fetching new token...");
      const response = await fetch("https://lhtolj50fl.execute-api.us-east-2.amazonaws.com/dev/api/token");
      
      if (!response.ok) {
        console.error("Error fetching token:", response.status, response.statusText);
        return null;
      }

      const result = await response.json();
      console.log("Token API Response:", result);

      if (result.access_token) {
        localStorage.setItem('access_token', result.access_token);
        return result.access_token;
      } else {
        console.error("No access_token field in API response:", result);
        return null;
      }
    }

    return token; 
  } catch (error) {
    console.error("Error in getAccessToken():", error);
    return null;
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://lhtolj50fl.execute-api.us-east-2.amazonaws.com/dev/api/token' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);
 
 
  return access_token;
 };