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

  public static handlerStatus(status: number) {
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
    return {
      name: CampaignStatusEnum[status],
      color: color
    };
  }

  static handlerDateTime(d: string) {
    let str = new Date(d)
    let date = str.getDate() < 10 ? `0${str.getDate()}` : str.getDate()
    let month = str.getMonth() < 10 ? `0${str.getMonth() + 1}` : str.getMonth()
    str.getHours() < 10 ? `0${str.getHours()}` : str.getHours();
    str.getMinutes() < 10 ? `0${str.getMinutes()}` : str.getMinutes();
    return `${date}-${month}-${str.getFullYear()}`
  }

  static getTimeArticle(d: string) {
    let str = new Date(d);
    let now = new Date();
    // @ts-ignore
    let result = Math.abs(now - str)

    let second = Math.floor(result / (1000))
    if(second < 60){
      return `${second} second ago`
    }
    let minute = result / (60 * 1000)
    if(minute < 60){
      return `${Math.floor(minute)} minute ago`
    }
    let hour = Math.floor(result / (60 * 60 * 1000))
    if (hour < 24){
      return `${hour} hour ago`
    }
    let day = Math.floor(result / (24 * 60 * 60 * 1000))
    if (day < 7){
      return `${day} day ago`
    }
    return this.handlerDateTime(d);
  }
}
