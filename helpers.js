// Msingi wa tafsiri za UI (English + Kiswahili). Ongeza lugha zaidi hapa baadaye.
const UI_STRINGS = {
  en: {
    comment: 'Comments',
    addThoughts: 'Add your thoughts...',
    share: 'Share',
    newPost: 'New Post',
    title: 'Title',
    yourStory: 'Your Story',
    profile: 'Profile',
    feed: 'Feed',
    recipes: 'Recipes',
    wellness: 'Wellness',
    fitness: 'Fitness',
    tips: 'Tips',
    stories: 'Stories',
    aiAnalysis: 'AI Analysis',
    saved: 'Saved',
  },
  sw: {
    comment: 'Maoni',
    addThoughts: 'Andika mawazo yako...',
    share: 'Tuma',
    newPost: 'Chapisho Jipya',
    title: 'Kichwa',
    yourStory: 'Hadithi Yako',
    profile: 'Wasifu',
    feed: 'Mlisho',
    recipes: 'Mapishi',
    wellness: 'Ustawi',
    fitness: 'Mazoezi',
    tips: 'Vidokezo',
    stories: 'Hadithi',
    aiAnalysis: 'Uchambuzi wa AI',
    saved: 'Zilizohifadhiwa',
  },
};

// t(uiLang, key) - inarudisha neno kulingana na lugha ya UI iliyochaguliwa
// Ikiwa lugha au key haipo, inarudi kwa Kiingereza, kisha kwa key yenyewe
export function t(uiLang, key) {
  return (UI_STRINGS[uiLang] && UI_STRINGS[uiLang][key])
    || (UI_STRINGS.en && UI_STRINGS.en[key])
    || key;
}

// getTranslatedComment - stub ya msingi; kwa sasa inarudisha comment bila kubadilika.
// Baadaye unaweza kuiunganisha na /api/translate kutafsiri maoni kwa lugha ya postLang.
export function getTranslatedComment(comment, lang) {
  return comment;
}
