"use client";

import React from 'react';
import Link from 'next/link';

// The main hero component
const AetherFlowHero = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

        // Moved Particle class definition here to avoid initialization errors
        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (!canvas) return;
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Mouse collision detection
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius + this.size) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= forceDirectionX * force * 5;
                        this.y -= forceDirectionY * force * 5;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particles = [];
            if (!canvas) return;
            const numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                const size = (Math.random() * 2) + 1;
                const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                const directionX = (Math.random() * 0.4) - 0.2;
                const directionY = (Math.random() * 0.4) - 0.2;
                const color = '#5919C1'; // Brighter purple
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); 
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    
                    if (canvas && distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        
                        const dx_mouse_a = particles[a].x - (mouse.x || 0);
                        const dy_mouse_a = particles[a].y - (mouse.y || 0);
                        const distance_mouse_a = Math.sqrt(dx_mouse_a*dx_mouse_a + dy_mouse_a*dy_mouse_a);

                        if (!ctx) return;
                        if (mouse.x && distance_mouse_a < mouse.radius) {
                             ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue})`;
                        } else {
                             ctx.strokeStyle = `rgba(168, 85, 247, ${opacityValue})`;
                        }
                        
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!ctx) return;
            animationFrameId = requestAnimationFrame(animate);
            // Set the background color inside the canvas draw loop
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
        };
        
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-0">
            {/* The canvas is now the primary background */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
            
            {/* Corner Buttons - Top Left (Stepper Style) with animations - Visible on all screens */}
            <div className="flex absolute top-8 left-4 sm:left-8 z-20 flex-col group animate-fade-in-left">
                <Link href="/get-started?service=Web%20Development" className="px-3 py-2 border-2 border-[#2d236d] text-[#2d236d] font-medium rounded-full hover:bg-[#2d236d] hover:text-white  transition-all duration-300 relative whitespace-nowrap inline-block w-fit transform ">
                     Web Dev.
                     {/* White connection line */}
                    <div className="absolute -bottom-[3px] left-[45%] h-[3px] w-8 bg-white group-hover:bg-[#2d236d] transition-all duration-300 z-30"></div>
                </Link>
                <Link href="/get-started?service=Cloud%20Consulting" className="px-3 py-2 border-2 border-[#2d236d] text-[#2d236d] font-medium rounded-full hover:bg-[#2d236d] hover:text-white  transition-all duration-300 ml-5 relative whitespace-nowrap inline-block w-fit transform ">
                     Cloud Consulting
                </Link>
            </div>
            
            <div className="flex absolute top-8 right-4 sm:right-8 z-20 flex-col items-end group animate-fade-in-right">
                <Link href="/get-started?service=DevOps" className="px-3 py-2 border-2 border-[#2d236d] text-[#2d236d] font-medium rounded-full hover:bg-[#2d236d] hover:text-white  transition-all duration-300 relative whitespace-nowrap transform ">
                   DevOps
                    {/* White connection line */}
                    <div className="absolute -bottom-[3px] right-10 h-[3px] w-7 bg-white group-hover:bg-[#2d236d] transition-all duration-300 z-30"></div>
                </Link>
                <Link href="/get-started?service=Cyber%20Security" className="px-3 py-2 border-2 border-[#2d236d] text-[#2d236d] font-medium rounded-full hover:bg-[#2d236d] hover:text-white  transition-all duration-300 relative right-5 whitespace-nowrap transform ">
                     Cyber Security
                </Link>
            </div>
            
            {/* Center Content with staggered animations */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 gap-6 sm:gap-7 md:gap-8">
                {/* Large centered text */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold text-[#2d236d] uppercase tracking-relaxed leading-none text-center animate-fade-in-up animation-delay-200">
                    Tech Solutions
                </h1>
                
                {/* Paragraph below title */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2d236d] text-center max-w-4xl font-light animate-fade-in-up animation-delay-400 px-4">
                    We design, build, secure, deploy, and scale digital products — end to end. At AIDA, we deliver full-stack technology solutions that power modern businesses
                </p>
                
                {/* Button below paragraph */}
                <Link
                    href="/get-started?service=Technology%20Services"
                    className="group flex items-center gap-2 sm:gap-3 bg-[#5919C1] text-white text-sm sm:text-base md:text-lg font-light transition-all hover:bg-white hover:border-2 hover:border-black hover:text-black rounded-full pl-4 sm:pl-6 pr-6 sm:pr-10 py-2.5 sm:py-3 hover:shadow-2xl hover:scale-105 transform animate-fade-in-up animation-delay-600"
                  >
                    {/* Arrow with Circle */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#5919C1] group-hover:bg-white border-2 border-white group-hover:border-black flex items-center justify-center transition-all group-hover:rotate-90 flex-shrink-0">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:text-black transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    <span>Book Consultation</span>
                  </Link>
            </div>

        </div>
    );
};

export default AetherFlowHero;
