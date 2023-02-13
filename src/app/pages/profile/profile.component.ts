import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Profile} from "../../shared/models";
import {
  CampaignRequest,
  Category,
  FilterCampaign,
  FilterTransaction,
  ResponseCampaignToken,
  ResponseTransactionToken, Sponsor
} from "../../shared/entity/Modal";
import {AlertService} from "../../shared/services/alert.service";
import {SystemUtil} from "../../shared/utils/SystemUtil";
import {ApiService} from "../../shared/services/api.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],

})
export class ProfileComponent implements OnInit {

  profile = new Profile();
  filterTransaction = new FilterTransaction();
  filterCampaign = new FilterCampaign();
  startDateSendingTime!: Date | null;
  endDateSendingTime!: Date | null;
  startCreatedDate!: Date | null;
  endCreatedDate!: Date | null;
  dateOfBirth!: Date | null;
  responseTransactionToken = new ResponseTransactionToken();
  responseCampaignToken = new ResponseCampaignToken();
  categories: Category[] = [];
  sponsors: Sponsor[] = [];
  validateForm!: UntypedFormGroup;
  image!: string;
  avatar!: string;
  defaultImage = '../../../assets/img/error.png';
  messageError = {
    errorTitle: "",
    errorDescription: "",
    errorDetail: "",
    errorImage: "",
    errorEndDate: "",
    errorCategoryId: "",
    errorStartDate: "",
    errorTargetAmount: ""
  };
  isLoadImage = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertService,
    private fb: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getProfile();
    this.getCategories();
    this.getSponsor();
    this.createForm();
    this.findTransaction(this.filterTransaction);
    this.findCampaign(this.filterCampaign);
    this.handlerDateTime('');
  }

  createForm(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.nullValidator]],
      title: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      detail: [null, [Validators.required]],
      image: [null, [Validators.required]],
      targetAmount: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      sponsorId: [null, [Validators.nullValidator]],
    });
  }

  getProfile() {
    this.authService.getProfile().subscribe(res => {
        this.profile = res.data;
        this.avatar = this.profile.avatar;
        this.dateOfBirth = res.data.dateOfBirth
        localStorage.setItem('profile', JSON.stringify(this.profile))
      },
    )
  }

  getCategories() {
    this.apiService.getCategories()
      .subscribe(res => res && (this.categories = res))
  }

  getSponsor() {
    this.apiService.getSponsor()
      .subscribe(res => res && (this.sponsors = res))
  }

  updateProfile() {
    let profileRequest = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      dateOfBirth: this.convertInputDateToStringDYM(this.dateOfBirth),
      email: this.profile.email,
      avatar: this.avatar,
      phone: this.profile.phone,
      address: this.profile.address
    }
    this.authService.saveProfile(profileRequest)
      .subscribe(
        res => {
          if (res && res.status == true) {
            this.alertService.success(res.message)
            this.getProfile();
            window.location.href = '/profile'
          } else {
            this.alertService.error(res.message)
          }
        },
        error => this.alertService.error(error)
      )
  }

  btnSearch(type: number) {
    if (type == 1) {
      this.filterTransaction.startDateSendingTime = this.convertInputDateToStringDYM(this.startDateSendingTime)
      this.filterTransaction.endDateSendingTime = this.convertInputDateToStringDYM(this.endDateSendingTime)
      this.findTransaction(this.filterTransaction);
      return;
    }
    this.filterCampaign.startDateCreateAt = this.convertInputDateToStringDYM(this.startCreatedDate)
    this.filterCampaign.endDateCreateAt = this.convertInputDateToStringDYM(this.endCreatedDate)
    this.findCampaign(this.filterCampaign);

  }

  btnReset(type: number) {
    if (type == 1) {
      this.filterTransaction = new FilterTransaction();
      this.startDateSendingTime = null;
      this.endDateSendingTime = null;
      this.findTransaction(this.filterTransaction);
      return;
    }
    this.filterCampaign = new FilterCampaign();
    this.startCreatedDate = null;
    this.endCreatedDate = null;
    this.findCampaign(this.filterCampaign);

  }

  convertInputDateToStringDYM(value: any) {
    if (!value) return '';
    let date = new Date(value);
    let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth();
    return `${date.getDate()}/${month}/${date.getFullYear()}`;
  }

  findTransaction(filter: FilterTransaction) {
    this.authService.findTransaction(filter)
      .subscribe(res => res && (this.responseTransactionToken = res))
  }

  renderPage(type: number) {
    let arr = [];
    if (type == 1) {
      for (let i = 1; i <= this.responseTransactionToken.totalPages; i++) {
        arr.push(i);
      }
      return arr;
    }
    for (let i = 1; i <= this.responseCampaignToken.totalPages; i++) {
      arr.push(i);
    }
    return arr;
  }

  changePage(type: number, p: any) {
    if (type == 1) {
      this.filterTransaction.offset = p;
      this.findTransaction(this.filterTransaction);
      return;
    }
    this.filterCampaign.offset = p;
    this.findCampaign(this.filterCampaign);

  }

  previousPage(type: number) {
    if (type == 1) {
      if (this.filterTransaction.offset <= 0) return;
      this.filterTransaction.offset -= 1;
      this.findTransaction(this.filterTransaction);
      return;
    }
    if (this.filterCampaign.offset <= 0) return;
    this.filterCampaign.offset -= 1;
    this.findCampaign(this.filterCampaign);
  }

  nextPage(type: number) {
    if (type == 1) {
      if (this.filterTransaction.offset == this.responseTransactionToken.totalPages) return;
      this.filterTransaction.offset += 1;
      this.findTransaction(this.filterTransaction);
      return;
    }
    if (this.filterCampaign.offset == this.responseCampaignToken.totalPages) return;
    this.filterCampaign.offset += 1;
    this.findCampaign(this.filterCampaign);
    return;

  }

  private findCampaign(filterCampaign: FilterCampaign) {
    this.authService.findCampaign(filterCampaign)
      .subscribe(res => {
        res && (this.responseCampaignToken = res)
      })
  }

  handlerStatus(status: number) {
    return SystemUtil.handlerStatus(status);
  }

  handlerDateTime(date: string) {
    return SystemUtil.handlerDateTime(date)
  }

  uploadImage($event: any) {
    this.isLoadImage = false;
    this.apiService.uploadImage($event.target.files[0])
      .subscribe(res => {
        res && (this.image = res.data);
        this.validateForm.controls['image'].setValue(this.image);
        this.isLoadImage = true;
      })
  }

  uploadAvatar($event: any) {
    this.isLoadImage = false;
    this.apiService.uploadImage($event.target.files[0])
      .subscribe(res => {
        res && (this.avatar = res.data);
        this.isLoadImage = true;
      })
  }

  btnCreateCampaign() {
    if (this.validateForm.valid) {
      this.createCampaign(this.validateForm.value);
    } else {
      this.handlerErrorMessageFormCreateCampaign();
    }
  }

  btnResetFormCampaign() {
  }

  createCampaign(request: CampaignRequest) {
    this.apiService.createCampaign(request)
      .subscribe(
        res => {
          if (res.status) {
            this.alertService.success(res.message)
            this.findCampaign(this.filterCampaign);
          } else {
            this.alertService.error(res.message)
          }
        },
        error => this.alertService.error(error)
      )
  }

  changeEndDate($event: any) {
    if ($event.target.value) {
      this.validateForm.controls['endDate'].setValue($event.target.value)
    }
  }

  changeStartDate($event: any) {
    if ($event.target.value) {
      this.validateForm.controls['startDate'].setValue($event.target.value)
    }
  }

  handlerErrorMessageFormCreateCampaign() {
    if (this.validateForm.controls['title'].invalid) {
      this.messageError.errorTitle = "Title is required";
    } else {
      this.messageError.errorTitle = "";
    }

    if (this.validateForm.controls['startDate'].invalid) {
      this.messageError.errorStartDate = "Start date is required";
    } else {
      this.messageError.errorStartDate = "";
    }

    if (this.validateForm.controls['endDate'].invalid) {
      this.messageError.errorEndDate = "End date is required";
    } else {
      this.messageError.errorEndDate = "";
    }

    if (!this.validateForm.controls['startDate'].invalid && !this.validateForm.controls['endDate'].invalid) {
      let startDate = new Date(this.validateForm.controls['startDate'].value);
      let endDate = new Date(this.validateForm.controls['endDate'].value);
      if (endDate.getTime() - startDate.getTime() <= 0) {
        this.messageError.errorEndDate = "End date must be greater than start date";
      } else {
        this.messageError.errorEndDate = "";
      }
    }

    if (this.validateForm.controls['targetAmount'].invalid) {
      this.messageError.errorTargetAmount = "Target amount is required";
    } else {
      this.messageError.errorTargetAmount = "";
    }

    if (this.validateForm.controls['categoryId'].invalid) {
      this.messageError.errorCategoryId = "Category is required";
    } else {
      this.messageError.errorCategoryId = "";
    }

    if (this.validateForm.controls['description'].invalid) {
      this.messageError.errorDescription = "Description is required";
    } else {
      this.messageError.errorDescription = "";
    }

    if (this.validateForm.controls['image'].invalid) {
      this.messageError.errorImage = "Image is required";
    } else {
      this.messageError.errorImage = "";
    }

    if (this.validateForm.controls['detail'].invalid) {
      this.messageError.errorDetail = "Detail is required";
    } else {
      this.messageError.errorDetail = "";
    }
  }

  chosenFile() {
    let file = document.getElementById('fileChosen') as HTMLInputElement;
    file.click();
  }
}
