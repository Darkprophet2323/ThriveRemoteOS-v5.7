import React, { useState, useEffect } from 'react';

const CompactCMS = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [content, setContent] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', url: '', category: 'ai_jobs', description: '' });

  useEffect(() => {
    // Load existing content from localStorage
    const savedContent = localStorage.getItem('thriveOS_cms_content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const saveContent = (updatedContent) => {
    setContent(updatedContent);
    localStorage.setItem('thriveOS_cms_content', JSON.stringify(updatedContent));
  };

  const addItem = () => {
    if (newItem.title && newItem.url) {
      const item = {
        id: Date.now(),
        ...newItem,
        dateAdded: new Date().toLocaleDateString()
      };
      const updatedContent = [...content, item];
      saveContent(updatedContent);
      setNewItem({ title: '', url: '', category: 'ai_jobs', description: '' });
    }
  };

  const deleteItem = (id) => {
    const updatedContent = content.filter(item => item.id !== id);
    saveContent(updatedContent);
  };

  const categories = {
    ai_jobs: '🤖 AI Jobs',
    tools: '🔧 Tools',
    resources: '📚 Resources',
    news: '📰 News'
  };

  return (
    <div style={{
      padding: '15px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      height: '100%',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      fontSize: '0.85rem',
      overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '1px solid #dee2e6'
      }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: '300',
          color: '#495057',
          margin: '0 0 5px 0',
          letterSpacing: '0.5px'
        }}>
          📝 Content Manager
        </h3>
        <p style={{
          fontSize: '0.7rem',
          color: '#6c757d',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Manage Platform Content
        </p>
      </div>

      {/* Compact Tabs */}
      <div style={{
        display: 'flex',
        marginBottom: '15px',
        background: '#e9ecef',
        borderRadius: '8px',
        padding: '3px'
      }}>
        {[
          { id: 'content', label: 'Content', icon: '📄' },
          { id: 'add', label: 'Add New', icon: '➕' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              color: activeTab === tab.id ? '#495057' : '#6c757d',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === tab.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div>
          <div style={{
            marginBottom: '15px',
            padding: '10px',
            background: '#fff',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#495057' }}>
                Content Items ({content.length})
              </span>
              <div style={{
                width: 0,
                height: 0,
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderBottom: '6px solid #6c757d'
              }} />
            </div>
          </div>

          <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {content.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: '#6c757d',
                fontSize: '0.8rem'
              }}>
                No content items yet. Add some using the "Add New" tab.
              </div>
            ) : (
              content.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: '#fff',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '6px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h5 style={{
                        margin: '0 0 4px 0',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#495057'
                      }}>
                        {item.title}
                      </h5>
                      <div style={{
                        fontSize: '0.65rem',
                        color: '#6c757d',
                        marginBottom: '4px'
                      }}>
                        {categories[item.category]} • {item.dateAdded}
                      </div>
                      {item.description && (
                        <p style={{
                          margin: '0 0 6px 0',
                          fontSize: '0.7rem',
                          color: '#6c757d',
                          lineHeight: '1.3'
                        }}>
                          {item.description}
                        </p>
                      )}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.65rem',
                          color: '#495057',
                          textDecoration: 'none',
                          borderBottom: '1px solid #dee2e6'
                        }}
                      >
                        🔗 {item.url.length > 30 ? item.url.substring(0, 30) + '...' : item.url}
                      </a>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc3545',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        marginLeft: '8px'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f8d7da'}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add New Tab */}
      {activeTab === 'add' && (
        <div>
          <div style={{
            background: '#fff',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '15px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                fontWeight: '600',
                color: '#495057',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}>
                Title
              </label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6c757d'}
                onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                placeholder="Enter title..."
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                fontWeight: '600',
                color: '#495057',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}>
                URL
              </label>
              <input
                type="url"
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6c757d'}
                onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                placeholder="https://..."
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                fontWeight: '600',
                color: '#495057',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}>
                Category
              </label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  outline: 'none',
                  background: '#fff'
                }}
              >
                {Object.entries(categories).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                fontWeight: '600',
                color: '#495057',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}>
                Description (Optional)
              </label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '60px',
                  maxHeight: '100px',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6c757d'}
                onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                placeholder="Brief description..."
              />
            </div>

            <button
              onClick={addItem}
              disabled={!newItem.title || !newItem.url}
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                background: newItem.title && newItem.url ? 'linear-gradient(135deg, #6c757d, #495057)' : '#e9ecef',
                color: newItem.title && newItem.url ? '#fff' : '#6c757d',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: newItem.title && newItem.url ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (newItem.title && newItem.url) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              ➕ Add Content
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactCMS;