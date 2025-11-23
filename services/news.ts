import api from './api';

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

export interface SurveyQuestion {
    surveyNum: number;
    surveyQuestion: string;
}

export interface SurveyAnswerRequest {
    newsId: string;
    q1Answer: string;
    q2Answer: string;
    q3Answer: string;
    q4Answer: string;
    q5Answer: string;
}

export interface GenerationAspect {
    generation: string;
    firstAspect: string;
    firstAspectReason: string;
    secondAspect: string;
    secondAspectReason: string;
    thirdAspect: string;
    thirdAspectReason: string;
}

export interface SurveyStatisticsResponse {
    newsId: number;
    commonAspect: string;
    aspectReason: string;
    generationAspectList: GenerationAspect[];
}

export const newsService = {
    // GET /News
    getNewsList: async (): Promise<NewsListResponse> => {
        const response = await api.get<NewsListResponse>('/News');
        return response.data;
    },

    // GET /News/[NewsId]
    getNewsDetail: async (newsId: number): Promise<NewsDetailResponse> => {
        const response = await api.get<NewsDetailResponse>(`/News/${newsId}`);
        return response.data;
    },

    // GET /api/v1/survey -> /survey (since base is /api/v1)
    getSurveyQuestions: async (): Promise<SurveyQuestion[]> => {
        const response = await api.get<SurveyQuestion[]>('/survey');
        return response.data;
    },

    // POST /api/v1/survey -> /survey
    submitSurveyAnswers: async (data: SurveyAnswerRequest): Promise<void> => {
        await api.post('/survey', data);
    },

    // GET /survey/statistics/{newsId}
    getSurveyStatistics: async (newsId: number): Promise<SurveyStatisticsResponse> => {
        const response = await api.get<SurveyStatisticsResponse>(`/survey/statistics/${newsId}`);
        return response.data;
    },

    // GET /survey/check/{newsId}
    checkSurveyParticipation: async (newsId: number): Promise<boolean> => {
        const response = await api.get<boolean>(`/survey/check/${newsId}`);
        return response.data;
    },
};
