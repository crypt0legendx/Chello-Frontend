import { Injectable } from '@angular/core';

@Injectable()
export class baseurl{
 
    //url: string = 'http://localhost:8080/api/v1/'; //Local Server
    
    url: string = 'http://31.220.60.19:8081/api/v1/'; //'http://3.17.3.103:3030/api/v1/'; //Devlopment Server
    S3Url: string = "https://chello-data.s3.amazonaws.com/";

    giphyUrl: string = "https://api.giphy.com/v1/";
    giphyApiKey: string = "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB"; //"dc6zaTOxFJmzC";

    socketUrl: string = "wss://api.dev.newzkast.com/cable?user_id=" //Development Server
    //socketUrl: string = "wss://api.newzkast.com/cable?user_id="; //Live Server

    fcmServerKey: string = "key=AAAAFLvHqsQ:APA91bEO44TMprcks7Hx20pTvU5zyC8HaxW6RrzxWG7h__NyHRsve_2tDW4EVVRnvtIS4hyEYVUWqXno2dihVJB55MxPbiklyXIkVp3-AblG4UCiKjzwERDeq4uJQkgBiDzB144m4EpO"; // Development Server

    //fcmServerKey: string = "key=AAAAWEWccGk:APA91bHzVdueyR-_M13Tl2CSmpGoZqNPSbebeJyaINihPjUPHY3isF25tL88sK4QlCUU9rpoNbhT_BdG6ArU7QlSpLl8ymz5gUDUE32SZxAiGSNXsb5SzK9-tS22QF8vEefpDvDVamzB"; // Live Server
}