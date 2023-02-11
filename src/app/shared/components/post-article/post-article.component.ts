import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import {Article, ResponseArticle} from "../../entity/Modal";
import {SystemUtil} from "../../utils/SystemUtil";


@Component({
  selector: 'app-post-article',
  templateUrl: './post-article.component.html',
  styleUrls: ['./post-article.component.scss']
})
export class PostArticleComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private router: Router,
              private articleService: ArticleService
  ) {
  }

  responseArticle!: ResponseArticle;

  @Input()
  idCampaign!: any;
  limit = 3;
  offset = 1;
  articles!: Article[];
  defaultImage = './assets/img/ic_avatar1.png';
  content: any;


  ngOnInit(): void {
    this.getPageArticleByCampaignId();

  }

  getPageArticleByCampaignId() {
    this.articleService.getPageArticleByCampaignId(this.idCampaign, this.offset, this.limit)
      .subscribe(res => {
        res && (this.responseArticle = res);
        this.articles = this.responseArticle.items;
      })
  }
  handlerTimePost(d: string){
    return SystemUtil.handlerDateTime(d);
  }

  loadMore() {
    this.offset++
    if (this.offset > this.responseArticle.totalPages){
      return;
    }
    this.articleService.getPageArticleByCampaignId(this.idCampaign, this.offset, this.limit)
      .subscribe(res => {
        res && (this.responseArticle = res);
        this.articles.push(...this.responseArticle.items);
      })
  }
}
