"use client";

export const useScrollTo = () => {
  const scrollToSection = (
    id: string,
    offset: number = 100 // Header ki height ke hisab se change kar lena
  ) => {
    const element = document.getElementById(id);

    if (!element) return;

    const y =
      element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return { scrollToSection };
};