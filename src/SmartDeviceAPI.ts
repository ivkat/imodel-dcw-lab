export class SmartDeviceAPI {

    public static async getData(url: string = '') {
        
        // https://smarthomedata.z22.web.core.windows.net/ is the original smatrthome device link format
        // https://cdn.glitch.com/36ed5227-d99e-4ef2-a2dd-70d792dd8ab4%2Fitwinexampledownload.json?v=1625494498808 orginal + 29V works ok
        // https://cdn.glitch.com/36ed5227-d99e-4ef2-a2dd-70d792dd8ab4%2Fitwinexampledownload.json?v=1625737343698 adding all 29V+* loses all markers & tootltips
        // https://cdn.glitch.com/36ed5227-d99e-4ef2-a2dd-70d792dd8ab4%2Fdownload2.json?v=1625492132071 is single entry 29V-1 
        //"https://cdn.glitch.com/36ed5227-d99e-4ef2-a2dd-70d792dd8ab4%2Fitwinexampledownload.json?v=1625494498808"
        const response = await fetch(url);

        //console.log("response from api", response);
        const deviceData = response.json().catch(err => alert("Error retrieving data:\n" + err.toString()));

        return deviceData;
    }

}