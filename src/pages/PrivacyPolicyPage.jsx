export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] font-sans pb-32 pt-40 px-6">
       <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <span className="text-[13px] font-black text-rose-500 uppercase tracking-widest mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-12 tracking-tight">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-blue-500 font-medium">
            <h3>1. Data Collection</h3>
            <p>At MERNpixel, we only collect data explicitly provided through our contact forms and booking requests to handle inbound inquiries effectively. Usage of our application inherently respects your privacy.</p>
            
            <h3>2. Usage of Third-Party Services</h3>
            <p>We leverage Google Analytics 4 (GA4) to understand how visitors engage with our web experiences, aiding our continuous improvement and delivering measurable value without attaching personally identifiable markers to basic traffic.</p>
            
            <h3>3. Cookie Policy</h3>
            <p>Our platform uses baseline cookies to maintain seamless navigation. JWT tokens may be utilized securely inside local storage limits uniquely for internal authorized access flows.</p>

            <h3>4. Contact Us</h3>
            <p>For any queries about this policy, reach us via our Contact Page.</p>
          </div>
       </div>
    </main>
  )
}
