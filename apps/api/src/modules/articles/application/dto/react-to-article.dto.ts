import { IsIn } from 'class-validator';
import { ArticleReactionType } from '../../domain/entities/article-reaction.entity';

export class ReactToArticleDto {
  @IsIn(['like', 'fire'])
  reactionType!: ArticleReactionType;
}
