
export interface SeriesArticle {
  index: number,
  source?: any
}
export interface Series {
  index?: number;
  title: string;
  description: any;
  updated: Date;
  articles: SeriesArticle[]

}
