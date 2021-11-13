import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class QrCodeCallerService {

  constructor(public httpClient: HttpClient) {}

  private url = "https://api.qr-code-generator.com/v1/create?access-token=HKOz-dE1gX6YtOM4mAPBU5-qqEc4UOmNBhsDXXFhcjoRv6BrdaNbKnSp1CoYhBiC";
  private urlAndBodyGET = "https://api.qr-code-generator.com/v1/create?access-token=HKOz-dE1gX6YtOM4mAPBU5-qqEc4UOmNBhsDXXFhcjoRv6BrdaNbKnSp1CoYhBiC&frame_name=bottom-frame&qr_code_text={{qr_code_text}}&image_format=PNG&frame_color=#000000&frame_text_color=#ffffff&frame_icon_name=business&frame_text=Escaneame&foreground_color=#FF0000&background_color=#F8CE26&marker_left_inner_color=#FA593F&marker_left_outer_color=#FF8100&marker_right_inner_color=#FA593F&marker_right_outer_color=#FF8100&marker_bottom_inner_color=#FA593F&marker_bottom_outer_color=#FF8100&marker_left_template=version8&marker_right_template=version8&marker_bottom_template=version8&image_width=300";
  private body = {
    frame_name: "bottom-frame",
    qr_code_text: "",
    image_format: "SVG",
    frame_color: "#000000",
    frame_text_color: "#ffffff",
    frame_icon_name: "business",
    frame_text: "Escaneame",
    foreground_color: "#FF0000",
    background_color: "#F8CE26",
    marker_left_inner_color: "#FA593F",
    marker_left_outer_color: "#FF8100",
    marker_right_inner_color: "#FA593F",
    marker_right_outer_color: "#FF8100",
    marker_bottom_inner_color: "#FA593F",
    marker_bottom_outer_color: "#FF8100",
    marker_left_template: "version8",
    marker_right_template: "version8",
	marker_bottom_template: "version8",
	image_width: 300
  };



  generateBeautifulQrCode(qrContent, frameText?){
	var responseToReturn;
  this.body.qr_code_text = qrContent;
  
  this.urlAndBodyGET = this.urlAndBodyGET.replace("{{qr_code_text}}", qrContent);
	
	if(frameText != null )
    this.body.frame_text = frameText;
    
    

  var header = new HttpHeaders();
  header = header.set("Content-Type", "image/png");

  //header.append("responseType", "blob");
  header = header.set("Access-Control-Allow-Origin", "*");
  header = header.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  //header = header.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, Accept");
  header = header.set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token, Authorization");
  header = header.set("Access-Control-Allow-Credentials", "false");
  header = header.set("Access-Control-Expose-Headers", "X-Pagination-Current-Page, X-Pagination-Page-Count, X-Pagination-Per-Page, X-Pagination-Total-Count");

  header = header.set("Transfer-Encoding", "chunked");
  header = header.set("Connection", "keep-alive");
  header = header.set("Server", "nginx");
  header = header.set("Vary", "Accept");
  header = header.append("Vary", "Accept-Language");
  header = header.set("X-Rate-Limit-Limit", "10000");
  header = header.set("X-Rate-Limit-Remaining", "9997");
  header = header.set("X-Rate-Limit-Reset", "Accept-Language");
  header = header.set("Accept", "*/*");
  header = header.set("Accept-Language", "en-US,en;q=0.9");

  //{ responseType: 'blob'}

  /*var x = new XMLHttpRequest();
  x.open('GET', "https://thingproxy.freeboard.io/fetch/" + this.urlAndBodyGET);
  var response = x.send();
  console.log(response);*/

  //arraybuffer
  //blob
  //text
  //json
  return this.httpClient.post("https://thingproxy.freeboard.io/fetch/" + this.url, this.body, {responseType: "text"});/*.subscribe((data) => {
    console.log("data", data);
    //this.createImageFromBlob(data);
  },
  (error) => {
    console.log(error);
  }
);*/



  //return this.httpClient.jsonp(this.urlAndBodyGET, 'callback=JSONP_CALLBACK');

  //return this.httpClient.post(this.url, this.body, { headers: header, responseType: 'blob'});
  


  }


imageToShow: any;

createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

cors_api_url = 'https://cors-anywhere.herokuapp.com/';

skipCors(){
this.doCORSRequest(
  {
    "method": "GET",
    "url": this.urlAndBodyGET
  },"")
  
  var x = new XMLHttpRequest();
  x.open('GET', this.cors_api_url + this.urlAndBodyGET);
  x.send();

}

doCORSRequest(options, printResult) {
  var x = new XMLHttpRequest();
  x.open(options.method, this.cors_api_url + options.url);

  x.onload = x.onerror = function() {
    printResult(
      options.method + ' ' + options.url + '\n' +
      x.status + ' ' + x.statusText + '\n\n' +
      (x.responseText || '')
    );
  };
  if (/^POST/i.test(options.method)) {
    x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  x.send(options.data);
}

}
