import React, { useEffect, useState } from "react";
import axios from "axios";

import PugWalker from "./components/PugWalker";
import PonqueWalker from "./components/PonqueWalker";
import Ponquecita from "./components/Ponquecita";
import IsadoraGhost from "./components/IsadoraGhost";

const API_URL =
  process.env.REACT_APP_API_URL || "https://project14-backend.onrender.com";

function DashboardPage() {
  const [trips, setTrips] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeForm, setActiveForm] = useState(null); // "trip" | "goal" | null

  const [tripForm, setTripForm] = useState({
    destination: "",
    description: "",
    planned_year: new Date().getFullYear(),
  });

  const [goalForm, setGoalForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const password = localStorage.getItem("shared_password");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tripsRes, goalsRes] = await Promise.all([
        axios.get(`${API_URL}/trips`),
        axios.get(`${API_URL}/goals`),
      ]);
      setTrips(tripsRes.data);
      setGoals(goalsRes.data);
    } catch {
      setError("El backend no funciona :(");
    } finally {
      setLoading(false);
    }
  };

  const addTrip = async () => {
    try {
      await axios.post(`${API_URL}/trips`, tripForm, {
        headers: { "x-shared-password": password },
      });
      setActiveForm(null);
      setTripForm({
        destination: "",
        description: "",
        planned_year: new Date().getFullYear(),
      });
      fetchData();
    } catch (err) {
      setError("Failed to add trip");
    }
  };

  const addGoal = async () => {
    try {
      await axios.post(`${API_URL}/goals`, goalForm, {
        headers: { "x-shared-password": password },
      });
      setActiveForm(null);
      setGoalForm({
        title: "",
        description: "",
        status: "pending",
      });
      fetchData();
    } catch (err) {
      setError("Failed to add goal");
    }
  };

  if (loading) {
    return (
      <>
        <header className="apple-header">
          <div className="apple-logo">◆ AnaySebas.app</div>
        </header>
        <div className="dashboard-container">
          <div className="loading">Cargando....</div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Animated Characters */}
      <PonqueWalker />
      <IsadoraGhost />

      {/* Header */}
      <header className="apple-header">
        <div className="apple-logo">◆ AnaySebas </div>
      </header>

      {/* Main Dashboard */}
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">🦆 El ana paty sebas dashboard 🐼</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="dashboard-content">
          {/* TRIPS SECTION */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Viajes a futuro!</h2>
              <button
                className="add-button"
                onClick={() => setActiveForm("trip")}
              >
                + Nuevo viaje
              </button>
            </div>

            <div className="items-scroll">
              {trips.length === 0 ? (
                <p className="empty-state">
                  Sin viajes aun. Ponque?
                </p>
              ) : (
                trips.map((trip) => (
                  <div key={trip.id} className="item-card">
                    <div className="item-title">{trip.destination}</div>
                    <div className="item-description">{trip.description}</div>
                    <div className="item-meta">
                      Planned for: {trip.planned_year}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* GOALS SECTION */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Nuestras metas</h2>
              <button
                className="add-button"
                onClick={() => setActiveForm("goal")}
              >
                + Nueva meta
              </button>
            </div>

            <div className="items-scroll">
              {goals.length === 0 ? (
                <p className="empty-state">
                  No hay metas aún. Ponque?
                </p>
              ) : (
                goals.map((goal) => (
                  <div key={goal.id} className="item-card">
                    <div className="item-title">{goal.title}</div>
                    <div className="item-description">{goal.description}</div>
                    <span className={`item-status ${goal.status}`}>
                      {goal.status.replace("_", " ")}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Decorative Character */}
        <Ponquecita />
      </div>

      {/* Footer */}
      <footer className="apple-footer">
        <PugWalker />
        Patrocinado por momazos capachita y momazos cabeza de bombillo  ©
      </footer>

      {/* MODAL OVERLAY */}
      {activeForm && (
        <div className="modal-overlay" onClick={() => setActiveForm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">
              {activeForm === "trip" ? "Añadir un viaje" : "Añadir meta"}
            </h3>

            {activeForm === "trip" ? (
              <div className="modal-form">
                <div className="form-group">
                  <label className="form-label">Destination</label>
                  <input
                    className="form-input"
                    placeholder="ejemplo: Japon (again)!"
                    value={tripForm.destination}
                    onChange={(e) =>
                      setTripForm({ ...tripForm, destination: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Por que este viajecicoro?"
                    value={tripForm.description}
                    onChange={(e) =>
                      setTripForm({ ...tripForm, description: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Planned Year</label>
                  <input
                    className="form-input"
                    type="number"
                    min={new Date().getFullYear()}
                    max={2050}
                    value={tripForm.planned_year}
                    onChange={(e) =>
                      setTripForm({
                        ...tripForm,
                        planned_year: parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="form-buttons">
                  <button className="submit-button" onClick={addTrip}>
                    Add Trip
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setActiveForm(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-form">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    className="form-input"
                    placeholder="ejemplo: comprar hogar"
                    value={goalForm.title}
                    onChange={(e) =>
                      setGoalForm({ ...goalForm, title: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Descripcion de como alcanzarlo y que conlleva."
                    value={goalForm.description}
                    onChange={(e) =>
                      setGoalForm({ ...goalForm, description: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={goalForm.status}
                    onChange={(e) =>
                      setGoalForm({ ...goalForm, status: e.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="achieved">Achieved</option>
                  </select>
                </div>

                <div className="form-buttons">
                  <button className="submit-button" onClick={addGoal}>
                    Add Goal
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setActiveForm(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
