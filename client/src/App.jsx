import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [expandedStory, setExpandedStory] = useState(null);

  // Custom icons as SVG components
  const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );

  const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
    </svg>
  );

  const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"></path>
      <path d="M22 2 11 13"></path>
    </svg>
  );

  const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );

  // Fetch existing stories on mount
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stories");
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    
    fetchStories();
  }, []);

  // Handle story generation
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/stories/generate", { prompt });
      setStories([response.data.story, ...stories]);
      setPrompt("");
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const toggleExpandStory = (id) => {
    setExpandedStory(expandedStory === id ? null : id);
  };

  // Custom styles based on theme
  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: theme === 'dark' ? '#121826' : '#f5f7fa',
      color: theme === 'dark' ? '#e2e8f0' : '#334155',
      fontFamily: 'Arial, sans-serif',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    nav: {
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      boxShadow: theme === 'dark' ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    logoIcon: {
      color: '#3b82f6',
      height: '24px',
      width: '24px',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
    },
    themeToggle: {
      padding: '8px',
      borderRadius: '50%',
      backgroundColor: theme === 'dark' ? '#334155' : '#e2e8f0',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
    },
    main: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '24px',
    },
    createSection: {
      marginBottom: '32px',
      padding: '24px',
      borderRadius: '8px',
      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      boxShadow: theme === 'dark' ? 'none' : '0 4px 6px rgba(0,0,0,0.1)',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',
    },
    sectionHeaderIcon: {
      marginRight: '8px',
      height: '20px',
      width: '20px',
      color: '#8b5cf6',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: 0,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      resize: 'none',
      border: theme === 'dark' ? '1px solid #334155' : '1px solid #cbd5e1',
      backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc',
      color: theme === 'dark' ? '#e2e8f0' : '#334155',
      fontSize: '16px',
      outline: 'none',
    },
    textareaFocus: {
      boxShadow: '0 0 0 2px #3b82f6',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    generateButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      background: prompt.trim() ? 'linear-gradient(to right, #3b82f6, #8b5cf6)' : '#94a3b8',
      color: '#ffffff',
      fontWeight: '500',
      cursor: prompt.trim() ? 'pointer' : 'not-allowed',
      opacity: prompt.trim() ? '1' : '0.7',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
    },
    generateButtonHover: {
      opacity: '0.9',
      transform: 'translateY(-1px)',
    },
    buttonIcon: {
      marginRight: '8px',
      height: '16px',
      width: '16px',
    },
    spinner: {
      height: '16px',
      width: '16px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px',
    },
    storiesHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px',
    },
    storiesTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginRight: '8px',
      margin: 0,
    },
    storiesCount: {
      fontSize: '14px',
      padding: '4px 8px',
      borderRadius: '9999px',
      backgroundColor: theme === 'dark' ? '#334155' : '#e2e8f0',
    },
    emptyState: {
      padding: '48px',
      borderRadius: '8px',
      textAlign: 'center',
      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      boxShadow: theme === 'dark' ? 'none' : '0 4px 6px rgba(0,0,0,0.1)',
    },
    emptyStateIcon: {
      display: 'inline-block',
      padding: '16px',
      borderRadius: '50%',
      backgroundColor: '#dbeafe',
      color: '#3b82f6',
      marginBottom: '16px',
    },
    emptyStateTitle: {
      fontSize: '18px',
      fontWeight: '500',
      marginBottom: '8px',
    },
    emptyStateText: {
      color: theme === 'dark' ? '#94a3b8' : '#64748b',
    },
    storyList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    storyCard: {
      padding: '24px',
      borderRadius: '8px',
      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      boxShadow: theme === 'dark' ? 'none' : '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    storyCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 10px 15px rgba(0,0,0,0.1)',
    },
    storyHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px',
    },
    storyTitle: {
      display: 'flex',
      alignItems: 'center',
    },
    storyIconContainer: {
      padding: '8px',
      marginRight: '12px',
      borderRadius: '6px',
      backgroundColor: theme === 'dark' ? '#1e40af' : '#dbeafe',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    storyIcon: {
      height: '16px',
      width: '16px',
      color: theme === 'dark' ? '#93c5fd' : '#3b82f6',
    },
    storyPrompt: {
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '500px',
      margin: 0,
    },
    storyTimestamp: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: theme === 'dark' ? '#94a3b8' : '#64748b',
    },
    timestampIcon: {
      marginRight: '4px',
      height: '12px',
      width: '12px',
    },
    storyContent: {
      marginTop: '12px',
      color: theme === 'dark' ? '#cbd5e1' : '#334155',
      lineHeight: '1.6',
      overflow: expandedStory ? 'visible' : 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: expandedStory ? 'none' : 3,
      WebkitBoxOrient: 'vertical',
    },
    storyActions: {
      marginTop: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    readMoreButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      color: theme === 'dark' ? '#60a5fa' : '#2563eb',
      cursor: 'pointer',
      padding: 0,
    },
    readMoreButtonHover: {
      color: theme === 'dark' ? '#93c5fd' : '#1d4ed8',
      textDecoration: 'underline',
    },
    saveButton: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      padding: '4px 12px',
      borderRadius: '6px',
      backgroundColor: theme === 'dark' ? '#334155' : '#e2e8f0',
      color: theme === 'dark' ? '#cbd5e1' : '#475569',
      border: 'none',
      cursor: 'pointer',
    },
    saveButtonHover: {
      backgroundColor: theme === 'dark' ? '#475569' : '#cbd5e1',
    },
    saveButtonIcon: {
      marginRight: '4px',
      height: '12px',
      width: '12px',
    },
    footer: {
      marginTop: '48px',
      padding: '24px',
      textAlign: 'center',
      backgroundColor: theme === 'dark' ? '#1e293b' : '#e2e8f0',
      color: theme === 'dark' ? '#94a3b8' : '#64748b',
      fontSize: '14px',
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  };

  // State for hover effects
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredStory, setHoveredStory] = useState(null);
  const [focusedTextarea, setFocusedTextarea] = useState(false);
  const [hoveredReadMore, setHoveredReadMore] = useState(null);
  const [hoveredSave, setHoveredSave] = useState(null);

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <BookOpenIcon />
          <h1 style={styles.logoText}>StoryForge AI</h1>
        </div>
        
        <button 
          onClick={toggleTheme} 
          style={styles.themeToggle}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </nav>
      
      <main style={styles.main}>
        <div style={styles.createSection}>
          <div style={styles.sectionHeader}>
            <SparklesIcon style={styles.sectionHeaderIcon} />
            <h2 style={styles.sectionTitle}>Create Your Story</h2>
          </div>
          
          <form onSubmit={handleGenerate} style={styles.form}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Start your story here..."
              rows="4"
              style={{
                ...styles.textarea,
                ...(focusedTextarea ? styles.textareaFocus : {})
              }}
              onFocus={() => setFocusedTextarea(true)}
              onBlur={() => setFocusedTextarea(false)}
            />
            
            <div style={styles.buttonContainer}>
              <button 
                type="submit" 
                disabled={loading || !prompt.trim()} 
                style={{
                  ...styles.generateButton,
                  ...(hoveredButton === 'generate' && prompt.trim() ? styles.generateButtonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('generate')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {loading ? (
                  <>
                    <div style={styles.spinner}></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <SendIcon style={styles.buttonIcon} />
                    Generate Story
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div style={styles.storiesHeader}>
          <h2 style={styles.storiesTitle}>Your Stories</h2>
          <span style={styles.storiesCount}>
            {stories.length}
          </span>
        </div>
        
        {stories.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyStateIcon}>
              <BookOpenIcon />
            </div>
            <h3 style={styles.emptyStateTitle}>No stories yet</h3>
            <p style={styles.emptyStateText}>
              Your creative journey starts with a prompt. Write something above to begin!
            </p>
          </div>
        ) : (
          <div style={styles.storyList}>
            {stories.map((story) => (
              <div 
                key={story._id} 
                style={{
                  ...styles.storyCard,
                  ...(hoveredStory === story._id ? styles.storyCardHover : {})
                }}
                onMouseEnter={() => setHoveredStory(story._id)}
                onMouseLeave={() => setHoveredStory(null)}
              >
                <div style={styles.storyHeader}>
                  <div style={styles.storyTitle}>
                    <div style={styles.storyIconContainer}>
                      <SparklesIcon style={styles.storyIcon} />
                    </div>
                    <h3 style={styles.storyPrompt}>{story.prompt}</h3>
                  </div>
                  <div style={styles.storyTimestamp}>
                    <ClockIcon style={styles.timestampIcon} />
                    <span>{story.createdAt ? formatDate(story.createdAt) : ""}</span>
                  </div>
                </div>
                
                <div style={styles.storyContent}>
                  {story.content}
                </div>
                
                <div style={styles.storyActions}>
                  <button
                    onClick={() => toggleExpandStory(story._id)}
                    style={{
                      ...styles.readMoreButton,
                      ...(hoveredReadMore === story._id ? styles.readMoreButtonHover : {})
                    }}
                    onMouseEnter={() => setHoveredReadMore(story._id)}
                    onMouseLeave={() => setHoveredReadMore(null)}
                  >
                    {expandedStory === story._id ? "Show Less" : "Read More"}
                  </button>
                  
                  <button 
                    style={{
                      ...styles.saveButton,
                      ...(hoveredSave === story._id ? styles.saveButtonHover : {})
                    }}
                    onMouseEnter={() => setHoveredSave(story._id)}
                    onMouseLeave={() => setHoveredSave(null)}
                  >
                    <SaveIcon style={styles.saveButtonIcon} />
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer style={styles.footer}>
        <p>StoryForge AI &copy; {new Date().getFullYear()} — Unleash your creativity with AI-powered storytelling</p>
      </footer>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;