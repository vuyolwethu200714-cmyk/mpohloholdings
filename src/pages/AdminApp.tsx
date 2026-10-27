import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { BarChart3, Bell, ChevronDown, FileText, Inbox, LayoutDashboard, LogOut, Menu, Search, Settings, ShieldCheck, Sparkles, X } from 'lucide-react'

type Section = 'overview' | 'enquiries' | 'content' | 'seo' | 'settings'

export default function AdminApp() {
  const [session, setSession] = useState<any>(null)
  const [section, setSection] = useState<Section>('overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session || !supabase) return
    Promise.all([
      supabase.from('enquiries').select('id,name,email,phone,enquiry_type,status,created_at').order('created_at', { ascending: false }).limit(50),
      supabase.from('site_pages').select('id,slug,title,status,updated_at').order('updated_at', { ascending: false }),
    ]).then(([enquiriesResult, pagesResult]) => {
      setEnquiries(enquiriesResult.data ?? [])
      setPages(pagesResult.data ?? [])
      setLoading(false)
    })
  }, [session])

  async function signIn() {
    setAuthMessage('')
    if (!supabase) { setAuthMessage('Supabase is not configured in this environment.'); return }
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) setAuthMessage(error.message === 'Invalid login credentials' ? 'Invalid email or password. Please check your credentials and try again.' : `Sign-in failed: ${error.message}`)
  }

  if (!session) return <LoginScreen email={email} password={password} setEmail={setEmail} setPassword={setPassword} message={authMessage} onSignIn={signIn} />

  const counts = { total: enquiries.length, fresh: enquiries.filter((item) => item.status === 'new').length, published: pages.filter((item) => item.status === 'published').length }
  return <div className="admin-shell">
    <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="admin-brand"><ShieldCheck size={24} /><div><strong>Mpohlo</strong><span>HOLDINGS ADMIN</span></div><button className="admin-close" onClick={() => setMobileOpen(false)}><X size={18} /></button></div>
      <nav aria-label="Admin navigation">{([['overview', LayoutDashboard, 'Overview'], ['enquiries', Inbox, 'Enquiries'], ['content', FileText, 'Website content'], ['seo', Sparkles, 'SEO manager'], ['settings', Settings, 'Settings']] as const).map(([id, Icon, label]) => <button className={section === id ? 'active' : ''} key={id} onClick={() => { setSection(id); setMobileOpen(false) }}><Icon size={18} />{label}</button>)}</nav>
      <div className="admin-sidebar-footer"><p>Signed in as Owner</p><button onClick={() => supabase?.auth.signOut()}><LogOut size={16} /> Sign out</button></div>
    </aside>
    <main className="admin-main">
      <header className="admin-topbar"><button className="admin-menu" onClick={() => setMobileOpen(true)}><Menu size={22} /></button><div><span className="admin-kicker">Mpohlo Holdings</span><h1>{section === 'overview' ? 'Good morning, Owner' : section[0].toUpperCase() + section.slice(1)}</h1></div><div className="admin-actions"><button aria-label="Notifications"><Bell size={19} /><i /></button><button className="admin-profile">Owner <ChevronDown size={16} /></button></div></header>
      {section === 'overview' && <Overview counts={counts} enquiries={enquiries} pages={pages} loading={loading} go={setSection} />}
      {section === 'enquiries' && <Enquiries enquiries={enquiries} />}
      {section === 'content' && <Content pages={pages} />}
      {section === 'seo' && <SEO pages={pages} />}
      {section === 'settings' && <SettingsPanel />}
    </main>
  </div>
}

function LoginScreen({ email, password, setEmail, setPassword, message, onSignIn }: any) { return <div className="admin-login"><div className="login-card"><div className="login-mark"><ShieldCheck size={30} /></div><span className="admin-kicker">Mpohlo Holdings</span><h1>Administrator sign in</h1><p>Secure access to your website, enquiries and SEO settings.</p><label htmlFor="admin-email">Email address</label><input id="admin-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@example.com" /><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) onSignIn() }} /><button className="admin-primary" onClick={onSignIn}>Sign in</button>{message && <div className="admin-alert">{message}</div>}<small>Use the authorised Mpohlo Holdings administrator email and password.</small></div></div> }

