import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import {Article, Comment, ResponseArticle} from "../../entity/Modal";
import {SystemUtil} from "../../utils/SystemUtil";
import {CommentService} from "../../services/comment.service";


@Component({
  selector: 'app-post-article',
  templateUrl: './post-article.component.html',
  styleUrls: ['./post-article.component.scss']
})
export class PostArticleComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private router: Router,
              private articleService: ArticleService,
              private commentService: CommentService
  ) {
  }

  responseArticle!: ResponseArticle;
  idCampaign!: any;
  limit = 3;
  offset = 1;
  articles!: Article[];
  defaultImage = './assets/img/ic_avatar1.png';
  content: any;


  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/home']).then(r => console.log(r))
    }
    this.idCampaign = id;
    this.getPageArticleByCampaignId();

  }

  getPageArticleByCampaignId() {
    this.articleService.getPageArticleByCampaignId(this.idCampaign, this.offset, this.limit)
      .subscribe(res => {
        res && (this.responseArticle = res);
        this.articles = this.responseArticle.items;
      })
  }

  handlerTimeAPostArticle(d: string, type: number) {
    return SystemUtil.getTimeArticle(d, type)
  }


  loadMore() {

  }

  handlerLimitComment(comments: Comment[]): Comment[] {
    let result: Comment[] = [];
    comments.forEach((comments, index) => {
      if (index < 3) {
        result.push(comments)
      }
    });
    return result;
  }



  handlerTimePost(d: string){
    return SystemUtil.handlerDateTime(d);
  }
}
