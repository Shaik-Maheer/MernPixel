import { motion } from 'framer-motion'

export default function PPTTransition({ children }) {
  const MotionDiv = motion.div
  const cols = 8
  const rows = 5
  
  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        {children}
      </MotionDiv>

      {/* Over-the-top PPT / Honeycomb-like block reveal */}
      <div className="fixed inset-0 pointer-events-none z-[9999] grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {Array.from({ length: cols * rows }).map((_, i) => {
          const col = i % cols
          const row = Math.floor(i / cols)
          const delay = (col + row) * 0.05

          return (
            <MotionDiv
              key={i}
              className="bg-[#5D1C6A] border-[0.5px] border-[#FFB090]/35 shadow-[0_0_15px_#CA5995] origin-center"
              initial={{ scale: 1, opacity: 1, borderRadius: '0%' }}
              animate={{ scale: 0, opacity: 0, borderRadius: '50%' }}
              exit={{ scale: 1, opacity: 1, borderRadius: '0%' }}
              transition={{
                duration: 0.8,
                ease: [0.87, 0, 0.13, 1],
                delay: delay
              }}
            />
          )
        })}
      </div>
    </>
  )
}
