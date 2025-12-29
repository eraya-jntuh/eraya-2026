export default function TestPage() {
  return (
    <div style={{ padding: '20px', color: 'white', background: '#8b1538', minHeight: '100vh' }}>
      <h1>Test Page - Integration Check</h1>
      <p>If you can see this, the Next.js server is working.</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Environment Variables:</h2>
        <ul>
          <li>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</li>
          <li>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</li>
        </ul>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Quick Links:</h2>
        <ul>
          <li><a href="/" style={{ color: '#d4af37' }}>Home Page</a></li>
          <li><a href="/admin/login" style={{ color: '#d4af37' }}>Admin Login</a></li>
        </ul>
      </div>
    </div>
  )
}


