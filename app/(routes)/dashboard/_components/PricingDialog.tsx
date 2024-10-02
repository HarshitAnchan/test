"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Check, X, Zap, Rocket } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individuals and small projects.",
    features: [
      "Up to 3 team members",
      "5GB storage",
      "Basic analytics",
      "Community support",
      "Limited API access",
    ],
    icon: Zap,
  },
  {
    name: "Pro",
    price: "$5",
    description: "Ideal for growing businesses and advanced projects.",
    features: [
      "Unlimited team members",
      "50GB storage",
      "Advanced analytics",
      "24/7 priority support",
      "Full API access",
      "Custom integrations",
    ],
    icon: Rocket,
  },
];

function PricingDialog() {
  return (
    <DialogContent className="sm:max-w-[900px] max-h-[90vh] text-black bg-white p-0 overflow-hidden md:overflow-auto">
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4 text-black" />
        <span className="sr-only">Close</span>
      </DialogClose>
      <DialogHeader className="px-6 pt-6">
        <DialogTitle className="text-3xl font-bold">
          Choose Your Plan
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="px-6 pb-6 overflow-auto md:overflow-visible max-h-[calc(90vh-100px)] md:max-h-none">
        <div className="flex items-center justify-center bg-white">
          <div className="w-full max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-8 max-w-screen-md lg:mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl text-black font-extrabold tracking-tight sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="text-black sm:text-xl">
                Start for free, upgrade when you're ready.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="grid md:grid-cols-2 gap-8"
            >
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`flex flex-col p-6 space-y-6 rounded-lg border ${
                    plan.name === "Pro"
                      ? "border-purple-500"
                      : "border-gray-700"
                  } bg-gray-800 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 ${
                        plan.name === "Pro" ? "bg-purple-600" : "bg-gray-600"
                      } rounded-full`}
                    >
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {plan.name}
                    </h3>
                  </div>
                  <div className="flex items-baseline text-white">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-2xl font-medium text-gray-400">
                      /month
                    </span>
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`cursor-pointer w-full rounded-md py-3 px-6 text-center text-base font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                      plan.name === "Pro"
                        ? "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                        : "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
                    }`}
                  >
                    {plan.name === "Free" ? "Get Started" : "Upgrade Now"}
                  </motion.a>
                  <ul className="space-y-4 text-gray-400">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1 + featureIndex * 0.05,
                        }}
                        className="flex items-center space-x-3"
                      >
                        <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-black">
                Need a custom solution?{" "}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Contact our sales team
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </DialogDescription>
    </DialogContent>
  );
}

export default PricingDialog;
