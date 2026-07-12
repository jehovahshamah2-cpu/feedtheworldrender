// Msingi wa constants za app - unaweza kuongeza zaidi baadaye
// LANGUAGES: orodha ya lugha zinazoonekana kwenye LanguageSelector
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

// TABS: vichupo vya juu vya app (TabBar inatumia hii)
export const TABS = [
  { id: 'feed', icon: '🏠', labelKey: 'feed', label: 'Feed' },
  { id: 'recipes', icon: '🍲', labelKey: 'recipes', label: 'Recipes' },
  { id: 'wellness', icon: '🌿', labelKey: 'wellness', label: 'Wellness' },
  { id: 'fitness', icon: '💪', labelKey: 'fitness', label: 'Fitness' },
  { id: 'tips', icon: '💡', labelKey: 'tips', label: 'Tips' },
  { id: 'stories', icon: '📖', labelKey: 'stories', label: 'Stories' },
  { id: 'ai-analysis', icon: '🔬', labelKey: 'aiAnalysis', label: 'AI Analysis' },
  { id: 'saved', icon: '🔖', labelKey: 'saved', label: 'Saved' },
];

// CREATE_TYPES: aina za post zinazoweza kuundwa (CreatePostForm hatua ya 1)
export const CREATE_TYPES = ['Recipe', 'Tip', 'Story', 'Question'];

// CATEGORY_GUIDE: maelezo ya kila aina, ikitumika kuongoza mtumiaji kuandika post
export const CATEGORY_GUIDE = {
  Recipe: {
    icon: '🍲',
    hint: 'Share a traditional recipe passed down in your family or community.',
    titlePlaceholder: 'e.g. Moringa & Millet Porridge',
    bodyPlaceholder: 'Describe the ingredients, steps, and story behind this recipe...',
  },
  Tip: {
    icon: '💡',
    hint: 'Share a practical wellness or lifestyle tip.',
    titlePlaceholder: 'e.g. How to store herbs longer',
    bodyPlaceholder: 'Explain your tip in detail...',
  },
  Story: {
    icon: '📖',
    hint: 'Share a personal story related to food, health, or tradition.',
    titlePlaceholder: 'e.g. What my grandmother taught me',
    bodyPlaceholder: 'Tell your story...',
  },
  Question: {
    icon: '❓',
    hint: 'Ask the community a question.',
    titlePlaceholder: 'e.g. Best remedy for a cold?',
    bodyPlaceholder: 'Describe your question in detail...',
  },
};
