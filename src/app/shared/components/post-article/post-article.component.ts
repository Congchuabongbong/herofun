import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import {ResponseArticle} from "../../entity/Modal";
import {SystemUtil} from "../../utils/SystemUtil";

@Component({
  selector: 'app-post-article',
  templateUrl: './post-article.component.html',
  styleUrls: ['./post-article.component.scss']
})
export class PostArticleComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private router: Router,
              private articleService: ArticleService
              ) { }

  responseArticle!: ResponseArticle;
  idCampaign!: any;
  limit = 3;
  offset = 1;
  isArticle = false;
  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    if (!id){
      this.router.navigate(['/home']).then(r => console.log(r))
    }
    this.idCampaign = id;
    this.getPageArticleByCampaignId();

  }

  getPageArticleByCampaignId(){
    this.articleService.getPageArticleByCampaignId(this.idCampaign, this.offset, this.limit)
      .subscribe(res => {
        res && (this.responseArticle = res)
        if (res && res.items > 0){
          this.isArticle = true;
        }
      })
  }

  handlerTimeAPostArticle(d:string){
    return SystemUtil.getTimeArticle(d)
  }

}
