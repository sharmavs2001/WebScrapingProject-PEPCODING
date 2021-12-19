/*NOTE: The city assigned to me was Udaipur. I have completed the code, if somehow it doesn't show the desired output, 
it would be because of the "collegedunia" webisite, the website wasn't not supporting web scrapping sometimes.


When I try 
console.log(html);
It shows an error, that is: "Request blocked. We can't connect to the server for this app or website at this time. There might be too much traffic
or a configuration error. Try again later, or contact the app or website owner."
*/
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');


request('https://collegedunia.com/btech/udaipur-colleges', requestcallbackfunction);


function requestcallbackfunction(err, res, html) {
    let $ = cheerio.load(html);

    const collegeObj = $('a.college_name');

    let topCollegesUrl = []; // array of objects

    for (let i = 0; i < 6; i++) {

        topCollegesUrl.push({

            url: 'https://collegedunia.com/btech/udaipur-colleges' + $(collegeObj[i]).attr('href')
        });

    }


    for (j in topCollegesUrl) {


        request(topCollegesUrl[j]['url'], fetchCollegeData.bind(this, j));  //request is an asynchronous function

    }
    let WB = xlsx.utils.book_new();

    let count = 0;
    function fetchCollegeData(index, err, res, html) {




        count++;
        let $ = cheerio.load(html);


        let dataobj = [];

        dataobj.push({

            CollegeName: $('#collegePageTitle').text(),
            About: $('div.cdcms_college_highlights > p').text()
        
        });

       let eligibilitytable = $('section>div>table');
    
       for(let i=1;i<=7;i++){
         
        dataobj.push({

           Courses:    $('#__next > div.jsx-1150928046.jsx-3021667605.page-min-height > section > div > div.jsx-29629026.col-9.college-content.col_8.mb-5 > div > section > div > table > tbody > tr:nth-child('+ i +') > td:nth-child(1) > a').text() ,
           Fees:    $('#__next > div.jsx-1150928046.jsx-3021667605.page-min-height > section > div > div.jsx-29629026.col-9.college-content.col_8.mb-5 > div > section > div > table > tbody > tr:nth-child('+ i +') > td:nth-child(2) > a').text() ,

           Eligibility:$('#__next > div.jsx-1150928046.jsx-3021667605.page-min-height > section > div > div.jsx-29629026.col-9.college-content.col_8.mb-5 > div > section > div > table > tbody > tr:nth-child('+ i +') > td:nth-child(3) > a').text() 
        
        });


       }


        let newWS = xlsx.utils.json_to_sheet(dataobj);

        xlsx.utils.book_append_sheet(WB, newWS, "sheet" + count)

        if (count == 6) {
            xlsx.writeFile(WB, "datafile.xlsx");
        }
    }



}



