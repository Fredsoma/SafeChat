
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import Modal from '../components/Modal';
import './MapPage.css';

function AddMarkerOnClick({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    }
  });
  return null;
}

export default function MapPage() {
  const [incidents, setIncidents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState({ title: '', description: '', location: null });

  // fetch existing incidents
  useEffect(() => {
    axios.get('http://localhost:5000/api/incidents')
      .then(res => setIncidents(res.data))
      .catch(console.error);
  }, []);

  // when map clicked, open modal
  const handleMapClick = (latlng) => {
    setDraft({ title: '', description: '', location: latlng });
    setModalOpen(true);
  };

  // submit new incident
  const handleSubmit = async () => {
    const { title, description, location } = draft;
    if (!title.trim()) {
      alert('Title cannot be empty');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/incidents', draft);
      setIncidents(prev => [res.data, ...prev]);
      setModalOpen(false);
      alert('Thank you! Your report has been saved.');
    } catch (err) {
      console.error(err);
      alert('Failed to save. Please try again.');
    }
  };

  return (
    <div className="map-page-container">
      <h2>Community Safety Map</h2>
      <p>Click anywhere on the map to report a non‐emergency incident.</p>

      <MapContainer
        center={[39.7684, -86.1581]}
        zoom={13}
        scrollWheelZoom
        className="leaflet-map"
      >
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {incidents.map(inc => (
          <Marker key={inc._id} position={[inc.location.lat, inc.location.lng]}>
            <Popup>
              <strong>{inc.title}</strong>
              <p>{inc.description}</p>
              <small>{new Date(inc.createdAt).toLocaleString()}</small>
            </Popup>
          </Marker>
        ))}

        <AddMarkerOnClick onClick={handleMapClick} />
      </MapContainer>

      {/* Modal Form */}
      <Modal
        isOpen={modalOpen}
        title="Report an Incident"
        onClose={() => setModalOpen(false)}
      >
        <label>Title</label>
        <input
          type="text"
          value={draft.title}
          onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
          placeholder="e.g., Flat tire on Shelby St."
        />
        <label>Description (optional)</label>
        <textarea
          rows="4"
          value={draft.description}
          onChange={e => setDraft(d => ({ ...d, description: e.target.value }))}
          placeholder="Any additional details..."
        />
        <button onClick={handleSubmit}>Submit</button>
      </Modal>
    </div>
  );
}
