"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Projects() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  const projects = [
    {
      title: "Aegis Security",
      description: "A high-performance cybersecurity monitoring platform for distributed cloud infrastructures.",
      tags: ["#RUST", "#WEBASSEMBLY", "#VUE"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5lyCo4PBTOFFoK5CgKUsI9N_nllbl97cEneKVzqCiXM16rf0UZ1AEmcf9ikx_zfCqwoXh19RinNPNlkbI-CPcwPBkJi07MH50i5iZKH5KKuINwT9LNTXvqApzmTvjbBDZJQl5v_nka_XzFTA7wJG7ZLy0rdEPWc9Dp0EnNqE5RW9d8pjiHNI5vEvVwuygiMhULV6DjUPPKHS-3I_FaAyao-XspDUBMsuWQsTpe8fcuYidWu5VKOIaofc8AQ-7JxSim61wpK46hCJo",
      link: "#",
    },
    {
      title: "Neural-X Grid",
      description: "Real-time neural network visualization engine for identifying data patterns in large datasets.",
      tags: ["#THREE.JS", "#PYTHON", "#TENSORFLOW"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe3qJfNmvdMkHjXVNTnBoC0sYtaZ-jWhceRE-qeFgT_yZNbSxVHAuIJcCvZqGge1Y9KKtnwem3k5DC_YP9tH56jiRpk7K96JXuK278CysSfNgCX7_LD5W5haX3ffeR_lSIJvDYDNBHfsA56__hQjT7mKft5NHLwAT-K5xUWOtp-I5zjfAj7ZRe1-x5abQuGt3d7CYnhVLFcu3HvzI7vGG_4yeRNAqJrI1LYYjLnlWdE4nlfbaR-aNYQBPj5_AtfmPFDonvx5M-3-Or",
      link: "/projects/neural-stream",
    },
    {
      title: "Quantum Ledger",
      description: "Next-generation blockchain explorer with real-time transaction mapping.",
      tags: ["#NEXTJS", "#SOLANA", "#D3JS"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5lyCo4PBTOFFoK5CgKUsI9N_nllbl97cEneKVzqCiXM16rf0UZ1AEmcf9ikx_zfCqwoXh19RinNPNlkbI-CPcwPBkJi07MH50i5iZKH5KKuINwT9LNTXvqApzmTvjbBDZJQl5v_nka_XzFTA7wJG7ZLy0rdEPWc9Dp0EnNqE5RW9d8pjiHNI5vEvVwuygiMhULV6DjUPPKHS-3I_FaAyao-XspDUBMsuWQsTpe8fcuYidWu5VKOIaofc8AQ-7JxSim61wpK46hCJo",
      link: "#",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-100vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section id="projects" className="overflow-hidden">
      <div ref={triggerRef}>
        <div className="flex flex-col px-margin-page py-section-gap max-w-container-max mx-auto mb-[-100px]">
          <div className="font-code-sm text-primary-fixed mb-4">3. PROJECT_PREVIEWS</div>
          <h2 className="font-headline-lg text-headline-lg">
            Selected <span className="text-primary-container">Works</span>
          </h2>
        </div>
        
        <div ref={sectionRef} className="flex flex-row relative h-screen items-center px-margin-page gap-12 w-[200vw]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-[80vw] md:w-[45vw] flex-shrink-0"
            >
              <Link
                href={project.link}
                className="group relative overflow-hidden rounded-xl glass-card transition-all duration-500 glow-box-hover block"
              >
                <div className="aspect-video overflow-hidden relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    <Image
                      alt={project.title}
                      className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                      src={project.img}
                      fill
                    />
                  </motion.div>
                </div>
                <div className="p-gutter flex flex-col gap-4 relative">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-headline-md group-hover:text-primary-container transition-colors">
                      {project.title}
                    </h3>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container">
                      open_in_new
                    </span>
                  </div>
                  <p className="text-on-surface-variant font-body-md line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-4 font-code-sm text-[12px] text-primary-fixed uppercase tracking-wider">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
