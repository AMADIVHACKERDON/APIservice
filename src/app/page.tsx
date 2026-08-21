"use client";
import { useState, useEffect } from 'react';

export type Person = {
  id: number;
  name: string;
  role: string;
  about: string;
  cvDetails: string;
  professionals: string;
  email: string;
  phone: string;
};

export type Category = {
  id: number;
  name: string;
  category: string;
  relatedIds: number[];
  expertId: number;
};

// Response structure matching our API contract
interface ApiResponse {
  success: boolean;
  mode: 'all_categories' | 'search_results';
  data?: Category[]; // populated in 'all_categories' mode
  matchedCategory?: Category | null;
  assignedExpert?: Person | null;
  relatedCategories?: Category[];
}

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch from our Route Handler whenever the search query changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?search=${encodeURIComponent(query)}`);
        const data: ApiResponse = await res.json();
        setApiData(data);
      } catch (err) {
        console.error("Failed fetching data from API:", err);
      } finally {
        setLoading(false);
      }
    };

    // Tiny optimization: only debounce slightly if there is an active search query
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, query ? 250 : 0);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const matchedCategory = apiData?.matchedCategory;
  const assignedExpert = apiData?.assignedExpert;
  const relatedCategories = apiData?.relatedCategories || [];
  const defaultCategories = apiData?.data || [];

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      {/* Search Input Container */}
      <div style={{ marginBottom: '24px', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search categories (e.g., Next.js, Tailwind)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '12px 40px 12px 16px', fontSize: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#475569'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            ✕
          </button>
        )}
      </div>

      {loading && <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center' }}>Loading dynamic records...</p>}

      {!loading && (
        <>
          {/* NO SEARCH STATE: Display all categories */}
          {!query && defaultCategories.length > 0 && (
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available Tech Categories</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {defaultCategories.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setQuery(item.name)}
                    style={{ padding: '14px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '16px', color: '#0f172a' }}>{item.name}</strong>
                      <span style={{ fontSize: '11px', backgroundColor: '#e2e8f0', color: '#334155', padding: '2px 6px', borderRadius: '4px', fontWeight: '500', textTransform: 'uppercase' }}>{item.category}</span>
                    </div>
                    <p style={{ margin: '0', fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>
                      Explore core internal documentation, system architectures, and connect directly with the verified engineering expert for {item.name}.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH MATCH STATE */}
          {query && matchedCategory && (
            <div>
              {/* Main Category Info */}
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginBottom: '20px' }}>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>{matchedCategory.name}</h2>
                <span style={{ fontSize: '14px', color: '#64748b', textTransform: 'uppercase', fontWeight: '500' }}>{matchedCategory.category}</span>
              </div>

              {/* Expert Profile Block */}
              {assignedExpert && (
                <div style={{ padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#166534', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {matchedCategory.expertId === 999 ? "Default Assignment" : "Category Expert Profile"}
                  </h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#14532d' }}>{assignedExpert.name}</div>
                    <div style={{ fontSize: '14px', color: '#166534', fontWeight: '500' }}>{assignedExpert.role}</div>
                  </div>

                  <div style={{ display: 'grid', gap: '12px', fontSize: '14px', color: '#1e3a1e' }}>
                    <div>
                      <strong>About:</strong>
                      <p style={{ margin: '4px 0 0 0', color: '#2f5233', lineHeight: '1.4' }}>{assignedExpert.about}</p>
                    </div>

                    <div>
                      <strong>CV Background:</strong>
                      <p style={{ margin: '4px 0 0 0', color: '#2f5233', lineHeight: '1.4' }}>{assignedExpert.cvDetails}</p>
                    </div>

                    <div>
                      <strong>Professionals & Credentials:</strong>
                      <p style={{ margin: '4px 0 0 0', color: '#2f5233', lineHeight: '1.4' }}>{assignedExpert.professionals}</p>
                    </div>

                    <div style={{ marginTop: '4px', paddingTop: '12px', borderTop: '1px dashed #bbf7d0', display: 'flex', gap: '16px', fontSize: '13px' }}>
                      <div>
                        <strong>Email:</strong> <a href={`mailto:${assignedExpert.email}`} style={{ color: '#166534', textDecoration: 'none', fontWeight: '500' }}>{assignedExpert.email}</a>
                      </div>
                      <div>
                        <strong>Phone:</strong> <span style={{ color: '#166534', fontWeight: '500' }}>{assignedExpert.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Topics Section */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Related Topics</h3>
                {relatedCategories.length !== 0 ? (
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'grid', gap: '8px' }}>
                    {relatedCategories.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => setQuery(item.name)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: '14px', color: '#334155', cursor: 'pointer', transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      >
                        <span style={{ fontWeight: '500' }}>{item.name}</span>
                        <span style={{ fontSize: '12px', backgroundColor: '#cbd5e1', color: '#1e293b', padding: '2px 8px', borderRadius: '4px' }}>{item.category}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0' }}>No related categories found.</p>
                )}
              </div>
            </div>
          )}

          {/* SEARCH WITH NO RESULTS STATE */}
          {query && !matchedCategory && (
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginTop: '20px' }}>
              No results found for "{query}")
            </p>)}
        </>)}
    </div>
  )
}

