import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('eyebrow', { static: false }) eyebrowRef!: ElementRef<HTMLDivElement>;
  @ViewChild('titleAccent', { static: false }) titleAccentRef!: ElementRef<HTMLDivElement>;
  @ViewChild('titleRecords', { static: false }) titleRecordsRef!: ElementRef<HTMLDivElement>;
  @ViewChild('subtitle', { static: false }) subtitleRef!: ElementRef<HTMLParagraphElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private animationId: number | null = null;
  private time = 0;
  private waves: Array<any> = [];
  private mouseX = 0;
  private mouseY = 0;
  private scrollY = 0;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Track scroll
    const handleScroll = () => {
      this.scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // create waves
    for (let i = 0; i < 5; i++) {
      this.waves.push({
        amplitude: 40 + i * 15,
        frequency: 0.01 + i * 0.002,
        speed: 0.02 + i * 0.005,
        offset: i * Math.PI / 2,
        opacity: 0.15 - i * 0.02
      });
    }

    const animate = () => {
      if (!this.ctx) return;
      const ctx = this.ctx;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      this.time += 0.01;

      // flowing waves
      this.waves.forEach((wave, idx) => {
        ctx.beginPath();
        
        for (let x = 0; x < w; x += 2) {
          // Calculate distance from cursor X position
          const distFromMouse = Math.abs(x - this.mouseX);
          const maxDistance = w / 3; // influence range
          const influence = Math.max(0, 1 - distFromMouse / maxDistance);
          
          // Scroll influence remains global
          const scrollInfluence = Math.min(1, this.scrollY / 500);
          
          // Apply wave with localized mouse influence
          const y = h / 2 +
            Math.sin(x * wave.frequency + this.time * wave.speed + wave.offset) * wave.amplitude * (1 + influence * 0.6) +
            Math.sin(x * wave.frequency * 2 + this.time * wave.speed * 1.5 + influence * 3) * (wave.amplitude / 2) * (1 + influence * 0.4);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, `rgba(6, 182, 212, ${wave.opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${wave.opacity})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, ${wave.opacity})`);

        ctx.strokeStyle = gradient as unknown as string;
        ctx.lineWidth = 2 + idx * 0.5;
        ctx.stroke();
      });

      // floating orbs
      const orbCount = 15;
      for (let i = 0; i < orbCount; i++) {
        const x = (i / orbCount) * canvas.width + Math.sin(this.time + i) * 50;
        const y = canvas.height / 2 + Math.cos(this.time * 0.7 + i * 2) * 100;
        const size = 3 + Math.sin(this.time + i) * 2;
        const opacity = 0.3 + Math.sin(this.time + i * 0.5) * 0.2;

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        orbGradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
        orbGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = orbGradient as unknown as string;
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);

    // store handlers to remove later
    (this as any)._resizeHandler = resize;
    (this as any)._mouseMoveHandler = handleMouseMove;
    (this as any)._scrollHandler = handleScroll;

    // GSAP text animations
    this.animateHeroText();
    
    // Setup letter hover effects
    this.setupLetterHoverEffects();
  }

  private animateHeroText(): void {
    const tl = gsap.timeline({ delay: 0.2 });

    // Eyebrow fade in & up
    tl.fromTo(
      this.eyebrowRef.nativeElement,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0
    );

    // Title 1 (MOON KORADJI) - slide up
    tl.fromTo(
      this.titleAccentRef.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      0.15
    );

    // Title 2 (RECORDS) - slide up
    tl.fromTo(
      this.titleRecordsRef.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      0.25
    );

    // Subtitle fade in
    tl.fromTo(
      this.subtitleRef.nativeElement,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.4
    );
  }

  private setupLetterHoverEffects(): void {
    const letters = document.querySelectorAll('.letter');
    
    letters.forEach((letter) => {
      letter.addEventListener('mouseenter', (e) => {
        gsap.to(e.target, {
          scale: 1.3,
          rotationZ: (Math.random() * 20 - 10), // Random rotation -10 to 10 degrees
          filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.8))',
          duration: 0.3,
          ease: 'back.out'
        });
      });

      letter.addEventListener('mouseleave', (e) => {
        gsap.to(e.target, {
          scale: 1,
          rotationZ: 0,
          filter: 'drop-shadow(0 0 0px rgba(0, 255, 255, 0))',
          duration: 0.3,
          ease: 'back.out',
          clearProps: 'transform,filter'
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if ((this as any)._resizeHandler) window.removeEventListener('resize', (this as any)._resizeHandler);
    if ((this as any)._mouseMoveHandler) window.removeEventListener('mousemove', (this as any)._mouseMoveHandler);
    if ((this as any)._scrollHandler) window.removeEventListener('scroll', (this as any)._scrollHandler);
  }
}