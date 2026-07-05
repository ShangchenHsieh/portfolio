import { m, useReducedMotion } from "motion/react";

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-40px 0px -40px 0px" };

export function Reveal({ as = "div", delay = 0, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Stagger({ as = "div", children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = m[as] ?? m.div;
  return (
    <Tag initial={reduce ? false : "hidden"} whileInView="visible" viewport={VIEWPORT} variants={stagger} {...rest}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", children, ...rest }) {
  const Tag = m[as] ?? m.div;
  return (
    <Tag variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} {...rest}>
      {children}
    </Tag>
  );
}
