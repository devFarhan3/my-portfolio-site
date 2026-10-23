import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQ_ITEMS } from '../../data/seo'

// Native <details> keeps every answer in the DOM, so Google and AI crawlers can read it
// even while collapsed. Content is shared with the FAQPage JSON-LD (src/data/seo.js).
export const FAQ = () => (
  <section id="faq" className="py-16 md:py-[140px] px-6 bg-surface">
    <div className="max-w-[900px] mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[11px] uppercase tracking-[0.1em] text-text-2 mb-6 flex items-center gap-2"
      >
        <span className="text-accent">●</span> FAQ
      </motion.p>
      <h2 className="text-[40px] md:text-[56px] font-bold text-text-1 tracking-tight leading-tight mb-12">
        Questions, <span className="text-accent italic font-serif">answered</span>
      </h2>

      <div className="divide-y divide-black/[0.06] border-y border-black/[0.06]">
        {FAQ_ITEMS.map((item) => (
          <details key={item.q} className="group py-6">
            <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-[18px] md:text-[20px] font-semibold text-text-1">{item.q}</h3>
              <Plus
                size={22}
                className="flex-shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-4 text-[16px] md:text-[17px] text-text-2 leading-[1.75] max-w-[760px]">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)
