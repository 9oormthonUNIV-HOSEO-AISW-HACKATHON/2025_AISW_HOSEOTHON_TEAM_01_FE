import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface NewsCardProps {
    category: string;
    time: string;
    title: string;
    imageUrl?: string;
    badgeText?: string;
    badgeColor?: string;
    badgeTextColor?: string;
    categoryColor?: string;
    categoryTextColor?: string;
    overlayInfo?: {
        title: string;
        price: string;
        change: string;
    };
    layout?: 'vertical' | 'horizontal';
}

export default function NewsCard({
    category,
    time,
    title,
    imageUrl,
    badgeText,
    badgeColor = '#FFF8E1',
    badgeTextColor = '#F57C00',
    categoryColor = '#E8F0FE',
    categoryTextColor = '#1A73E8',
    overlayInfo,
    layout = 'vertical'
}: NewsCardProps) {
    if (layout === 'horizontal') {
        return (
            <TouchableOpacity style={styles.horizontalContainer}>
                <View style={styles.horizontalImageContainer}>
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
                    ) : (
                        <View style={[styles.image, { backgroundColor: '#DDD' }]} />
                    )}
                </View>
                <View style={styles.horizontalContent}>
                    <View style={styles.headerRow}>
                        <View style={[styles.tag, { backgroundColor: categoryColor }]}>
                            <Text style={[styles.tagText, { color: categoryTextColor }]}>{category}</Text>
                        </View>
                        <Text style={styles.timeText}>{time}</Text>
                    </View>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                    {badgeText && (
                        <View style={[styles.badge, { backgroundColor: badgeColor, alignSelf: 'flex-start', marginTop: 4 }]}>
                            <Text style={[styles.badgeText, { color: badgeTextColor }]}>{badgeText}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.header}>
                <View style={styles.tagContainer}>
                    <View style={[styles.tag, { backgroundColor: categoryColor }]}>
                        <Text style={[styles.tagText, { color: categoryTextColor }]}>{category}</Text>
                    </View>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
                {badgeText && (
                    <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                        <Text style={[styles.badgeText, { color: badgeTextColor }]}>{badgeText}</Text>
                    </View>
                )}
            </View>

            <View style={styles.imageContainer}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={[styles.image, { backgroundColor: '#333' }]} />
                )}

                {overlayInfo && (
                    <View style={styles.overlay}>
                        <Text style={styles.overlayText}>{overlayInfo.title}</Text>
                        <Text style={styles.overlayPrice}>{overlayInfo.price}</Text>
                        <Text style={styles.overlayChange}>{overlayInfo.change}</Text>
                    </View>
                )}
            </View>

            <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    tagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
    },
    tagText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 12,
        color: '#888',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '100%',
        height: 160,
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        alignItems: 'center',
    },
    overlayText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    overlayPrice: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    overlayChange: {
        color: '#FF5252',
        fontSize: 14,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        lineHeight: 24,
    },
    // Horizontal layout styles
    horizontalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    horizontalImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 16,
    },
    horizontalContent: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
});
