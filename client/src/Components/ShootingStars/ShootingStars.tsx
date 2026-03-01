import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    length: number;
    speed: number;
    size: number;
    red: number;
    green: number;
    blue: number;
}

export default function ShootingStars() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let stars: Star[] = [];

        // Generate a random star
        function createStar() {
            const star: Star = {
                x: Math.random() * canvas.width,
                // y: Math.random() * canvas.height / 2, // top half
                y: Math.random() * canvas.height,
                length: Math.random() * 150 + 50,
                speed: Math.random() * 10 + 5,
                size: Math.random() * 2 + 1,
                red: Math.random() * 255,
                green: Math.random() * 255,
                blue: Math.random() * 255,
            };
            stars.push(star);
        }

        const starInterval = setInterval(createStar, 100); // new star every 0.2s

        function animate() {
            ctx.fillStyle = "rgba(0,0,0,0.1)"; // trail effect
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star, i) => {
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x + star.length, star.y + star.length);
                // ctx.strokeStyle = "rgba(255, 255, 255, 0.25)"; // 0.5 = 50% transparent
                ctx.strokeStyle = `rgba(${star.red}, ${star.green}, ${star.blue}, 0.25)`; // 0.5 = 50% transparent
                ctx.lineWidth = star.size;
                ctx.stroke();

                star.x += star.speed;
                star.y += star.speed;

                // remove if offscreen
                if (star.x > canvas.width || star.y > canvas.height) {
                    stars.splice(i, 1);
                }
            });

            requestAnimationFrame(animate);
        }

        animate();

        // Resize handler
        function handleResize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(starInterval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: -1, // behind everything
                width: "100%",
                height: "100%",
                // background: "radial-gradient(circle at top, #000428, #004e92)",
                background: "transparent",
            }}
        />
    );
}