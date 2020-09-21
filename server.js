var request = require('request')
var fs = require('fs')
const replaceString = require('replace-string');
var getLines = require('./modules/readDataLineByLine.js');

/* let getLines = function getLines (filename, lineCount, callback) {
  let stream = fs.createReadStream(filename, {
    flags: "r",
    encoding: "utf-8",
    fd: null,
    mode: 438, // 0666 in Octal
    bufferSize: 64 * 1024
  });

  let data = "";
  let lines = [];
  stream.on("data", function (moreData) {
    data += moreData;
    lines = data.split("\n");
    // probably that last line is "corrupt" - halfway read - why > not >=
    if (lines.length > lineCount + 1) {
      stream.destroy();
      lines = lines.slice(0, lineCount); // junk as above
      callback(false, lines);
    }
  });

  stream.on("error", function () {
    callback("Error");
  });

  stream.on("end", function () {
    callback(false, lines);
  });

}; */

var cookie = process.env.Cookie
//var cookie = "__cfduid=d8c977074da0cc62b4b885dd0d2c907fd1600337759; MgidSensorHref=https://olacity.com/; MgidSensorNVis=1; _ga=GA1.2.357288501.1600337761; locale=en; _gid=GA1.2.1996295699.1600586774; _gat_gtag_UA_171447448_1=1; login_token=%7B%22id%22%3A185929%2C%22user_name%22%3A%22dok2308%40gmail.com%22%2C%22phone%22%3A%220332179159%22%2C%22first_name%22%3A%22Ph%5Cu1ea1m%22%2C%22last_name%22%3A%22Qu%5Cu1ed1c+C%5Cu01b0%5Cu1eddng%22%2C%22action_key%22%3Anull%2C%22email%22%3A%22dok2308%40gmail.com%22%2C%22timestamp%22%3A1600619761%2C%22access_token%22%3A%2272bf9f7b76a4a736ef1206276817d223%22%7D; XSRF-TOKEN=eyJpdiI6IjliMEkyKzlMR1hnK1lYRjJQNHpMOHc9PSIsInZhbHVlIjoiRVl3RW1kWCtBSFlsR3Vna25tWnpqOEdsU2tKUysrbVJaOUlDeU9taUZZbmlqK0ppTTk4c3VpNWVQblRUenBcL2giLCJtYWMiOiJkMzg1NzQzYjg5ZGQ4ZTZkOTY5NjQ1NjJmODkzN2JjZjE0MmE1MmM1NjUzODUwOTY1NDI5MDRlNzU3OWI0NTFjIn0%3D; laravel_session=eyJpdiI6IkNLWVN1OUY3c1wveGFHVFlPTUc3TWpBPT0iLCJ2YWx1ZSI6ImFXY3pteUxFclZYd1wvdlFKUjg3UzBKQzdCeDd2amhNR0h6XC9IaUlTZnR6NHplR1RJZjZzcmRJeWRhMFNMdFhSMyIsIm1hYyI6IjQ4OTA0NjA1N2Y1Y2UwNGFlNDY2YzIyZDllYjg2MzJiOGU1N2YyOTQxY2U0ODNmYWJiODJkNjk3MDdmYWE3NjcifQ%3D%3D"

function submit_ads(ads_id) {
  var request_ads = {
    url: 'https://olacity.com/dashboard/view-ads',
    headers: {
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36 Edg/85.0.564.51',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      'Referer': 'https://olacity.com/dashboard/make-money',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6',
      'Cookie': cookie
    }
  }
  request.get(request_ads, function(err, res, data) {
    fs.writeFileSync('./data/index.html', data)
  });
}

function watch_ads(token, ads_id) {
  var watch_ads_header = {
    url: 'https://olacity.com/surfAds/back_money',
    headers: {
      "X-CSRF-TOKEN": token,
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36 Edg/85.0.564.51',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'https://olacity.com',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://olacity.com/dashboard/view-ads',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6',
      'Cookie': cookie
    },
    form: {
      surf_ads_id: ads_id
    },
    json: true
  }
  request.post(watch_ads_header, function(err, res, data) {
    try {
      if (data.status == 201) { console.log(data.msg) }
    } catch (error) {}
  });
}

setInterval(function(){
  submit_ads()
  setTimeout(function(){
    var readFileData = fs.readFileSync('./data/index.html').toString()
    if (!readFileData.includes("Price")) {
      if (readFileData.includes("You have seen all the advertisements for the day, come back tomorrow!")) {
        console.log("Het Quang Cao")
      } else if (readFileData.includes("Sign in")) {
        console.log("Het phien dang nhap")
      } else {
        console.log("Nhap ReCaptcha")
      };
    } else {
      getLines("./data/index.html", 2000, function (err, lines) {
        console.log(err);
        var count4adsId = 100
        var count4tokenValue = 100

        while (!lines[count4adsId].includes("surf_ads_id")) {
          count4adsId++
        } 
        while (!lines[count4tokenValue].includes("X-CSRF-TOKEN")) {
          count4tokenValue++
        } 
        
        var ads_id = replaceString(lines[count4adsId].toString(), '"surf_ads_id":', '')
        var token = replaceString(replaceString(lines[count4tokenValue].toString(), "'X-CSRF-TOKEN': ", ''), "'", "")

        console.log(token)

        for (var i=0; i<=50; i++) {
          watch_ads(token, ads_id)
        }
        
      });
    }
  }, 5000)
}, 7000)



