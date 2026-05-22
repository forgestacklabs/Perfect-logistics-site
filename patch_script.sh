sed -i '44,55c\
    const elementToKey = new Map();\
\
    const observer = new IntersectionObserver(\
      (entries) => {\
        entries.forEach((e) => {\
          if (e.isIntersecting) {\
            const key = elementToKey.get(e.target);\
            if (key) setVisibleSections((p) => new Set(p).add(key));\
          }\
        });\
      },\
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }\
    );\
\
    Object.keys(sectionRefs.current).forEach((key) => {\
      const element = sectionRefs.current[key];\
      if (element) {\
        elementToKey.set(element, key);\
        observer.observe(element);\
      }\
    });\
\
    return () => observer.disconnect();' components/Reviews.tsx
