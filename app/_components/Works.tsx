"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Plug, MessageCircle, CheckCircle } from "lucide-react";

export default function InnovativeHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const steps = [
    {
      title: "Connect",
      description: "Link your accounts and data sources",
      icon: Plug,
    },
    {
      title: "Collaborate",
      description: "Collaborate seamlessly with your team in real-time",
      icon: MessageCircle,
    },
    {
      title: "Achieve Goals",
      description: "Utilize tools to meet your objectives effectively",
      icon: CheckCircle,
    },
  ];

  const progress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  const StepSVG = ({ progress, isActive, icon: Icon }: any) => (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="10"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#6d28d9"
        strokeWidth="10"
        strokeDasharray="283"
        strokeDashoffset={283 * (1 - progress)}
      />
      {isActive && (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <foreignObject x="25" y="25" width="50" height="50">
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </foreignObject>
        </motion.g>
      )}
    </svg>
  );

  useEffect(() => {
    const unsubscribe = progress.onChange((v) => {
      const newStep = Math.min(Math.floor(v * steps.length), steps.length - 1);
      setActiveStep(newStep);
    });
    return () => unsubscribe();
  }, [progress, steps.length]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-hidden py-20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"
            style={{
              scaleY: progress,
              transformOrigin: "top",
            }}
          />
          {steps.map((step, index) => {
            const yProgress = useTransform(
              progress,
              [index / steps.length, (index + 1) / steps.length],
              [50, -50]
            );
            const opacityProgress = useTransform(
              progress,
              [
                index / steps.length,
                (index + 0.3) / steps.length,
                (index + 0.7) / steps.length,
                (index + 1) / steps.length,
              ],
              [0.3, 1, 1, 0.3]
            );
            return (
              <motion.div
                key={index}
                className="mb-32 flex items-center justify-center perspective-1000"
                style={{
                  y: yProgress,
                  opacity: opacityProgress,
                  rotateX: useTransform(
                    progress,
                    [index / steps.length, (index + 1) / steps.length],
                    [45, 0]
                  ),
                }}
              >
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <StepSVG
                    progress={useTransform(
                      progress,
                      [index / steps.length, (index + 1) / steps.length],
                      [0, 1]
                    )}
                    isActive={index === activeStep}
                    icon={step.icon}
                  />
                </div>
                <div className="w-1/2 pl-8">
                  <InteractiveElement
                    step={index}
                    isActive={index === activeStep}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Removed FloatingParticles component here */}
    </section>
  );
}

function InteractiveElement({ step, isActive }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getContent = () => {
    switch (step) {
      case 0:
        return <ConnectAnimation isActive={isActive} isInView={isInView} />;
      case 1:
        return <CollaborateAnimation isActive={isActive} isInView={isInView} />;
      case 2:
        return <LaunchAnimation isActive={isActive} isInView={isInView} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className="w-full h-40 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      {getContent()}
    </div>
  );
}

function ConnectAnimation({ isActive, isInView }: any) {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      {isActive && (
        <motion.div
          className="flex items-center space-x-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.div
            className="w-8 h-8 bg-blue-500 rounded-full"
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="w-16 h-1 bg-blue-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.div
            className="w-8 h-8 bg-green-500 rounded-full"
            whileHover={{ scale: 1.2 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

function CollaborateAnimation({ isActive, isInView }: any) {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      {isActive && (
        <motion.div
          className="flex items-center space-x-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.2 }}
            >
              {i + 1}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

function LaunchAnimation({ isActive, isInView }: any) {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      {isActive && (
        <motion.div
          className="text-6xl"
          initial={{ y: 50 }}
          animate={{ y: -20 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>
      )}
    </motion.div>
  );
}
