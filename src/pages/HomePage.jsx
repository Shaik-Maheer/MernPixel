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
} from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
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
      <section className="py-24 md:py-36 relative overflow-hidden flex items-center justify-center">
        <div className="mp-shell relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.55 }}>
            <div className="inline-flex bg-white/60 backdrop-blur-md border border-slate-200 rounded-full px-4 py-1.5 mb-8 shadow-sm items-center">
               <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
               <span className="text-sm font-medium text-slate-800">Now booking Q3 projects</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Not built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 italic">impress.</span><br/>
              Built to <span className="text-blue-700">perform.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              We build high-performance digital products shaped around outcomes. Fast, scalable, and premium for growing brands.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all flex items-center shadow-lg">Start a project <span className="ml-2">→</span></Link>
              <Link to="/works" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm">View all work</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Services</p>
            <h2>Fast, focused execution across product and growth.</h2>
          </div>
          <div className="mp-card-grid mp-grid-services">
            {servicesDetailed.map((service, index) => (
              <motion.article
                key={service.id}
                className="mp-card mp-hover-card mp-service-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <p className="mp-chip">{service.title}</p>
                <p className="mp-service-line">{service.description}</p>
                <Link to={`/services?service=${service.id}`} className="mp-text-link">
                  View More
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/40">
        <div className="mp-shell space-y-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h2 className="text-4xl font-bold text-slate-900">Featured Work</h2>
            </div>
            <Link to="/works" className="text-slate-600 hover:text-slate-900 font-medium flex items-center group">
              See our work <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((work, index) => (
              <motion.button
                key={work.id}
                type="button"
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all text-left flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setModal(createWorkModal(work))}
              >
                <div className="overflow-hidden w-full aspect-video bg-slate-100 relative">
                  <img src={work.image} alt={work.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col bg-white">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{work.type} • {work.client}</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{work.title}</h3>
                  <p className="text-slate-600 text-sm flex-1">{work.result}</p>
                  <span className="mt-4 text-sm font-medium text-slate-900 flex items-center group-hover:text-blue-600 transition-colors">View Details <span className="ml-1">→</span></span>
                </div>
              </motion.button>
            ))}
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

      <section className="py-20 text-center">
        <div className="mp-shell space-y-12">
          <div className="max-w-2xl mx-auto pb-4">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet the Team</h2>
            <p className="text-lg text-slate-600">Core builders driving every project. We are a product studio shaped by hackathons and measurable outcomes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.button
                key={member.name}
                type="button"
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all text-center flex flex-col items-center group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                onClick={() => setModal(createTeamModal(member))}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-5 bg-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <img src={member.photo} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-wider">View Profile</span>
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
