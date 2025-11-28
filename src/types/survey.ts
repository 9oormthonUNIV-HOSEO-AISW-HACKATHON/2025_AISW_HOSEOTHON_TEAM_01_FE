// Survey related types
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
