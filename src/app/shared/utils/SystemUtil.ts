import {HttpHeaders} from "@angular/common/http";
import {CampaignStatusEnum} from "../enum/Enum";

export class SystemUtil {

  public static BASE_URL = 'http://localhost:8080';
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
        color = '#f5b77a'; // disable
        break;
      case 1:
        color = '#98ee78'; // enable
        break;
      case 2:
        color = '#7191e8'; // wait
        break;
      case 3:
        color = '#de6e6e'; // reject
        break;
      case 4:
        color = '#f8c58d'; // khẩn cấp
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

}
