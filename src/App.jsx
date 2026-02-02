import React from 'react'
import MapCNMap from '@/components/ui/mapcn'

function MapWrapper() {
  return (
    <div style={{ minHeight: 420 }} className="relative">
      <MapCNMap center={[4.9031, 114.9398]} zoom={12} />
    </div>
  )
}

export default function App() {
  return (
    <div>
      <header className="site-header">
        <div className="branding">
          <p className="eyebrow">OpenBrunei</p>
          <h1>Discover Brunei's best places to stay, eat, and explore.</h1>
          <p className="subtitle">A curated guide for visitors, tourists, and locals featuring map views, hidden gems, and trusted recommendations.</p>
        </div>
        <div className="header-actions">
          <button className="primary">Start exploring</button>
          <button className="ghost">Submit a place</button>
        </div>
      </header>

      <main className="layout">
        <section className="map-panel" aria-labelledby="map-title">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Map view</p>
              <h2 id="map-title">MapCN-powered overview</h2>
            </div>
            <div className="legend">
              <span className="legend-item hotel">Hotels</span>
              <span className="legend-item restaurant">Restaurants</span>
              <span className="legend-item cafe">Cafes</span>
            </div>
          </div>

          <aside className="places-panel" aria-label="Place categories">
            <h3>Categories</h3>
            <ul className="places-list">
              <li><button className="filter hotel" data-category="hotel">Hotels</button></li>
              <li><button className="filter restaurant" data-category="restaurant">Restaurants</button></li>
              <li><button className="filter cafe" data-category="cafe">Cafes</button></li>
              <li><button className="filter all" data-category="all">Show all</button></li>
            </ul>
          </aside>

          <MapWrapper />
        </section>

        <section className="recommendations" aria-labelledby="rec-title">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Recommendations</p>
              <h2 id="rec-title">Hand-picked local favorites</h2>
            </div>
            <p className="subtitle">A quick shortlist to get you started.</p>
          </div>

          <div className="card-grid">
            <article className="card">
              <h3>Hotels</h3>
              <ul>
                <li>Empire Hotel &amp; Country Club</li>
                <li>The Rizqun International Hotel</li>
                <li>Radisson Hotel Brunei Darussalam</li>
              </ul>
            </article>
            <article className="card">
              <h3>Restaurants</h3>
              <ul>
                <li>Kaizen Sushi</li>
                <li>Energy Kitchen</li>
                <li>Seri Damai Restaurant</li>
              </ul>
            </article>
            <article className="card">
              <h3>Cafes</h3>
              <ul>
                <li>Three Light Coffee</li>
                <li>Roasted Sip</li>
                <li>Piccolo Cafe</li>
              </ul>
            </article>
          </div>

          <div className="highlights">
            <article>
              <h3>Top sights</h3>
              <p>Omar Ali Saifuddien Mosque, Kampong Ayer, Jerudong Park.</p>
            </article>
            <article>
              <h3>Local tips</h3>
              <p>Plan around prayer times and bring light layers for afternoon showers.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>OpenBrunei &middot; Built for explorers in Brunei Darussalam.</p>
      </footer>
    </div>
  )
}
