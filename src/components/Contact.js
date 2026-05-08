"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, submitting, success
  const buttonRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // GSAP timeline for button loading animation
    timelineRef.current = gsap.timeline({ paused: true, repeat: -1 })
      .to(".loading-dot", {
        y: -5,
        stagger: 0.2,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(".loading-dot", {
        y: 0,
        stagger: 0.2,
        duration: 0.4,
        ease: "power2.in"
      }, 0.2);
  }, []);

  useEffect(() => {
    if (status === "submitting") {
      timelineRef.current.play();
    } else {
      timelineRef.current.pause();
      gsap.to(".loading-dot", { y: 0, duration: 0.3 });
    }
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 2000);
  };

  return (
    <section className="py-24 px-6" id="contacts">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="section-line mr-6"></div>
          <p className="text-sm tracking-widest text-text-muted font-semibold uppercase">Contacts</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8">Have a project? <br />Let's talk!</h2>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-sm inline-block shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                  <span>Thank you! I'll get back to you soon.</span>
                </div>
              </motion.div>
            ) : (
              <motion.button
                ref={buttonRef}
                onClick={handleSubmit}
                disabled={status === "submitting"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-coral-accent text-white px-12 py-4 rounded-sm font-bold mt-8 transition-all shadow-xl flex items-center justify-center min-w-[180px] ${status === "submitting" ? 'opacity-90 cursor-not-allowed' : ''}`}
              >
                {status === "submitting" ? (
                  <div className="flex gap-1">
                    <span className="loading-dot w-1.5 h-1.5 bg-white rounded-full"></span>
                    <span className="loading-dot w-1.5 h-1.5 bg-white rounded-full"></span>
                    <span className="loading-dot w-1.5 h-1.5 bg-white rounded-full"></span>
                  </div>
                ) : "Submit"}
              </motion.button>
            )}
          </div>
          <div className="space-y-12">
            {['name', 'email', 'message'].map((field) => (
              <div key={field} className="relative group">
                <label className="text-xs uppercase tracking-widest text-text-muted font-bold block mb-2 transition-colors group-focus-within:text-coral-accent">
                  {field}
                </label>
                {field === 'message' ? (
                  <textarea
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full form-input-custom text-white resize-none h-12 focus:h-32 transition-all duration-300"
                    placeholder={`Type your ${field} here`}
                  ></textarea>
                ) : (
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full form-input-custom text-white"
                    placeholder={`Type your ${field} here`}
                    type={field === 'email' ? 'email' : 'text'}
                  />
                )}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-coral-accent transition-all duration-500 group-focus-within:w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
