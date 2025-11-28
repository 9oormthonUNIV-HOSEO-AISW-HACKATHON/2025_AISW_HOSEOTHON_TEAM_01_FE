export const CATEGORIES = ['전체', '정치', '경제', '사회', '생활', 'IT'] as const;
export type Category = typeof CATEGORIES[number];

export const CATEGORY_EN_TO_KR: Record<string, string> = {
    POLITICS: '정치',
    ECONOMY: '경제',
    SOCIETY: '사회',
    LIFE: '생활',
    IT: 'IT',
    ALL: '전체',
};

export const CATEGORY_KR_TO_EN: Record<string, string> = {
    정치: 'POLITICS',
    경제: 'ECONOMY',
    사회: 'SOCIETY',
    생활: 'LIFE',
    IT: 'IT',
    전체: 'ALL',
};
