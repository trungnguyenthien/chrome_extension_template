const defaultOptions = {
  domain: "youtube.com",
  period_day: 30,
  projects: [
    "REALESTATE",
    "GENERAL",
    "SHP"
  ]
}

//permission: cookies
function requestCookie(domain, callback) {
  chrome.cookies.getAll({
    domain: domain
  }, function (cookies) {
    var cookieValue = ""
    cookies.forEach(function (cookie) {
      console.log(cookie.name, cookie.value);
      cookieValue += (`${cookie.name}: ${cookie.value};`)
    });
    cookieStore.set(domain, cookieValue)
    if (callback) {
      callback(cookieValue)
    }
  });
}

function setting(key) {

}