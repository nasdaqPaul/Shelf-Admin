
export interface SeriesArticle {
  id: string,
  source?: any
}
export interface Series {
  id?: string;
  title: string;
  description: any;
  updated: Date;
  created: Date;
  articles: SeriesArticle[]

}
