export const POSITIVE_WORDS = [
    'happy', 'joy', 'joyful', 'excited', 'love', 'loved', 'great', 'awesome', 'amazing',
    'good', 'best', 'fantastic', 'inspired', 'hope', 'hopeful', 'calm', 'peace', 'peaceful',
    'grateful', 'blessed', 'content', 'radiant', 'wonderful', 'clarity'
];

export const NEGATIVE_WORDS = [
    'sad', 'unhappy', 'depressed', 'anxious', 'worried', 'nervous', 'angry', 'mad',
    'frustrated', 'tired', 'exhausted', 'bad', 'terrible', 'awful', 'lonely', 'broken',
    'pain', 'hurt', 'fear', 'afraid', 'overwhelmed', 'stress', 'stressed'
];

export const analyzeSentiment = (text) => {
    if (!text) return 'neutral';

    const tokens = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    let score = 0;

    tokens.forEach(word => {
        if (POSITIVE_WORDS.includes(word)) score++;
        if (NEGATIVE_WORDS.includes(word)) score--;
    });

    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
};
