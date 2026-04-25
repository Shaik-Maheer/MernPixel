import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CountUpNumber from '../components/CountUpNumber'
import DetailModal from '../components/DetailModal'
import HeroBackdrop from '../components/HeroBackdrop'
import {
  caseStudies,
  lectureDetail,
  pricingPlans,
  servicesDetailed,
  stats,
  storyDetail,
  teamMembers,
  trustBrands,
} from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function createServiceModal(service) {
  return {
    subtitle: 'Service Details',
    title: service.title,
    sections: [
      { label: 'Features', items: service.features },
      { label: 'Use Cases', items: service.useCases },
      { label: 'Benefits', items: [service.outcome] },
    ],
  }
}

function createWorkModal(work) {
  return {
    subtitle: work.client,
    title: work.title,
    fullscreen: true,
    sections: [
      { label: 'Project Name', text: work.title },
      { label: 'What We Built', text: work.solution },
      { label: 'Outcome / Result', text: work.result },
    ],
    actions: [{ label: 'Open Live Project', href: work.link, external: true }],
  }
}

function createTeamModal(member) {
  return {
    subtitle: member.role,
    title: member.name,
    sections: [{ label: 'Profile', text: member.bio }],
    actions: [{ label: 'LinkedIn', href: member.linkedin, external: true }],
  }
}

export default function HomePage() {
  const [modal, setModal] = useState(null)

  return (
    <main className="mp-page">
      <section className="mp-hero mp-hero-media">
        <HeroBackdrop video="/one.mp4" />

        <div className="mp-shell mp-hero-grid">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.55 }}>
            <p className="mp-kicker">MERNpixel Agency</p>
            <h1 className="mp-display">We build high-performance digital products</h1>
            <p className="mp-lead">For startups, businesses, and growing brands.</p>
            <div className="mp-actions">
              <Link to="/works" className="mp-btn mp-btn-ghost mp-magnetic">View Work</Link>
              <Link to="/contact" className="mp-btn mp-btn-primary mp-magnetic">Start Project</Link>
            </div>
          </motion.div>

          <motion.aside className="mp-hero-panel" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.6, delay: 0.1 }}>
            <p>Trusted Execution</p>
            <h2>Built for speed and business outcomes.</h2>
            <div className="mp-stat-grid">
              {stats.map((item) => (
                <article key={item.label}>
                  <strong><CountUpNumber value={item.value} /></strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="mp-section mp-section-tight">
        <div className="mp-shell">
          <p className="mp-kicker">Trusted by growing businesses</p>
          <div className="mp-logo-row">
            {trustBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Services</p>
            <h2>Fast, focused execution across product and growth.</h2>
          </div>
          <div className="mp-service-rail">
            {servicesDetailed.map((service, index) => (
              <motion.article
                key={service.id}
                className="mp-card mp-hover-card mp-service-rail-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <p className="mp-chip">{service.title}</p>
                <p>{service.description}</p>
                <button type="button" className="mp-text-link" onClick={() => setModal(createServiceModal(service))}>
                  View More
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Works</p>
            <h2>Visual-first projects with measurable outcomes.</h2>
          </div>
          <div className="mp-card-grid mp-grid-3">
            {caseStudies.slice(0, 3).map((work, index) => (
              <motion.button
                key={work.id}
                type="button"
                className="mp-card mp-work-card mp-work-button"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setModal(createWorkModal(work))}
              >
                <img src={work.image} alt={work.title} loading="lazy" />
                <p className="mp-chip">{work.type}</p>
                <h3>{work.title}</h3>
                <p>{work.result}</p>
              </motion.button>
            ))}
          </div>
          <div className="mp-actions mp-actions-center">
            <Link to="/works" className="mp-btn mp-btn-ghost mp-magnetic">See All Works</Link>
          </div>
        </div>
      </section>

      <section className="mp-section mp-section-tint">
        <div className="mp-shell mp-grid-2">
          <article className="mp-card mp-hover-card">
            <p className="mp-kicker">Story</p>
            <h3>Started with a Hackathon</h3>
            <p>4 students. Built, competed, won. That became MERNpixel.</p>
            <button
              type="button"
              className="mp-text-link"
              onClick={() =>
                setModal({
                  subtitle: 'Origin Story',
                  title: storyDetail.title,
                  sections: [{ label: 'Journey', items: storyDetail.points }],
                })
              }
            >
              View Story
            </button>
          </article>

          <article className="mp-card mp-hover-card">
            <p className="mp-kicker">Guest Sessions</p>
            <h3>Sharing knowledge with future builders.</h3>
            <p>AI tools, resume building, and live coding.</p>
            <button
              type="button"
              className="mp-text-link"
              onClick={() =>
                setModal({
                  subtitle: 'Guest Lecture Detail',
                  title: lectureDetail.title,
                  sections: [
                    { label: 'Topics', items: lectureDetail.topics },
                    { label: 'Events', items: lectureDetail.events },
                    { label: 'Format', text: lectureDetail.note },
                  ],
                })
              }
            >
              View More
            </button>
          </article>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Pricing</p>
            <h2>Simple plans with clear delivery scope.</h2>
          </div>
          <div className="mp-card-grid mp-grid-3">
            {pricingPlans.map((plan, index) => (
              <motion.article
                key={plan.name}
                className={`mp-card mp-pricing-card ${plan.featured ? 'is-featured' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <p className="mp-chip">{plan.name}</p>
                <h3>{plan.price}</h3>
                <p>{plan.summary}</p>
                <Link to="/pricing" className="mp-btn mp-btn-ghost mp-magnetic">Get Started</Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Team</p>
            <h2>Core builders driving every project.</h2>
          </div>
          <div className="mp-card-grid mp-grid-4">
            {teamMembers.map((member, index) => (
              <motion.button
                key={member.name}
                type="button"
                className="mp-card mp-hover-card mp-team-mini"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                onClick={() => setModal(createTeamModal(member))}
              >
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span className="mp-text-link">View More</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section mp-cta-band">
        <div className="mp-shell mp-cta-row">
          <div>
            <p className="mp-kicker">Final CTA</p>
            <h2>Build a faster, sharper digital presence with MERNpixel.</h2>
          </div>
          <Link to="/contact" className="mp-btn mp-btn-primary mp-magnetic">Start Project</Link>
        </div>
      </section>

      <DetailModal
        open={Boolean(modal)}
        onClose={() => setModal(null)}
        title={modal?.title}
        subtitle={modal?.subtitle}
        sections={modal?.sections}
        actions={modal?.actions}
        fullscreen={modal?.fullscreen}
      />
    </main>
  )
}
