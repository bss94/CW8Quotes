export interface QuoteApi {
  text: string;
  category: string;
  author: string;
}

export interface QuotesApi {
  [id: string]: QuoteApi;
}

export interface Quote extends QuoteApi {
  id: string;
}