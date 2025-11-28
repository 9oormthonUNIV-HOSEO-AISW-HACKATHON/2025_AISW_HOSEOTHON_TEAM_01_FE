import api from './api';
import type { NewsItem } from '../types/news';

export interface MyPageResponse {
    nickName: string;
    generation: string;
    id: string;
}

export interface ReportResponse {
    participation: number;
    mostCategory: string;
    newsList: NewsItem[];
}

export const userService = {
    // GET /api/v1/myPage -> /myPage
    getMyPage: async (): Promise<MyPageResponse> => {
        const response = await api.get<MyPageResponse>('/myPage');
        return response.data;
    },

    // GET /api/v1/report -> /report
    getReport: async (): Promise<ReportResponse> => {
        const response = await api.get<ReportResponse>('/report');
        return response.data;
    },
};
