import React, { useState, useEffect } from 'react';
import profile from './img/profile.jpg';
import LHP from './img/LHP-03.png';
import LS from './img/Comp-1_2.gif';
import './App.css';

// ─── Navigation ──────────────────────────────────────────────────────────────
const Navigation = ({ isScrolled }) => {
  const navStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '4rem',
    zIndex: 50,
    transition: 'all 0.3s ease',
    backgroundColor: isScrolled ? 'white' : 'transparent',
    boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px'
  };

  const navContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0'
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '32px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#666',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={navContentStyle}>
          <h1 style={logoStyle}>Jerome Lee</h1>
          <ul style={navLinksStyle}>
            <li><a href="#work" style={linkStyle}>Work</a></li>
            <li><a href="#about" style={linkStyle}>About</a></li>
            <li><a href="#contact" style={linkStyle}>Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  return (
    <a
      href={project.behance || '#'}
      className="project-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="project-card__image-wrap">
        {project.main_img_src ? (
          <img
            src={project.main_img_src}
            alt={project.title}
            className="project-card__image"
          />
        ) : (
          <div className="project-card__placeholder" />
        )}
      </div>
      <div className="project-card__meta">
        <span className="project-card__category">{project.category || 'Design'}</span>
        <h4 className="project-card__title">{project.title}</h4>
        <p className="project-card__subtitle">{project.subtitle}</p>
      </div>
    </a>
  );
};

