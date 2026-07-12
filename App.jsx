import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './context/AuthContext';
import { t } from './data/helpers';
import TabBar from './components/TabBar';
import PostCard from './components/PostCard';
import CreatePostForm from './components/CreatePostForm';
import CommentSection from './components/CommentSection';
import ProfileView from './components/ProfileView';
import LanguageSelector from './components/LanguageSelector';
import AIAnalysis from './components/AIAnalysis';

export default function App() {
  const { user, accessToken, login, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('feed');
  const [uiLang, setUiLang] = useState('en');
  const [postLang, setPostLang] = useState('en');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showCreate, setShowCreate] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [commentPostId, setCommentPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [translatedCache, setTranslatedCache] = useState({});

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const headers = {};
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
      const res = await fetch('/api/posts', { headers });
      if (!res.ok) throw new Error('Failed to load posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Failed to load posts.');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const patchPost = async (id, action) => {
    try {
      const headers = {};
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
      const res = await fetch(`/api/posts/${id}/${action}`, { method: 'PATCH', headers });
      if (!res.ok) return;
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch (err) {
      console.error(`Failed to ${action} post`, err);
    }
  };

  const openComments = async (postId) => {
    setCommentPostId(postId);
    try {
      const res = await fetch(`/api/comments/${postId}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Failed to load comments', err);
      setComments([]);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '12px 16px', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h1 style={{ margin: 0, fontSize: 22, color: '#166534' }}>🌍 Lisha Dunia</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => setShowLanguage(true)} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer' }}>🌐</button>
          <button onClick={() => setShowProfile(true)} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer' }}>👤</button>
          {user ? (
            <button onClick={logout} style={{ border: 'none', background: '#e5e7eb', color: '#374151', padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer' }}>Logout</button>
          ) : (
            <button onClick={login} style={{ border: 'none', background: '#166534', color: '#fff', padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer' }}>Sign in with Pi</button>
          )}
        </div>
      </div>

      <TabBar active={activeTab} onTabChange={setActiveTab} uiLang={uiLang} />

      {activeTab === 'ai-analysis' ? (
        <AIAnalysis uiLang={uiLang} />
      ) : (
        <>
          {user && (
            <button
              onClick={() => setShowCreate(true)}
              style={{
                width: '100%', marginBottom: 16, border: 'none', background: '#166534',
                color: '#fff', padding: '10px', borderRadius: 12, cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              + {t(uiLang, 'newPost')}
            </button>
          )}

          {loading && <p style={{ textAlign: 'center', color: '#888' }}>Loading...</p>}
          {error && <p style={{ textAlign: 'center', color: '#DC2626' }}>{error}</p>}

          {!loading && !error && posts.length === 0 && (
            <p style={{ textAlign: 'center', color: '#888' }}>No posts yet.</p>
          )}

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              uiLang={uiLang}
              postLang={postLang}
              translatedCache={translatedCache}
              onLike={() => patchPost(post.id, 'like')}
              onSave={() => patchPost(post.id, 'save')}
              onBookmark={() => patchPost(post.id, 'bookmark')}
              onRepost={() => patchPost(post.id, 'repost')}
              onTranslate={() => setPostLang((cur) => (cur === 'en' ? uiLang : 'en'))}
              onOpenShare={() => {}}
              onOpenComment={() => openComments(post.id)}
              onAuthorClick={() => setShowProfile(true)}
              onSubscribeToUser={() => {}}
            />
          ))}
        </>
      )}

      {showCreate && (
        <CreatePostForm
          onClose={() => setShowCreate(false)}
          onSubmit={handleNewPost}
          uiLang={uiLang}
        />
      )}

      {commentPostId !== null && (
        <CommentSection
          postId={commentPostId}
          comments={comments}
          onClose={() => setCommentPostId(null)}
          uiLang={uiLang}
        />
      )}

      {showProfile && (
        <ProfileView onClose={() => setShowProfile(false)} uiLang={uiLang} />
      )}

      {showLanguage && (
        <LanguageSelector
          current={uiLang}
          onSelect={(code) => { setUiLang(code); setShowLanguage(false); }}
          onClose={() => setShowLanguage(false)}
        />
      )}
    </div>
  );
}
