import {HttpHeaders} from "@angular/common/http";
import {CampaignStatusEnum} from "../enum/Enum";

export class SystemUtil {

  public static BASE_URL = 'https://herofund.up.railway.app';
  static local = 'http://localhost:8080';
 static returnUrlProd = 'https://herofun-client.vercel.app/payment-success';
  static prod = 'https://herofund.up.railway.app';

  public static setTokenHeader() {
    let jwt = JSON.parse(localStorage.getItem('jwt')!);
    return new HttpHeaders({
      Authorization: 'Bearer ' + jwt?.accessToken,
      'content-type': 'application/json',
      'returnUrl': 'http://localhost:4200/payment-success',
      'cancelUrl': 'https://dev110521.service-now.com/sp'
    });
  }

  public static handlerStatus (status: number){
    let color;
    switch (status) {
      case 0:
        color = '#5b5b5b'; // disable
        break;
      case 1:
        color = '#26d53d'; // enable
        break;
      case 2:
        color = '#7191e8'; // wait
        break;
      case 3:
        color = '#c0b700'; // reject
        break;
      case 4:
        color = '#ff2323'; // khẩn cấp
        break;
      default:
        color = '#44fefe'
        break;
    }
    return  {
      name: CampaignStatusEnum[status],
      color: color
    };
  }

  static handlerDateTime(d: string) {
    let str = new Date(d)
    let date = str.getDate() < 10 ? `0${str.getDate()}` : str.getDate()
    let month = str.getMonth() < 10 ? `0${str.getMonth() + 1}` : str.getMonth()
    let hours = str.getHours() < 10 ? `0${str.getHours()}` : str.getHours()
    let minutes = str.getMinutes() < 10 ? `0${str.getMinutes()}` : str.getMinutes()
    return `${date}-${month}-${str.getFullYear()}`
  }

  checkDateWithCurrent(date: string){

  }

}