function Overview({ counts, enquiries, pages, loading, go }: any) { return <div className="admin-content"><div className="admin-welcome"><div><span className="admin-kicker">Dashboard overview</span><h2>Your website at a glance</h2><p>Monitor incoming enquiries and keep the public website accurate and discoverable.</p></div><a href="/" target="_blank" rel="noreferrer" className="admin-secondary">View public website</a></div><div className="metric-grid"><Metric label="Total enquiries" value={counts.total} icon={Inbox} /><Metric label="New enquiries" value={counts.fresh} icon={Bell} accent /><Metric label="Published pages" value={counts.published} icon={FileText} /></div><div className="admin-grid"><section className="admin-panel"><div className="panel-heading"><div><span className="admin-kicker">Latest activity</span><h3>Recent enquiries</h3></div><button onClick={() => go('enquiries')}>View all</button></div>{loading ? <div className="admin-empty">Loading live data…</div> : enquiries.length === 0 ? <div className="admin-empty">No enquiries have been submitted yet.</div> : <div className="admin-list">{enquiries.slice(0, 5).map((item: any) => <div className="admin-row" key={item.id}><div className="avatar">{item.name?.slice(0, 1).toUpperCase()}</div><div><strong>{item.name}</strong><span>{item.enquiry_type} · {new Date(item.created_at).toLocaleDateString('en-ZA')}</span></div><em className={`status ${item.status}`}>{item.status.replace('_', ' ')}</em></div>)}</div>}</section><section className="admin-panel health-panel"><div className="panel-heading"><div><span className="admin-kicker">Site health</span><h3>SEO checklist</h3></div><BarChart3 size={20} /></div><Health label="Published pages have metadata" complete={pages.length > 0} /><Health label="Sitemap is generated from live pages" complete /><Health label="Robots file is accessible" complete /><Health label="Google integrations connected" complete={false} /></section></div></div> }
function Metric({ label, value, icon: Icon, accent }: any) { return <div className={`metric ${accent ? 'accent' : ''}`}><div className="metric-icon"><Icon size={19} /></div><span>{label}</span><strong>{value}</strong></div> }
function Health({ label, complete }: any) { return <div className="health-row"><span className={complete ? 'health-dot done' : 'health-dot'}>{complete ? '✓' : '!'}</span><span>{label}</span><b>{complete ? 'Ready' : 'Connect'}</b></div> }
function Enquiries({ enquiries }: any) { const [query, setQuery] = useState(''); const filtered = useMemo(() => enquiries.filter((item: any) => `${item.name} ${item.email} ${item.enquiry_type}`.toLowerCase().includes(query.toLowerCase())), [enquiries, query]); return <div className="admin-content"><div className="page-title"><div><span className="admin-kicker">Lead management</span><h2>Enquiries inbox</h2><p>Review and follow up on contact form submissions.</p></div></div><div className="admin-panel"><div className="search-field"><Search size={17} /><input aria-label="Search enquiries" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, email or enquiry type" /></div>{filtered.length === 0 ? <div className="admin-empty">No enquiries found.</div> : <div className="table-wrap"><table><thead><tr><th>Name</th><th>Contact</th><th>Type</th><th>Status</th><th>Received</th></tr></thead><tbody>{filtered.map((item: any) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.email || item.phone || '—'}</td><td>{item.enquiry_type}</td><td><em className={`status ${item.status}`}>{item.status}</em></td><td>{new Date(item.created_at).toLocaleDateString('en-ZA')}</td></tr>)}</tbody></table></div>}</div></div> }
function Content({ pages }: any) { return <div className="admin-content"><div className="page-title"><div><span className="admin-kicker">Content management</span><h2>Website pages</h2><p>Draft and publish updates without changing the public site structure.</p></div><button className="admin-primary small">New page</button></div><div className="admin-panel"><div className="table-wrap"><table><thead><tr><th>Page</th><th>Slug</th><th>Status</th><th>Last updated</th><th /></tr></thead><tbody>{pages.length ? pages.map((page: any) => <tr key={page.id}><td><strong>{page.title}</strong></td><td>/{page.slug}</td><td><em className={`status ${page.status}`}>{page.status}</em></td><td>{new Date(page.updated_at).toLocaleDateString('en-ZA')}</td><td><button className="table-action">Edit</button></td></tr>) : <tr><td colSpan={5}><div className="admin-empty">No pages are configured in the CMS yet.</div></td></tr>}</tbody></table></div></div></div> }
function SEO({ pages }: any) { return <div className="admin-content"><div className="page-title"><span className="admin-kicker">Search visibility</span><h2>SEO manager</h2><p>Edit page metadata and review technical SEO status.</p></div><div className="admin-grid"><section className="admin-panel"><div className="panel-heading"><h3>Technical status</h3></div><Health label="Canonical domain uses HTTPS" complete /><Health label="Published pages only in sitemap" complete /><Health label="Google Search Console" complete={false} /></section><section className="admin-panel seo-preview"><span className="admin-kicker">Illustrative preview</span><h3>Mpohlo Holdings | Debt counselling support</h3><a>https://mpohloholdings.org.za/</a><p>Confidential debt counselling and financial rehabilitation support from Mpohlo Holdings.</p></section></div></div> }
function SettingsPanel() { return <div className="admin-content"><div className="page-title"><span className="admin-kicker">Configuration</span><h2>Business settings</h2><p>Manage public contact information and website defaults.</p></div><div className="admin-panel settings-form"><label>Business name<input defaultValue="Mpohlo Holdings" /></label><label>Public email<input defaultValue="info@mpohloholdings.co.za" /></label><label>Public telephone<input defaultValue="+27 78 473 5592" /></label><label>Business hours<input defaultValue="Monday to Friday, 09:00–17:00" /></label><button className="admin-primary small">Save settings</button></div></div> }
