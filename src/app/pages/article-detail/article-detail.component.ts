import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Article, Comment, ResponseComment} from "../../shared/entity/Modal";
import {ArticleService} from "../../shared/services/article.service";
import {SystemUtil} from "../../shared/utils/SystemUtil";
import {CommentService} from "../../shared/services/comment.service";
import {AlertService} from "../../shared/services/alert.service";
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private alertService: AlertService,
    private router: Router,
  ) {
  }

  id: any;
  idCampaign: any;
  offset = 1;
  limit = 3;

  article!: Article;
  articles!: Article[];
  comments!: Comment[];
  responseComment!: ResponseComment;
  defaultImage = './assets/img/ic_avatar1.png';
  content: any;
  profile: any;

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    let jwt = localStorage.getItem('jwt')
    if (!id) {
      this.router.navigate(['/404']).then();
    }
    if (jwt){

    }
    this.id = id
    this.getArticleDetail();
    this.getCommentByArticleId();

  }

  getArticleDetail() {
    this.articleService.getArticleDetail(this.id)
      .subscribe(
        article => {
          article && (this.article = article);
          article && this.getThreeAnotherArticleByIdAndCampaignId(article.campaignId, article.id);
        },
        () => this.router.navigate(['/404'])
      )
  }

  getCommentByArticleId() {
    this.commentService.getCommentByArticleId(this.id, this.offset, this.limit)
      .subscribe(
        res => {
          res && (this.responseComment = res)
          res && (this.comments = res.items);

        },
        (e) => console.log(e)
      )
  }

  handlerTimeCreateAt(d: string) {
    return SystemUtil.handlerDateTime(d);
  }

  handlerTimeAPostArticle(d: string, type: number) {
    return SystemUtil.getTimeArticle(d, type)
  }

  loadMore() {
    this.offset++;
    if (this.offset > this.responseComment.totalPages) {
      return;
    }
    this.commentService.getCommentByArticleId(this.id, this.offset, this.limit)
      .subscribe(res => {
        res && (this.responseComment = res);
        this.comments.push(...res.items);
      })
  }

  submitComment() {
    let jwt = JSON.parse(localStorage.getItem("jwt")!);
    if (!jwt) {
      this.alertService.success("Vui lòng đăng nhập để bình luận!")
      return;
    }
    this.postComment(this.id, this.content);
    this.content = "";
  }

  postComment(articleId: any, content: string) {
    this.commentService.postComment(articleId, content)
      .subscribe(res => {
        if (res && res.status === true) {
          this.getCommentByArticleId();
        }
      })
  }

  getThreeAnotherArticleByIdAndCampaignId(campaignId: any, articleId: any){
    this.articleService.getThreeAnotherArticleByIdAndCampaignId(campaignId, articleId)
      .subscribe(res => res && (this.articles = res))
  }
}
