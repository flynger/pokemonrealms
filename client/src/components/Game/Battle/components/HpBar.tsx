import { useEffect, useRef, useState } from "react";
import "./HpBar.css";

type HpColor = "red" | "yellow" | "green";
interface IProps {
    percent: number
}
export default function HpBar({ percent }: IProps) {
    const [color, setColor] = useState<HpColor>("green");
    const hpBarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateColor = () => {
            if (hpBarRef.current && hpBarRef.current.parentElement) {
                const width = hpBarRef.current.offsetWidth;
                const containerWidth = hpBarRef.current.parentElement.offsetWidth ?? 0;
                const percentage = (width / containerWidth) * 100;

                if (percentage > 50) {
                    setColor("green");
                } else if (percentage > 20) {
                    setColor("yellow");
                } else setColor("red");
            }
        };

        // Create a ResizeObserver to observe changes in the hpBar element
        const resizeObserver = new ResizeObserver(() => {
            updateColor();
        });

        // Start observing the hpBar element
        if (hpBarRef.current) {
            resizeObserver.observe(hpBarRef.current);
        }

        // Cleanup the observer on component unmount
        return () => {
            if (hpBarRef.current) {
                resizeObserver.unobserve(hpBarRef.current);
            }
        };
    }, []);

    return (
        <div className="hpbar-bg">
            <div ref={hpBarRef} className={`hpbar ${color}`} style={{ width: `${percent}%` }}></div>
        </div>
    );
}