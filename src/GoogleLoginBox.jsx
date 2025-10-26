import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useState, useEffect } from 'react';

const GoogleLoginBox = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      setUser(tokenResponse); // includes access_token
    },
    onError: () => {
      console.log('Login Failed');
    },
    scope: 'https://www.googleapis.com/auth/calendar.readonly'
  });

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user?.access_token) return;

      // Build today range in local timezone
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000;
      const startOfDay = new Date(now.setHours(0, 0, 0, 0) - tzOffset).toISOString();
      const endOfDay = new Date(now.setHours(23, 59, 59, 999) - tzOffset).toISOString();

      try {
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startOfDay}&timeMax=${endOfDay}&singleEvents=true&orderBy=startTime&showDeleted=false`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const data = await res.json();
        setEvents(data.items || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [user]);

  const colors = [
    '#6c5ce7', '#00cec9', '#fab1a0', '#ff7675', '#74b9ff', '#55efc4'
  ];

  return (
    <div style={{
      padding: '0.5rem',
      background: 'rgba(0,0,0,0.4)',
      borderRadius: '16px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      maxWidth: '350px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    }}>
      {user ? (
        <div style={{ width: '100%' }}>
          <h3 style={{ marginBottom: '0.75rem', fontWeight: 'bold', fontSize: '1rem' }}>
            📅 Your Events Today
          </h3>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '0.75rem',
            maxHeight: '200px',
            overflowY: 'auto',
            marginBottom: '0.75rem',
            width: '100%'
          }}>
            {events.length === 0 ? (
              <p style={{ color: '#ccc', fontStyle: 'italic' }}>No events today 🎉</p>
            ) : (
              events.map((event, index) => {
                const isAllDay = !event.start.dateTime;
                let startTime = 'All-day';
                let endTime = '';
                if (!isAllDay) {
                  const start = new Date(event.start.dateTime);
                  const end = new Date(event.end.dateTime);
                  startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }

                return (
                  <div
                    key={event.id || index}
                    style={{
                      background: colors[index % colors.length],
                      borderRadius: '10px',
                      padding: '0.5rem 0.75rem',
                      marginBottom: '0.5rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold' }}>{event.summary || 'Untitled Event'}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                      {isAllDay ? startTime : `${startTime} – ${endTime}`}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <button
            onClick={() => {
              googleLogout();
              setUser(null);
              setEvents([]);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: '#fff',
              color: '#222',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => login()}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontWeight: '500',
            fontSize: '14px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            width: '100%'
          }}
        >
          📅 Connect your Google Calendar
        </button>
      )}
    </div>
  );
};

export default GoogleLoginBox;
