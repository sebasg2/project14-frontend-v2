import React, { useState } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||"https://project14-backend.onrender.com";

function ValentinePage({ onYes }) {
  const [loading, setLoading] = useState(false);

  const handleAnswer = async (answer) => {
    if (answer === "no") {
      alert("dolor!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/valentine/answer`, {
        answer: "yes",
      });
      onYes();
    } catch (error) {
      console.error("Error saving answer:", error);
      // Fallback: continue anyway
      onYes();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="valentine-page">
      {/* Header */}
      <header className="apple-header">
        <div className="apple-logo">◆ AnaySebas.app</div>
      </header>

      {/* Main content */}
      <main className="valentine-main">
        <div className="valentine-container valentine-box">
          <h1 className="valentine-title">
            Quieres ser mi valentin EN Saint valentine?
          </h1>
          <div style={{ height: "30px" }} />

          

          {loading ? (
            <div className="loading">Mandando la respuesta en la interweb</div>
          ) : (
            <div className="button-group">
              <button
                className="mac-button yes"
                onClick={() => handleAnswer("yes")}
              >
                Si
              </button>

              <button
                className="mac-button no"
                onClick={() => handleAnswer("no")}
              >
                No
              </button>
            </div>
          )}
        </div>

        {/* Apple-style white space */}
        <div className="valentine-spacer" />
      </main>

      {/* Footer */}
      <footer className="apple-footer">
          Arodasi industries LLC ©
      </footer>
    </div>
  );
}

export default ValentinePage;