// ─── ProjectsSection ──────────────────────────────────────────────────────────
const ProjectsSection = ({ projects }) => {
  return (
    <section id="work" className="projects-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Poppins:wght@300;400;500&display=swap');

        .projects-section {
          padding: 80px 0 100px;
          background: #fff;
        }

        .projects-section__header {
          max-width: 1200px;
          margin: 0 auto 56px;
          padding: 0 32px;
        }

        .projects-section__label {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #999;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .projects-section__title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          color: #111;
          line-height: 1.15;
          margin: 0;
        }

        .projects-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
          align-items: start;
        }

        .projects-grid .project-card:nth-child(1) { grid-column: span 7; }
        .projects-grid .project-card:nth-child(2) { grid-column: span 5; margin-top: 80px; }
        .projects-grid .project-card:nth-child(3) { grid-column: span 4; }
        .projects-grid .project-card:nth-child(4) { grid-column: span 8; margin-top: -40px; }

        .project-card {
          display: block;
          cursor: pointer;
        }

        .project-card__image-wrap {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #f0efec;
          aspect-ratio: 4 / 3;
          position: relative;
        }

        .project-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .project-card:hover .project-card__image {
          transform: scale(1.04);
        }

        .project-card__placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #e8e5e0 0%, #d8d4ce 100%);
        }

        .project-card__meta {
          padding: 16px 2px 0;
        }

        .project-card__category {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #aaa;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }

        .project-card__title {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #111;
          line-height: 1.4;
          margin: 6px 0 0;
        }

        .project-card__subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          color: #999;
          font-weight: 400;
          margin: 2px 0 0;
        }

        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
          .projects-grid .project-card:nth-child(n) {
            grid-column: span 1;
            margin-top: 0;
          }
        }

        @media (max-width: 560px) {
          .projects-grid { grid-template-columns: 1fr; }
          .projects-grid .project-card:nth-child(n) { grid-column: span 1; }
        }
      `}</style>

      <div className="projects-section__header">
        <p className="projects-section__label">Selected Work</p>
        <h2 className="projects-section__title">Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

// ─── AboutSection ─────────────────────────────────────────────────────────────
const AboutSection = () => {
  const sectionStyle = {
    padding: '80px 0',
    backgroundColor: '#f8f9fa'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '300',
    marginBottom: '24px'
  };

  const textStyle = {
    lineHeight: '1.6',
    color: '#666',
    marginBottom: '16px'
  };

  const imageWrapperStyle = {
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'cover',
    borderRadius: '8px'
  };

  return (
    <section id="about" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          <div>
            <h3 style={titleStyle}>About</h3>
            <p style={textStyle}>
              I'm a graphic designer passionate about creating meaningful visual experiences.
              With a focus on clean, purposeful design, I help brands communicate their stories
              through thoughtful visual identity and strategic design solutions.
            </p>
            <p style={textStyle}>
              My work spans across branding, visual identity, print design, and digital experiences.
              I believe great design should be both beautiful and functional.
            </p>
          </div>
          <div style={imageWrapperStyle}>
            <img src={profile} alt="Profile" style={imageStyle} />
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── ContactSection ───────────────────────────────────────────────────────────
const ContactSection = () => {
  const sectionStyle = {
    padding: '80px 0',
    backgroundColor: 'white',
    textAlign: 'center'
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 24px'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '300',
    marginBottom: '48px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px'
  };

  const contactItemStyle = {
    textAlign: 'center'
  };

  const labelStyle = {
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1a1a1a'
  };

  const linkStyle = {
    color: '#666',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  };

  return (
    <section id="contact" style={sectionStyle}>
      <div style={containerStyle}>
        <h3 style={titleStyle}>Contact</h3>
        <div style={gridStyle}>
          <div style={contactItemStyle}>
            <h4 style={labelStyle}>Email</h4>
            <a href="mailto:jerome@example.com" style={linkStyle}>
              jerome@example.com
            </a>
          </div>
          <div style={contactItemStyle}>
            <h4 style={labelStyle}>Phone</h4>
            <a href="tel:+1234567890" style={linkStyle}>
              +1 (234) 567-890
            </a>
          </div>
          <div style={contactItemStyle}>
            <h4 style={labelStyle}>Social</h4>
            <div>
              <a href="#" style={{ ...linkStyle, display: 'block', marginBottom: '4px' }}>
                Behance
              </a>
              <a href="#" style={{ ...linkStyle, display: 'block' }}>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Portfolio (Main App) ─────────────────────────────────────────────────────
const Portfolio = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "Lantern Hill Press - Visual Identity",
      subtitle: "(Brief Club)",
      main_img_src: LHP,
      behance: 'https://www.behance.net/gallery/227647001/Lantern-Hill-Press-Visual-Identity-%28Brief-Club%29',
      description: "Complete visual identity design for a publishing house, including logo, typography, and brand guidelines.",
      tags: ["Branding", "Visual Identity", "Print Design"],
      category: "Visual Identity"
    },
    {
      id: 2,
      title: "Lionshrooms - Mushroom Jerky",
      subtitle: "Visual Identity",
      main_img_src: LS,
      behance: 'https://www.behance.net/gallery/224758193/Lionshrooms-Mushroom-Jerky-Visual-Identity',
      description: "Organic and earthy brand identity for a sustainable mushroom jerky company.",
      tags: ["Branding", "Packaging", "Sustainability"],
      category: "Visual Identity"
    },
    {
      id: 3,
      title: "Modern Architecture Firm",
      subtitle: "Brand Identity",
      main_img_src: null,
      description: "Clean and minimalist brand identity for a contemporary architecture firm.",
      tags: ["Architecture", "Branding", "Minimalism"],
      category: "Visual Identity"
    },
    {
      id: 4,
      title: "Artisan Coffee Roasters",
      subtitle: "Packaging Design",
      main_img_src: null,
      description: "Packaging design series for a specialty coffee roaster.",
      tags: ["Packaging", "Illustration", "Coffee"],
      category: "Packaging"
    }
  ]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const globalStyles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
    }
    html { scroll-behavior: smooth; }
    ::-webkit-scrollbar { height: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
    @media (max-width: 768px) {
      .grid-responsive { grid-template-columns: 1fr !important; }
    }
  `;

  return (
    <>
      <style>{globalStyles}</style>
      <div className="test">
        <Navigation isScrolled={isScrolled} />
        <AboutSection />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </div>
    </>
  );
};

export default Portfolio;