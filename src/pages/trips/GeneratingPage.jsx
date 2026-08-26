import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, AlertCircle } from 'lucide-react';
import { getItineraryStatus, saveTrip } from '../../services/api.js';
import { API_BASE_URL } from '../../config.js';
import toast from 'react-hot-toast';

const BASE = API_BASE_URL;

const MESSAGES = [
  'Analyzing your travel preferences...',
  'Filtering 200+ attractions across destinations...',
  'Clustering destinations with H3 geospatial...',
  'Optimizing your daily routes...',
  'Calculating real-time budget breakdowns...',
  'Checking weather and local events...',
  'Crafting AI-powered descriptions for each spot...',
  "Connecting to India's smartest travel engine...",
  "Analyzing regional weather and season patterns...",
  "Balancing train routes and scenic drives...",
  "Curating hand-picked stays and experiences...",
  "Optimizing daily pace and travel budget...",
  "Crafting your personalized itinerary...",
  "Adding local dining and hidden gems...",
  "Finalizing your dream travel plan..."
];

const GeneratingPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(5);
  const [error, setError] = useState(null);
  const savedRef = useRef(false);
  const pollIntervalRef = useRef(null);
  const esRef = useRef(null);
  const pollErrorCount = useRef(0);

  const handleCompleted = useCallback(async (result, msgInterval) => {
    if (savedRef.current) return;
    savedRef.current = true;
    setProgress(100);
    clearInterval(msgInterval);
    const stateData = location.state || {};
    try {
      const itinerary = result;
      const savePayload = {
        itinerary_json: itinerary,
        trip_title: itinerary?.trip_title || 'My Trip',
        budget: stateData.budget || itinerary?.total_cost || 0,
        duration: stateData.duration || itinerary?.itinerary?.length || 0,
      };
      const saved = await saveTrip(savePayload);
      const tripId = saved.id || saved.trip_id;
      if (tripId) {
        setTimeout(() => navigate(`/trip/${tripId}`), 500);
        return;
      }
    } catch (err) {
      if (err.status && err.status !== 401) {
        toast.error('Your trip was generated but could not be saved to your account.');
      }
    }
    setTimeout(() => navigate(`/trip/preview`, { state: { itinerary: result } }), 500);
  }, [navigate, location.state]);

  const startPolling = useCallback((msgInterval) => {
    const poll = async () => {
      try {
        const data = await getItineraryStatus(jobId);
        pollErrorCount.current = 0;
        if (data.status === 'completed') {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
          await handleCompleted(data.result, msgInterval);
        } else if (data.status === 'failed') {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
          clearInterval(msgInterval);
          setError(data.error_message || 'Generation failed. Please try again.');
        }
      } catch {
        pollErrorCount.current += 1;
        if (pollErrorCount.current >= 5) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
          clearInterval(msgInterval);
          setError('Lost connection to the server. Please check your network and try again.');
        }
      }
    };
    poll();
    pollIntervalRef.current = setInterval(poll, 2000);
  }, [jobId, handleCompleted]);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex(i => (i + 1) % MESSAGES.length);
      setProgress(p => {
        if (p < 60) return Math.min(p + 8, 60);
        if (p < 85) return Math.min(p + 2, 85);
        return p;
      });
    }, 3500);

    // Try SSE stream first
    if (typeof EventSource !== 'undefined') {
      const es = new EventSource(`${BASE}/get-itinerary-status/${jobId}/stream`);
      esRef.current = es;

      es.onmessage = async (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.heartbeat) return;
          const s = data.status;
          if (s === 'completed') {
            es.close();
            esRef.current = null;
            await handleCompleted(data.result, msgInterval);
          } else if (s === 'failed') {
            es.close();
            esRef.current = null;
            clearInterval(msgInterval);
            setError(data.error_message || 'Generation failed. Please try again.');
          }
        } catch { /* ignore parse errors */ }
      };

      es.onerror = () => {
        es.close();
        esRef.current = null;
        startPolling(msgInterval);
      };

      return () => {
        es.close();
        esRef.current = null;
        clearInterval(msgInterval);
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
      };
    }

    // Polling fallback
    startPolling(msgInterval);
    return () => {
      clearInterval(msgInterval);
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
    };
  }, [jobId, handleCompleted, startPolling]);

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f4ed', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ width: '64px', height: '64px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <AlertCircle size={32} color="#dc2626" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#141413', marginBottom: '0.75rem' }}>Generation Failed</h2>
          <p style={{ color: '#5e5d59', marginBottom: '2rem', lineHeight: 1.6 }}>{error}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/planner')}
              style={{ padding: '0.85rem 2rem', background: '#141413', color: 'white', border: 'none', borderRadius: '50px', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #141413 0%, #141413 50%, #0d3b2e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: 'white',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
        {/* Animated Icon */}
        <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 2.5rem' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(90, 197, 118,0.2)',
            animation: 'spin 3s linear infinite',
          }} />
          <div style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#5ac576',
            animation: 'spin 1.5s linear infinite',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles size={36} color="#5ac576" />
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Building Your Perfect Trip
        </h1>

        <p style={{ color: '#5ac576', fontSize: '1.05rem', fontWeight: 500, minHeight: '1.5rem', marginBottom: '2.5rem', transition: 'opacity 0.5s' }}>
          {MESSAGES[messageIndex]}
        </p>

        {/* Progress Bar */}
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '6px', overflow: 'hidden', marginBottom: '3rem' }}>
          <div style={{
            height: '100%',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #5ac576, #22d3ee)',
            width: '100%',
            transform: `scaleX(${progress / 100})`,
            transformOrigin: 'left',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
        </div>

        {/* Stage Indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { label: 'Filtering', done: progress > 20 },
            { label: 'Routing', done: progress > 50 },
            { label: 'AI Polish', done: progress > 80 },
          ].map((stage, i) => (
            <div key={i} style={{
              padding: '1rem',
              borderRadius: '12px',
              background: stage.done ? 'rgba(90, 197, 118,0.1)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${stage.done ? 'rgba(90, 197, 118,0.3)' : 'rgba(255,255,255,0.08)'}`,
              transition: 'all 0.5s',
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: stage.done ? '#5ac576' : 'rgba(255,255,255,0.5)' }}>
                {stage.done ? '✓ ' : ''}{stage.label}
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '2rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>
          This usually takes 30–120 seconds depending on server load
        </p>
      </div>
    </div>
  );
};

export default GeneratingPage;
