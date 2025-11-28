import api from './api';
import type {
    NewsItem,
    NewsListResponse,
    NewsDetailResponse,
    SurveyQuestion,
    SurveyAnswerRequest,
    SurveyStatisticsResponse,
} from '../types';

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

// Re-export types for backward compatibility
export type {
    NewsItem,
    NewsListResponse,
    NewsDetailResponse,
    SurveyQuestion,
    SurveyAnswerRequest,
    SurveyStatisticsResponse
};
