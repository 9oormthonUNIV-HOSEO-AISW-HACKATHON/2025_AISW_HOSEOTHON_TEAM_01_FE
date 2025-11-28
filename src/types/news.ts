// News related types
export interface NewsItem {
    newsId: number;
    title: string;
    thumbnailUrl: string;
    category: string;
    latestTime: string;
    content?: string;
}

export interface NewsListResponse {
    newsList: NewsItem[];
}

export interface NewsDetailResponse {
    title: string;
    thumbnailUrl: string;
    category: string;
    latestTime: string;
    content: string;
    reportBlur: boolean;
}
