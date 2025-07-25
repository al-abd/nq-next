"use client";

import { forwardRef, useEffect, useState } from "react";
import { Card, CardProps } from "@yakad/ui";

interface FindBarProps extends CardProps {
    surahnumber: number;
    ayahnumber: number;
    pagenumber: number;
    juz: number;
    hizb: number;
}
export const FindBar = forwardRef<HTMLDivElement, FindBarProps>(
    ({ surahnumber, ayahnumber, pagenumber, juz, hizb, ...restProps }, ref) => {
        const [top, setTop] = useState(2);
        const [lastScrollY, setLastScrollY] = useState(0);

        useEffect(() => {
            const handleScroll = () => {
                const currentScrollY = window.scrollY;

                if (currentScrollY > lastScrollY && currentScrollY > 50) {
                    // Scroll down
                    setTop(2);
                } else {
                    // Scroll up
                    setTop(8);
                }

                setLastScrollY(currentScrollY);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, [lastScrollY]);

        return (
            <Card
                ref={ref}
                {...restProps}
                blur
                style={{
                    position: "sticky",
                    top: `${top}rem`,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "1rem 2.5rem",
                    fontSize: "1.4rem",
                    boxShadow:
                        "1.8rem -2rem 0 0.6rem rgb(var(--surfaceColor, 254 247 255)), -1.8rem -2rem 0 0.6rem rgb(var(--surfaceColor, 254 247 255))",
                    transition: "top 0.3s ease",
                    willChange: "top",
                    zIndex: "1",
                    cursor: "pointer",
                    userSelect: "none",
                }}
            >
                <div>{surahnumber + ". Al-Fatihah: " + ayahnumber}</div>
                <div>{"Page " + pagenumber}</div>
                <div>{"Juz " + juz + " / " + "Hizb " + hizb}</div>
            </Card>
        );
    }
);
FindBar.displayName = "FindBar";
