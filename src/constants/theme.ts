export const COLORS = {
    primary: '#2948FF',
    primaryDark: '#001B94',
    background: '#F8F9FA',
    white: '#FFFFFF',
    black: '#000000',
    text: {
        primary: '#111',
        secondary: '#555',
        tertiary: '#888',
        disabled: '#C4C4C4',
    },
    border: '#E0E0E0',
    shadow: '#000',
    // Category colors
    category: {
        blue: {
            background: '#E8F0FE',
            text: '#1A73E8',
        },
        yellow: {
            background: '#FFF8E1',
            text: '#F57C00',
        },
    },
    error: '#FF5252',
    placeholder: '#DDD',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 30,
};

export const FONT_SIZES = {
    xs: 10,
    sm: 11,
    md: 12,
    base: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 24,
};

export const BORDER_RADIUS = {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 30,
};

export const SHADOWS = {
    small: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    medium: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    large: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
};
