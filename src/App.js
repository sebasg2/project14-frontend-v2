import React, { useState, useEffect } from 'react';
import ValentinePage from './ValentinePage';
import PasswordPage from './PasswordPage';
import DashboardPage from './DashboardPage';
import './App.css';

function App() {
  const [step, setStep] = useState('loading');

  useEffect(() => {
    checkValentineAnswer();
  }, []);

  const checkValentineAnswer = async () => {
    try {
      const res = await fetch('/valentine/status');
      const data = await res.json();

      if (data.answeredYes) {
        setStep('password');
      } else {
        setStep('valentine');
      }
    } catch (err) {
      console.error(err);
      setStep('valentine');
    }
  };

  const handleYesAnswer = async () => {
    await fetch('/valentine/yes', { method: 'POST' });
    setStep('password');
  };

  if (step === 'loading') {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {step === 'valentine' && (
        <ValentinePage onYes={handleYesAnswer} />
      )}

      {step === 'password' && (
        <PasswordPage onSuccess={() => setStep('dashboard')} />
      )}

      {step === 'dashboard' && <DashboardPage />}
    </div>
  );
}

export default App;
