import { UserDto } from "interfaces/user/userDto";

export interface ArticleDto {
  id?: string;
  userId?: string;
  categoryId?: string;
  title: string;
  content: string;
  thumbnail?: string;
  slug?: string;
  keywords?: string;
  viewsCount?: number;
  commentCount?: number;
  publishedDate?: string;
  user?: UserDto;
  // category: CategoryDto;
  // comments: CommentDto[];
}
