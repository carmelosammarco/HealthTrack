import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import App from './App'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      setSession(data.session)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error
      // Automatically log in after sign up
      const { data: loginData } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      setSession(loginData.session)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setSession(null)
    } catch (error) {
      alert(error.message)
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>
  }

  if (!session) {
    return (
      <div className="container">
        <h1>Healthy Track Login</h1>
        <form className="auth-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-buttons">
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignUp}>Sign Up</button>
          </div>
        </form>
      </div>
    )
  }

  return <App session={session} onLogout={handleLogout} />
}
